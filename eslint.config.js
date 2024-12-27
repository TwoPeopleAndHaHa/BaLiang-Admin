import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import globals from "globals";
import { readFile } from "node:fs/promises";
const autoImport = JSON.parse(await readFile(new URL("./.eslintrc-auto-import.json", import.meta.url), "utf-8"));
export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"]
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  skipFormatting,

  {
    name: "app/custom-rules",
    rules: {
      "no-console": "off",
      "no-debugger": "off",
      "vue/multi-word-component-names": "off"
    },
    // process与全局配置不再使用 env 作为关键 key ,引入 global 全局包进行配置 (eslint9平面化配置)
    // https://juejin.cn/post/7161622294706520071
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        // 自动导入(auto-import)的全局变量
        ...autoImport.globals
      }
    }
  }
];
