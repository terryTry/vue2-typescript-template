import { Module } from "vuex";

const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    userName: "admin",
    token: "123",
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, payload: UserInfo) {
      console.log(payload);
      commit("SET_TOKEN", "123456");
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
    },
  },
};

export default user;
