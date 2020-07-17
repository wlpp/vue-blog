import articleApi from "@/api/articleApi";
import marked from "marked";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    bodyHtml: "",
    menuList: [],
    load: true,
    articleData:{}
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
      state.load = true;
      articleApi.getArticle({ id }).then((res) => {
        state.load = false;
        if (res.data.code === 200 && res.data.data.content) {
          state.bodyHtml = marked(res.data.data.content);
          state.articleData = res.data.data
          Vue.prototype.$nextTick(() => {
            state.menuList = [];
            document
              .querySelectorAll(".markdown-body h1")
              .forEach((item) => state.menuList.push({ menuText: item.id, offsetTop: item.offsetTop }));
          });
        } else {
          state.bodyHtml = "";
        }
      }).catch(err=>{
        state.load = false;
        console.log(err);
      });
    },
  },
};
