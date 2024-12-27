import axios from "axios";
import { useUserStore } from "@/stores/user";
import { validateValue } from "@/utils";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/components/Loading/index.js";
import router from "@/routers";
import { LOGIN_URL } from "@/config";
import { ElMessage } from "element-plus";
import { checkStatus } from "@/api/errCode";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  //默认为 json 格式
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  },
  // 跨域时候允许携带凭证
  withCredentials: true
});
http.interceptors.request.use(
  config => {
    const userStore = useUserStore();
    // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
    if (validateValue(config.loading)) {
      showFullScreenLoading();
    }
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("x-access-token", userStore.token);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    const { data, config } = response;
    const userStore = useUserStore();

    config.loading && tryHideFullScreenLoading();
    // 登录失效 401
    if (data.code == 401) {
      userStore.setToken("");
      router.replace(LOGIN_URL);
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
    // 全局错误拦截 , 考虑文件流的情况 没有code直接报错
    if (data.code && data.code !== 200) {
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    return data;
  },
  error => {
    const { response } = error;
    tryHideFullScreenLoading();
    // 请求超时与网络错误没有 response
    if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
    if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
    // 错误码判断
    if (response) checkStatus(response.code);
    // 无网络
    if (!window.navigator.onLine) router.replace("/500");
    return Promise.reject(error);
  }
);

export default http;
