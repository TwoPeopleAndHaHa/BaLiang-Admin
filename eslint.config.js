import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import globals from "globals";
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
      "no-debugger": "off"
    },
    // process与全局配置不再使用 env 作为关键 key
    // https://juejin.cn/post/7161622294706520071
    languageOptions: {
      globals: {
        ...globals.browser,
        myCustomGlobal: "readonly"
      }
    }
  }
];
