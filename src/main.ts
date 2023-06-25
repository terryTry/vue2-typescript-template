import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import directives from "./directive";
import filters from "./filter";
import ElementUI from "element-ui";

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import { i18n, language } from '@/utils/locale'

console.log('default language: ', language)

import 'element-ui/lib/theme-chalk/index.css';

import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(directives);
Vue.use(filters);

Vue.use(ElementUI, { locale: language === 'en' ? enLocale : zhLocale })

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$bus = new Vue();

// router跳转前的token验证
router.beforeEach((to, from, next) => {
  if (to.meta?.requireAuth) {
    if (store.state.user.token) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
