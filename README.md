# @repraze/rnd

[![npm version](https://img.shields.io/npm/v/@repraze/rnd?style=flat-square)](https://www.npmjs.com/package/@repraze/rnd)
[![CI](https://img.shields.io/github/actions/workflow/status/repraze/rnd/ci.yml?branch=main&style=flat-square)](https://github.com/repraze/rnd/actions)
[![Coverage Status](https://img.shields.io/coveralls/github/repraze/rnd/main?style=flat-square)](https://coveralls.io/github/repraze/rnd?branch=main)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@repraze/rnd?style=flat-square)](https://bundlephobia.com/package/@repraze/rnd)

A simple, dependency-free randomizer library for JavaScript and TypeScript.

## Installation

```sh
npm install @repraze/rnd
```

## Usage

### Simple usage

```typescript
import {
    int,
    float,
    boolean,
    item,
    shuffle,
    range,
    weighted,
} from '@repraze/rnd';

console.log(int(1, 10)); // random integer between 1 and 10
console.log(float(0, 1)); // random float between 0 and 1
console.log(boolean()); // true or false
console.log(item(['a', 'b', 'c'])); // random item from array
console.log(shuffle([1, 2, 3, 4])); // shuffled array
console.log(weighted(['rare', 'common'], [1, 10])); // weighted selection
console.log(range.int(5, 1, 10)); // [3, 7, 2, 9, 1]
console.log(range.float(3, 0, 1)); // [0.12, 0.87, 0.45]
console.log(range.boolean(4)); // [true, false, true, true]
console.log(range.item(3, ['a', 'b', 'c'])); // ['b', 'a', 'c']
console.log(range.weighted(5, ['rare', 'common'], [1, 10])); // ['common', 'common', 'rare', 'common', 'common']
```

### Advanced usage (custom random provider)

```typescript
import { Random, seededRNG, secureRNG } from '@repraze/rnd';

// Use a seeded RNG (deterministic, repeatable)
const seededRng = seededRNG('my-seed');
const seededRandom = new Random(seededRng);
console.log(seededRandom.int(1, 10));
console.log(seededRandom.range.int(5, 1, 10));
console.log(seededRandom.range.item(3, ['x', 'y', 'z']));
console.log(seededRandom.weighted(['a', 'b'], [1, 3]));

// Use a secure RNG (crypto-based)
const secureRandom = new Random(secureRNG());
console.log(secureRandom.int(1, 10));
console.log(secureRandom.range.float(3, 0, 1));
console.log(secureRandom.range.weighted(4, ['low', 'high'], [2, 8]));
```

## API

- `int(min, max)` — Random integer between min and max (inclusive).
- `float(min, max)` — Random float between min (inclusive) and max (exclusive).
- `boolean()` — Random boolean.
- `item(list)` — Random item from array.
- `shuffle(list)` — Shuffle array (Fisher-Yates).
- `weighted(items, weights)` — Random item from array with weighted selection.
- `range.int(count, min, max)` — Array of random integers.
- `range.float(count, min, max)` — Array of random floats.
- `range.boolean(count)` — Array of random booleans.
- `range.item(count, list)` — Array of random items from array.
- `range.weighted(count, items, weights)` — Array of random weighted selections.
- `Random.default()` — Create a Random instance using `Math.random`.
- `new Random(rng)` — Create a Random instance with a custom RNG.
- `seededRNG(seed)` — Create a deterministic RNG from a string or number seed.
- `secureRNG()` — Create a cryptographically secure RNG (browser and Node.js compatible).
- All instance methods: `int`, `float`, `boolean`, `item`, `shuffle`, `weighted`, `range`.

## License

MIT
