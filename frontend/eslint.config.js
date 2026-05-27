import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    js.configs.recommended,

    {
        files: ["**/*.{js,jsx}"],

        languageOptions: {
            ecmaVersion: "latest",

            sourceType: "module",

            globals: {
                ...globals.browser,
            },

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            react: reactPlugin,

            "react-hooks": reactHooks,
        },

        rules: {
            "react/react-in-jsx-scope": "off",

            "no-unused-vars": "warn",

            "react-hooks/rules-of-hooks": "error",

            "react-hooks/exhaustive-deps": "warn",
        },
    },
];
