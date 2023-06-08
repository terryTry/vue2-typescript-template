import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import user from "./modules/user";

Vue.use(Vuex);

// 此处为hack写法，参考https://github.com/vuejs/vuex/issues/1652
const rootState = {
  loading: false,
} as RootState;

const store: StoreOptions<RootState> = {
  state: rootState,
  mutations,
  actions,
  getters,
  modules: {
    user,
  },
};

export default new Vuex.Store(store);
