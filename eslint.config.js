import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended, // Use ESLint's default recommended rules
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,    // Recognizes 'module', 'process', etc. (for backend)
                ...globals.browser  // Recognizes 'window', 'document', etc. (for frontend)
            }
        },
        rules: {
            "semi": ["error", "always"],     // Enforce semicolons
            "quotes": ["error", "single"],   // Enforce single quotes
            "no-unused-vars": "warn"         // Warn about unused variables
        }
    }
];
