import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

import router from "@/routers";
import pinia from "@/stores";

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
