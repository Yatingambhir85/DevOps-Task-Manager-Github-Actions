// eslint.config.mjs
export default [
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // Allows 'require' and 'module.exports'
      globals: {
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        console: "readonly"
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
        fetch: "readonly", // Fixes 'fetch is not defined'
        console: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "off", // Hides those 'addTask is defined but never used' warnings
      "semi": ["error", "always"]
    }
  }
];
