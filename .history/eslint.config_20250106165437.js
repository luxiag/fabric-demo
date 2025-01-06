import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

const autoImportFile = new URL('./eslintrc.auto-import.json',import.meta.url)
const autoImportGlobals = JSON.parse(await readFile(autoImportFile,'utf8'));

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  {
    languageOptions: {
      globals: {
        ...autoImportGlobals.globals
      }
    }
  }
];
