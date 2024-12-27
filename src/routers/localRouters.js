import { HOME_URL, LOGIN_URL } from "@/config";
/**
 * localRouter (静态路由)
 */
export const localRouter = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  }
  //   {
  //     path: "/layout",
  //     name: "layout",
  //     component: () => import("@/layouts/index.vue"),
  //     // component: () => import("@/layouts/indexAsync.vue"),
  //     redirect: HOME_URL,
  //     children: []
  //   }
];
/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "页面加载失败~"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "页面走丢了~"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "网络异常~"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
