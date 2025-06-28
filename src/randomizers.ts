export type Randomizer = () => number;

/**
 * Hash a string to a number using FNV-1a hash algorithm.
 * Returns a 32-bit unsigned integer.
 */
function hashStringToNumber(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash +=
            (hash << 1) +
            (hash << 4) +
            (hash << 7) +
            (hash << 8) +
            (hash << 24);
    }
    return hash >>> 0;
}

/**
 * Mulberry32 PRNG, seeded. Returns a function compatible with Math.random.
 * Accepts string or number as seed.
 */
export function createSeededRNG(seed: string | number): Randomizer {
    let s = typeof seed === 'string' ? hashStringToNumber(seed) : seed;
    let t = s >>> 0;
    return function () {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Secure RNG using crypto.getRandomValues (browser) or crypto.randomBytes (node).
 * Returns a function compatible with Math.random.
 */
export function secureRNG(): Randomizer {
    if (
        typeof globalThis !== 'undefined' &&
        globalThis.crypto &&
        typeof globalThis.crypto.getRandomValues === 'function'
    ) {
        // Browser
        return function () {
            const array = new Uint32Array(1);
            globalThis.crypto.getRandomValues(array);
            return array[0] / 4294967296;
        };
    } else {
        // Node.js
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = require('crypto');
        return function () {
            const buf = crypto.randomBytes(4);
            return buf.readUInt32BE(0) / 4294967296;
        };
    }
}
