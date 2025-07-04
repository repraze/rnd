import { Random } from "../src/random";
import { seededRNG, secureRNG } from "../src/generators";

describe("seededRNG", () => {
    it("produces repeatable sequences for the same seed", () => {
        const rng1 = seededRNG("abc");
        const rng2 = seededRNG("abc");
        const seq1 = Array.from({ length: 5 }, () => rng1());
        const seq2 = Array.from({ length: 5 }, () => rng2());
        expect(seq1).toEqual(seq2);
    });
    it("produces different sequences for different seeds", () => {
        const rng1 = seededRNG("abc");
        const rng2 = seededRNG("def");
        const seq1 = Array.from({ length: 5 }, () => rng1());
        const seq2 = Array.from({ length: 5 }, () => rng2());
        expect(seq1).not.toEqual(seq2);
    });
    it("output is in [0, 1)", () => {
        const rng = seededRNG(123);
        for (let i = 0; i < 10; i++) {
            const val = rng();
            expect(val).toBeGreaterThanOrEqual(0);
            expect(val).toBeLessThan(1);
        }
    });
});

describe("secureRNG", () => {
    it("output is in [0, 1)", () => {
        const rng = secureRNG();
        for (let i = 0; i < 10; i++) {
            const val = rng();
            expect(val).toBeGreaterThanOrEqual(0);
            expect(val).toBeLessThan(1);
        }
    });
    it("can be used with Random", () => {
        const rng = secureRNG();
        const rnd = new Random(rng);
        const val = rnd.int(1, 10);
        expect(val).toBeGreaterThanOrEqual(1);
        expect(val).toBeLessThanOrEqual(10);
    });

    it("throws error when crypto.getRandomValues is not available", () => {
        // Save the original crypto object
        const originalCrypto = globalThis.crypto;

        // Mock globalThis.crypto to be undefined to force error
        Object.defineProperty(globalThis, "crypto", {
            value: undefined,
            configurable: true,
        });

        try {
            expect(() => secureRNG()).toThrow(
                "Secure RNG is not available. Ensure you are in a secure environment with crypto support."
            );
        } finally {
            // Restore the original crypto object
            Object.defineProperty(globalThis, "crypto", {
                value: originalCrypto,
                configurable: true,
            });
        }
    });

    it("throws error when getRandomValues is not a function", () => {
        // Save the original crypto object
        const originalCrypto = globalThis.crypto;

        // Mock globalThis.crypto to have crypto but without getRandomValues function
        Object.defineProperty(globalThis, "crypto", {
            value: { getRandomValues: null },
            configurable: true,
        });

        try {
            expect(() => secureRNG()).toThrow(
                "Secure RNG is not available. Ensure you are in a secure environment with crypto support."
            );
        } finally {
            // Restore the original crypto object
            Object.defineProperty(globalThis, "crypto", {
                value: originalCrypto,
                configurable: true,
            });
        }
    });
});
