module.exports = {
  // Base configuration for all files
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules"],

  overrides: [
    // Configuration for TypeScript/React files
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
      plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime", // For the new JSX transform
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        // You can add or override rules here for TS/React files
        "react/prop-types": "off", // Not needed with TypeScript
      },
    },

    // Configuration for Astro files
    {
      files: ["**/*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      extends: ["plugin:astro/recommended"],
      globals: {
        Astro: "readonly",
      },
      rules: {
        // You can add or override rules here for Astro files
      },
    },
  ],
};