import type { Randomizer } from './randomizers';

/** Methods for generating arrays of random values */
export type RangeMethods = {
    /** Generate an array of random integers */
    int: (count: number, min: number, max: number) => number[];
    /** Generate an array of random floats */
    float: (count: number, min: number, max: number) => number[];
    /** Generate an array of random booleans */
    boolean: (count: number) => boolean[];
    /** Generate an array of random items from a list */
    item: <T>(count: number, list: ReadonlyArray<T>) => T[];
    /** Generate an array of random weighted items */
    weighted: <T>(
        count: number,
        items: ReadonlyArray<T>,
        weights: ReadonlyArray<number>,
    ) => T[];
};

function intRange(
    this: Random,
    count: number,
    min: number,
    max: number,
): number[] {
    return Array.from({ length: count }, () => this.int(min, max));
}

function floatRange(
    this: Random,
    count: number,
    min: number,
    max: number,
): number[] {
    return Array.from({ length: count }, () => this.float(min, max));
}

function booleanRange(this: Random, count: number): boolean[] {
    return Array.from({ length: count }, () => this.boolean());
}

/** Generate an array of random items from a list */
function itemRange<T>(
    this: Random,
    count: number,
    list: ReadonlyArray<T>,
): T[] {
    return Array.from({ length: count }, () => this.item(list));
}

/** Generate an array of random weighted items */
function weightedRange<T>(
    this: Random,
    count: number,
    items: ReadonlyArray<T>,
    weights: ReadonlyArray<number>,
): T[] {
    return Array.from({ length: count }, () => this.weighted(items, weights));
}

export class Random {
    private rng: Randomizer;

    constructor(rng: Randomizer) {
        this.rng = rng;
    }

    /** Create a Random instance using Math.random as the generator */
    static default(): Random {
        return new Random(Math.random);
    }

    /** Set a new randomizer function */
    use(rng: Randomizer): void {
        this.rng = rng;
    }

    /** Generate a random integer between min and max (inclusive) */
    int(min: number, max: number): number {
        return Math.floor(this.rng() * (max - min + 1)) + min;
    }

    /** Generate a random float between min and max (exclusive of max) */
    float(min: number, max: number): number {
        return this.rng() * (max - min) + min;
    }

    /** Generate a random boolean value */
    boolean(): boolean {
        return this.rng() < 0.5;
    }

    /** Pick a random item from an array */
    item<T>(list: ReadonlyArray<T>): T {
        return list[this.int(0, list.length - 1)];
    }

    /** Pick a random item from an array using weighted probabilities */
    weighted<T>(items: ReadonlyArray<T>, weights: ReadonlyArray<number>): T {
        if (items.length !== weights.length) {
            throw new Error('Items and weights must have the same length');
        }
        if (weights.some((w) => w < 0)) {
            throw new Error('Weights must be non-negative');
        }

        const total = weights.reduce((sum, w) => sum + w, 0);
        if (total === 0) {
            throw new Error('Total weight must be greater than 0');
        }

        let random = this.float(0, total);

        for (let i = 0; i < items.length; i++) {
            if (random < weights[i]) {
                return items[i];
            }
            random -= weights[i];
        }

        // Fallback (should not happen with valid inputs)
        return items[items.length - 1];
    }

    /** Shuffle an array and return a new shuffled copy (Fisher-Yates algorithm) */
    shuffle<T>(inList: ReadonlyArray<T>): T[] {
        // Fisher-Yates
        // copy to not touch original
        const list = [...inList];
        let current = list.length - 1;
        let pos;
        let item;
        while (current) {
            // pick random
            pos = this.int(0, current);
            // swap
            item = list[pos];
            list[pos] = list[current];
            list[current] = item;
            current -= 1;
        }
        return list;
    }

    /** Access to range methods for generating arrays of random values */
    get range(): RangeMethods {
        return {
            int: intRange.bind(this),
            float: floatRange.bind(this),
            boolean: booleanRange.bind(this),
            item: itemRange.bind(this) as <T>(
                count: number,
                list: ReadonlyArray<T>,
            ) => T[],
            weighted: weightedRange.bind(this) as <T>(
                count: number,
                items: ReadonlyArray<T>,
                weights: ReadonlyArray<number>,
            ) => T[],
        };
    }
}
