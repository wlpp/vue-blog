import articleApi from "@/api/articleApi";
import marked from "marked";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    bodyHtml: "",
    paramsId: "",
    menuList: [],
    load: true,
    articleData: {},
    likeInfo: [],
    clickLike: false,
  },
  getters: {},
  mutations: {
    initLikeArticle(state) {
      if (localStorage.getItem("likeInfo")) {
        state.likeInfo = JSON.parse(localStorage.getItem("likeInfo"));
        state.likeInfo.includes(state.paramsId) && (state.clickLike = true);
      }
    },
    setClickLike(state) {
      state.clickLike = false;
    },
  },
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
    // 获取文章信息
    getArticle({ state, commit }, id) {
      state.load = true;
      state.paramsId = id;
      commit("initLikeArticle");
      articleApi
        .getArticle({ id })
        .then((res) => {
          state.load = false;
          if (res.data.code === 200 && res.data.data.content) {
            state.bodyHtml = marked(res.data.data.content);
            state.articleData = res.data.data;
            Vue.prototype.$nextTick(() => {
              state.menuList = [];
              document
                .querySelectorAll(".markdown-body h1")
                .forEach((item) => state.menuList.push({ menuText: item.id, offsetTop: item.offsetTop }));
            });
          } else {
            state.bodyHtml = "";
          }
        })
        .catch((err) => {
          state.load = false;
          console.log(err);
        });
    },
    // 点赞文章
    likeArticle({ state, dispatch }) {
      if (state.clickLike) return;
      articleApi.likeArticle({ id: state.paramsId }).then((res) => {
        if (res.data.code === 200) {
          state.clickLike = true;
          state.likeInfo.push(state.paramsId);
          localStorage.setItem("likeInfo", JSON.stringify(state.likeInfo));
          dispatch("getArticle", state.paramsId);
        }
      });
    },
  },
};
