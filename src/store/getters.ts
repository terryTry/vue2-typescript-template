import { GetterTree } from "vuex";

const getters: GetterTree<RootState, RootState> = {
  appLoading: (state: RootState) => state.loading,
};

export default getters;
