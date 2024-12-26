import axios from "axios";
import { useUserStore } from "@/stores/modules/user";
import { validateValue } from "@/utils/validate";
import { showFullScreenLoading } from "@/components/Loading/fullScreen";
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
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  res => {},
  error => {
    return Promise.reject(error);
  }
);
