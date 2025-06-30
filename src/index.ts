export { Random } from "./random";
export { seededRNG, secureRNG } from "./generators";
export type { Generator } from "./generators";
export type { RangeMethods } from "./random";

import { Random, type RangeMethods } from "./random";

const defaultRandom = Random.default();

/** Generate a random integer between min and max (inclusive) */
export const int = defaultRandom.int.bind(defaultRandom);

/** Generate a random float between min and max (exclusive of max) */
export const float = defaultRandom.float.bind(defaultRandom);

/** Generate a random boolean value */
export const boolean = defaultRandom.boolean.bind(defaultRandom);

/** Pick a random item from an array */
export const item = defaultRandom.item.bind(defaultRandom);

/** Shuffle an array and return a new shuffled copy */
export const shuffle = defaultRandom.shuffle.bind(defaultRandom);

/** Pick a random item from an array using weighted probabilities */
export const weighted = defaultRandom.weighted.bind(defaultRandom);

/** Generate arrays of random values */
export const range: RangeMethods = {
    int: defaultRandom.range.int.bind(defaultRandom),
    float: defaultRandom.range.float.bind(defaultRandom),
    boolean: defaultRandom.range.boolean.bind(defaultRandom),
    item: defaultRandom.range.item.bind(defaultRandom),
    weighted: defaultRandom.range.weighted.bind(defaultRandom),
};
