import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { wrapperEnv } from "./build/getEnv";
import { createVitePlugins } from "./build/plugins";
import pkg from "./package.json";
import dayjs from "dayjs";

export default defineConfig(mode => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { dependencies, devDependencies, name, version } = pkg;
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
  };
  return {
    // 公共基础路径
    base: viteEnv.VITE_PUBLIC_PATH,
    // 项目根目录
    root,
    plugins: createVitePlugins(viteEnv),
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    // 全局常量替换
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    server: {
      host: "localhost", //监听地址  true => 所有地址
      port: 8080,
      strictPort: false, // 端口被占用时是否尝试下一个可用端口
      open: true,
      hmr: true, // 热更新
      https: false, // 启用 TLS + HTTP/2
      proxy: {
        "/api": {
          target: viteEnv.VITE_API_PROXY_URL,
          changeOrigin: true,
          cors: true,
          secure: false,
          //pathRewrite重写请求的路径,实际请求的路径没有代理标识 '/api',需要把 api 重置为空字符串
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      minify: "esbuild",
      outDir: "dist", // 打包文件的输出目录
      assetsDir: "assets", // 指定生成静态文件目录
      sourcemap: false, // 构建后是否生成 source map 文件,false 提高打包速度
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/global.less";`
        }
      }
    }
  };
});
