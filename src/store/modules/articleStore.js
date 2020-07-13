export default {
  namespaced: true,
  state: {
    bodyHtml: "12312312312313",
  },
  getters: {},
  mutations: {},
  actions: {
    // 存储markdown数据
    saveMarkdown({ state }, value) {
      console.log(state);
      console.log(value);
    },
  },
};
