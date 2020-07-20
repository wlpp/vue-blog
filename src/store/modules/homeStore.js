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
    loginPopup: false,
    isRead: false,
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
    // 去文章页
    goArticle(state, id) {
      path.goArticle(id);
    },
    setCookie(state, payload) {
      var d = new Date();
      d.setTime(d.getTime() + payload.hours * 3600 * 1000);
      document.cookie = payload.key + "=" + payload.value + "; expires=" + d.toGMTString(); //时差相差8小时
    },
    getCookie(state, key) {
      var cookieArr = document.cookie.split("; ");
      for (var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split("=");
        arr[0] === key && (state.userInfo = arr[1]);
        return;
      }
      console.log("cookie匹配不成功");
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
    getBlogger({ state, commit }) {
      commit("getCookie", "USER_INFO");
      state.userInfo && (state.isRead = true);
      homeApi
        .getBlogger()
        .then((res) => {
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
      dispatch("getArchive");
    },
    // 更新订阅
    updateRead({ state, dispatch }) {
      homeApi
        .updateRead()
        .then((res) => {
          if (res.data.success) {
            state.loginPopup = false;
            state.isRead = true;
            Vue.prototype.$message(res.data.msg);
            dispatch("getBlogger");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
