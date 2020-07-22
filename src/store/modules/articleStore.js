import articleApi from "@/api/articleApi";
import marked from "marked";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    bodyHtml: "",
    paramsId: "",
    menuList: [],
    commnetList: [],
    load: true,
    articleData: {},
    likeInfo: [],
    clickLike: false,
    pageIndex: 1,
    pageSize: 5,
    pageTotal: 0,
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
          console.log(err, "getArticle");
        });
    },
    // 点赞文章
    likeArticle({ state, dispatch }) {
      if (state.clickLike) return;
      articleApi
        .likeArticle({ id: state.paramsId })
        .then((res) => {
          if (res.data.code === 200) {
            state.clickLike = true;
            state.likeInfo.push(state.paramsId);
            localStorage.setItem("likeInfo", JSON.stringify(state.likeInfo));
            dispatch("getArticle", state.paramsId);
          }
        })
        .catch((err) => {
          console.log(err, "likeArticle");
        });
    },
    // 获取文章评论
    getComment({ state }) {
      const params = {
        articleId: state.paramsId,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      };
      articleApi
        .getComment(params)
        .then((res) => {
          if (res.data.code === 200) {
            state.commnetList = res.data.data
              .map((item) => {
                return {
                  ...item,
                  guestImage: item.guestName.slice(0, 1),
                  createTime: new Date(Date.parse(item.createTime)).toLocaleString(),
                  timerShaft: Date.parse(item.createTime),
                };
              })
              .sort((a, b) => {
                return a.createTime - b.createTime;
              });
            state.pageTotal = res.data.pageTotal;
          }
        })
        .catch((err) => {
          console.log(err, "getComment");
        });
    },
    // 新增文章评论
    addComment({ state, dispatch }, commentText) {
      if (!this.state.loginStore.isRead) {
        this.state.loginStore.isLogin = true;
        return;
      }
      if (commentText === "") {
        Vue.prototype.$message("内容不能为空");
        return;
      }
      const params = {
        articleId: state.paramsId,
        guestName: JSON.parse(this.state.loginStore.userInfo).name,
        commentText,
      };
      articleApi
        .addComment(params)
        .then((res) => {
          dispatch("getComment", state.paramsId);
          Vue.prototype.$message(res.data.msg);
        })
        .catch((err) => console.log(err, "addComment"));
    },
    // 点击翻页
    handlePage({ state, dispatch }, type) {
      if (state.pageTotal === 1) {
        return;
      }
      switch (type) {
        case 0:
          state.pageIndex > 1 && state.pageIndex--;
          break;
        case 1:
          state.pageIndex < state.pageTotal && state.pageIndex++;
          break;
      }
      dispatch("getComment");
    },
  },
};
