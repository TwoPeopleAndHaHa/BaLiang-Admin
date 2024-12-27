import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/config/nprogress";
import { LOGIN_URL } from "@/config";
import { useUserStore } from "@/stores/user";
import { localRouter, errorRouter } from "@/routers/localRouters";
const router = createRouter({
  history: createWebHistory(),
  routes: [...localRouter, ...errorRouter]
});
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  // 1.NProgress 开始
  NProgress.start();
  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
  // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token) return next(from.fullPath);
    return next();
  }
  if (!userStore.token) return next({ path: LOGIN_URL, replace: true });
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});
export default router;
