import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.less";
import "element-plus/dist/index.css";

import router from "@/routers";
import pinia from "@/stores";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(pinia);

app.mount("#app");
