// eslint.config.mjs
export default [
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", 
      globals: {
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        console: "readonly",
        // --- ADD THESE ---
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        Buffer: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "semi": ["error", "always"]
    }
  },
  {
    files: ["frontend/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        console: "readonly",
        // Added for frontend timers if needed
        setTimeout: "readonly",
        localStorage: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "off", 
      "semi": ["error", "always"]
    }
  }
];
