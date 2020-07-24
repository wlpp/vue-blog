import Vue from "vue";
import homeApi from "@/api/homeApi";
import path from "@/helpers/path";

export default {
  namespaced: true, //添加后该模块的getters,mutations，actions将不再全局调用
  state: {
    num: 111,
    archive: [],
    tags: [],
    blogger: {},
    title: "",
    tagNames: "",
    pageIndex: 1,
    pageSize: 5,
    pageTotal: 0,
    userInfo: null,
  },
  getters: {},
  mutations: {
    // 初始文章数据
    initArchive(state, arr) {
      arr = arr.map((item) => {
        return {
          ...item,
          tagNames: item.tagNames.split(","),
        };
      });
      state.archive = arr;
    },

    // 去文章页
    goArticle(state, id) {
      path.goArticle(id);
    },
  },
  actions: {
    // 文章列表
    getArchive({ state, commit }) {
      const params = {
        title: state.title,
        tagNames: state.tagNames,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      };
      homeApi
        .getArchive(params)
        .then((res) => {
          if (res.data.Code === 200) {
            commit("initArchive", res.data.Data);
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
    getBlogger({state}) {
    console.log(11111111111);
      homeApi
        .getBlogger()
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            state.blogger = res.data.Data[0];
            state.pageTotal = res.data.Data[0].article > 1 ? Math.ceil(res.data.Data[0].article / state.pageSize) : 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击标签
    handleTag({ state, dispatch }, name) {
      name !== state.tagNames ? (state.tagNames = name) : (state.tagNames = "");
      dispatch("getArchive");
    },
    // 点击搜索
    handleSearch({ state, dispatch }, value) {
      state.title = value;
      dispatch("getArchive");
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
      console.log(Vue.prototype);
      dispatch("getArchive");
    },
  },
};
