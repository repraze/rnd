import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";

export default [
    {
        ignores: ["dist", "node_modules", "coverage", ".vscode"],
    },
    {
        files: ["src/**/*.ts", "test/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...jestPlugin.environments.globals.globals,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            jest: jestPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules,
            ...jestPlugin.configs.recommended.rules,
            ...prettier.rules,
        },
    },
];
