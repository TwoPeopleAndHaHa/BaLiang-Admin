import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import eslintPlugin from "vite-plugin-eslint";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = viteEnv => {
  const { VITE_CODEINSPECTOR } = viteEnv;
  return [
    vue(),
    vueDevTools(),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 自动引入
    AutoImport({
      dts: false,
      imports: ["vue", "vue-router", "vue-i18n"],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // 自动 IDE 并将光标定位到 DOM 对应的源代码位置。see: https://inspector.fe-dev.cn/guide/start.html
    VITE_CODEINSPECTOR &&
      codeInspectorPlugin({
        bundler: "vite"
      }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ];
};
