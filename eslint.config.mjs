// eslint.config.mjs
export default [
    {
        // This replaces "js.configs.recommended" manually for basic syntax
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "semi": ["error", "always"],
            "quotes": ["error", "single"]
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                // Manually defining common globals so we don't need the 'globals' package
                process: "readonly",
                __dirname: "readonly",
                window: "readonly",
                document: "readonly",
                console: "readonly"
            }
        }
    }
];
