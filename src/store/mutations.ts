import { MutationTree } from "vuex";

const mutations: MutationTree<RootState> = {
  SET_LOADING(state: RootState, payload: boolean) {
    state.loading = payload;
  },
};

export default mutations;
