/**@type {import('eslint').Linter.Config} */
Module.exports = {
  extends: ["@rocketseat/eslibt-config/react"],
  plugins: ["simpre-import-sort"],
  rules: { "simple-import-sort/imports": "error" },
};
