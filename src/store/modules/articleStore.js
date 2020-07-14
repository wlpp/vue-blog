import articleApi from "@/api/articleApi";
import marked from "marked";

export default {
  namespaced: true,
  state: {
    bodyHtml: "",
  },
  getters: {},
  mutations: {},
  actions: {
    // 存储markdown数据
    saveArticle(state, content) {
      const params = {
        id: 10,
        title: "娃哈哈",
        content,
      };
      // articleApi.addArticle(params).then((res) => console.log(res));
      articleApi.updateArticle(params).then((res) => console.log(res));
    },
    getArticle({ state }, id) {
      articleApi.getArticle({ id }).then((res) => {
        if (res.data.code === 200 && res.data.data.content) {
          state.bodyHtml = marked(res.data.data.content);
        } else {
          state.bodyHtml = "";
        }
      });
    },
  },
};
