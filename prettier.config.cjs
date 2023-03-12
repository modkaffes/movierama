/** @type {import("prettier").Config} */
module.exports = {
  importOrder: ["^react", "^@[a-zA-Z]", "^@/[a-zA-Z]", "^[^.]", "^[./]"],
  importOrderSortSpecifiers: true,
  pluginSearchDirs: false,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
