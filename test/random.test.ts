import { Random } from '../src/random';
import { int, float, boolean, item, shuffle, range, weighted } from '../src';

describe('Random', () => {
    let rnd: Random;
    beforeEach(() => {
        rnd = Random.default();
    });

    it('int returns integer in range', () => {
        for (let i = 0; i < 100; i++) {
            const val = rnd.int(1, 5);
            expect(val).toBeGreaterThanOrEqual(1);
            expect(val).toBeLessThanOrEqual(5);
            expect(Number.isInteger(val)).toBe(true);
        }
    });

    it('float returns float in range', () => {
        for (let i = 0; i < 100; i++) {
            const val = rnd.float(0, 1);
            expect(val).toBeGreaterThanOrEqual(0);
            expect(val).toBeLessThan(1);
        }
    });

    it('boolean returns boolean', () => {
        for (let i = 0; i < 10; i++) {
            const val = rnd.boolean();
            expect(typeof val).toBe('boolean');
        }
    });

    it('item returns item from list', () => {
        const arr = [1, 2, 3];
        for (let i = 0; i < 10; i++) {
            expect(arr.includes(rnd.item(arr))).toBe(true);
        }
    });

    it('shuffle returns permutation', () => {
        const arr = [1, 2, 3, 4];
        const shuffled = rnd.shuffle(arr);
        expect(shuffled.sort()).toEqual(arr);
        expect(shuffled).not.toBe(arr);
    });

    it('use changes the randomizer', () => {
        // Create a mock randomizer that always returns 0.5
        const mockRng = () => 0.5;
        rnd.use(mockRng);

        // Test that the new randomizer is being used
        expect(rnd.float(0, 1)).toBe(0.5);
        expect(rnd.boolean()).toBe(false); // 0.5 >= 0.5, so false
        expect(rnd.int(1, 10)).toBe(6); // Math.floor(0.5 * 10) + 1 = 6
    });

    it('range.int returns array of ints', () => {
        const arr = rnd.range.int(5, 1, 3);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(val).toBeGreaterThanOrEqual(1);
            expect(val).toBeLessThanOrEqual(3);
            expect(Number.isInteger(val)).toBe(true);
        });
    });

    it('range.float returns array of floats', () => {
        const arr = rnd.range.float(5, 0, 1);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(val).toBeGreaterThanOrEqual(0);
            expect(val).toBeLessThan(1);
        });
    });

    it('range.boolean returns array of booleans', () => {
        const arr = rnd.range.boolean(5);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(typeof val).toBe('boolean');
        });
    });

    it('range.item returns array of items', () => {
        const items = ['a', 'b', 'c'];
        const arr = rnd.range.item(5, items);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(items.includes(val)).toBe(true);
        });
    });

    it('range.weighted returns array of weighted items', () => {
        const items = ['a', 'b', 'c'];
        const weights = [1, 2, 3];
        const arr = rnd.range.weighted(5, items, weights);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(items.includes(val)).toBe(true);
        });
    });

    it('weighted returns weighted item', () => {
        const items = ['a', 'b', 'c'];
        const weights = [1, 2, 3];

        // Test that it returns a valid item
        for (let i = 0; i < 10; i++) {
            const result = rnd.weighted(items, weights);
            expect(items.includes(result)).toBe(true);
        }

        // Test error cases
        expect(() => rnd.weighted(['a'], [1, 2])).toThrow(
            'Items and weights must have the same length',
        );
        expect(() => rnd.weighted(['a'], [-1])).toThrow(
            'Weights must be non-negative',
        );
        expect(() => rnd.weighted(['a'], [0])).toThrow(
            'Total weight must be greater than 0',
        );
    });

    it('weighted fallback returns last item', () => {
        const items = ['a', 'b', 'c'];
        const weights = [1, 2, 3];

        // Mock the randomizer to return exactly the last weight
        const mockRng = () => 1.0; // This will make float(0, total) return exactly total
        rnd.use(mockRng);

        // The fallback should return the last item
        const result = rnd.weighted(items, weights);
        expect(result).toBe('c'); // Last item in the array
    });
});

describe('Singleton shortcut functions', () => {
    it('int returns integer in range', () => {
        for (let i = 0; i < 100; i++) {
            const val = int(1, 5);
            expect(val).toBeGreaterThanOrEqual(1);
            expect(val).toBeLessThanOrEqual(5);
            expect(Number.isInteger(val)).toBe(true);
        }
    });

    it('float returns float in range', () => {
        for (let i = 0; i < 100; i++) {
            const val = float(0, 1);
            expect(val).toBeGreaterThanOrEqual(0);
            expect(val).toBeLessThan(1);
        }
    });

    it('boolean returns boolean', () => {
        for (let i = 0; i < 10; i++) {
            const val = boolean();
            expect(typeof val).toBe('boolean');
        }
    });

    it('item returns item from list', () => {
        const arr = [1, 2, 3];
        for (let i = 0; i < 10; i++) {
            expect(arr.includes(item(arr))).toBe(true);
        }
    });

    it('shuffle returns permutation', () => {
        const arr = [1, 2, 3, 4];
        const shuffled = shuffle(arr);
        expect(shuffled.sort()).toEqual(arr);
        expect(shuffled).not.toBe(arr);
    });

    it('range.int returns array of ints', () => {
        const arr = range.int(5, 1, 3);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(val).toBeGreaterThanOrEqual(1);
            expect(val).toBeLessThanOrEqual(3);
            expect(Number.isInteger(val)).toBe(true);
        });
    });

    it('range.float returns array of floats', () => {
        const arr = range.float(5, 0, 1);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(val).toBeGreaterThanOrEqual(0);
            expect(val).toBeLessThan(1);
        });
    });

    it('range.boolean returns array of booleans', () => {
        const arr = range.boolean(5);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(typeof val).toBe('boolean');
        });
    });

    it('range.item returns array of items', () => {
        const items = ['a', 'b', 'c'];
        const arr = range.item(5, items);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(items.includes(val)).toBe(true);
        });
    });

    it('range.weighted returns array of weighted items', () => {
        const items = ['a', 'b', 'c'];
        const weights = [1, 2, 3];
        const arr = range.weighted(5, items, weights);
        expect(arr.length).toBe(5);
        arr.forEach((val) => {
            expect(items.includes(val)).toBe(true);
        });
    });

    it('weighted returns weighted item', () => {
        const items = ['a', 'b', 'c'];
        const weights = [1, 2, 3];

        // Test that it returns a valid item
        for (let i = 0; i < 10; i++) {
            const result = weighted(items, weights);
            expect(items.includes(result)).toBe(true);
        }

        // Test error cases
        expect(() => weighted(['a'], [1, 2])).toThrow(
            'Items and weights must have the same length',
        );
        expect(() => weighted(['a'], [-1])).toThrow(
            'Weights must be non-negative',
        );
        expect(() => weighted(['a'], [0])).toThrow(
            'Total weight must be greater than 0',
        );
    });
});
