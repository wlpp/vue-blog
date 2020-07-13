import Vue from "vue";
import homeApi from "@/api/homeApi";

export default {
  namespaced: true, //添加后该模块的getters,mutations，actions将不再全局调用
  state: {
    num: 111,
    articles: [],
    tags: [],
    information: {},
    title: "",
    tagNames: "",
    pageIndex: 1,
    pageSize: 5,
    pageTotal: 0,
    loginPopup: false,
    isRead: false,
  },
  getters: {},
  mutations: {
    // 初始文章数据
    initArticles(state, arr) {
      arr = arr.map((item) => {
        return {
          ...item,
          tagNames: item.tagNames.split(","),
        };
      });
      state.articles = arr;
    },
    // 登录弹框
    setLoginPopup(state, type) {
      switch (type) {
        case 0:
          if (!state.isRead) state.loginPopup = true;
          break;
        case 1:
          state.loginPopup = false;
          break;
      }
    },
  },
  actions: {
    // 文章列表
    getArticles({ state, commit }) {
      const params = {
        title: state.title,
        tagNames: state.tagNames,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      };
      homeApi
        .getArticles(params)
        .then((res) => {
          if (res.data.Code === 200) {
            commit("initArticles", res.data.Data);
            state.pageTotal = res.data.pageTotal;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 标签列表
    getTags({ state }) {
      homeApi
        .getTags()
        .then((res) => {
          if (res.data.Code === 200) {
            state.tags = res.data.Data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 博主信息
    getInformation({ state }) {
      state.isRead = localStorage.getItem("isRead");
      homeApi
        .getInformation()
        .then((res) => {
          if (res.data.Code === 200) {
            state.information = res.data.Data[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击标签
    handleTag({ state, dispatch }, name) {
      name !== state.tagNames ? (state.tagNames = name) : (state.tagNames = "");
      dispatch("getArticles");
    },
    // 点击搜索
    handleSearch({ state, dispatch }, value) {
      state.title = value;
      // state.pageIndex = 1;

      dispatch("getArticles");
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
      dispatch("getArticles");
    },
    // 更新订阅
    updateRead({ state, dispatch }) {
      homeApi
        .updateRead()
        .then((res) => {
          if (res.data.success) {
            state.loginPopup = false;
            state.isRead = true;
            localStorage.setItem("isRead", true);
            Vue.prototype.$message(res.data.msg);
            dispatch("getInformation");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
