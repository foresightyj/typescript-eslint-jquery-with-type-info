//@ts-check

/**
 * @typedef {import("eslint").Linter.Config} EslintConfig
 */

/**
 * @type {EslintConfig}
 */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },

  plugins: ["@typescript-eslint", "eslint-plugin-local-rules"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "@typescript-eslint/no-throw-literal": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "local-rules/forbidden-methods-of-type": "error",
  },
};

module.exports = config;
