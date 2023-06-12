import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/group1/index.vue"),
    redirect: "/home",
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          requireAuth: true,
        },
        component: () => import(/* webpackChunkName: "group1" */"../views/group1/HomeView.vue"),
      },
      {
        path: "/about",
        name: "about",
        meta: {
          requireAuth: true,
        },
        component: () => import(/* webpackChunkName: "group1" */"../views/group1/AboutView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },

  // 懒加载示例
  // {
  //   path: "/about",
  //   name: "about",
  //   // 路由级别的代码分割，为此路由生成了一个单独的块（about.[hash].js）。当路由被访问时加载该组件
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
