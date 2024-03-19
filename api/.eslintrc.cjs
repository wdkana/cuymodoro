module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "class-methods-use-this": "off",
    "security/detect-object-injection": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
  env: {
    node: true,
    commonjs: true,
    es2020: true,
  },
};
