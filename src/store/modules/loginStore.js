export default {
  namespaced: true, //添加后该模块的getters,mutations，actions将不再全局调用
  state: {
    isLogin: false,
    userInfo: null,
    isRead: false,
  },
  getters: {},
  mutations: {
    // 打开/关闭弹框
    setLogin(state, type) {
      switch (type) {
        case 0:
          if (!state.isRead) state.isLogin = true;
          break;
        case 1:
          state.isLogin = false;
          break;
      }
    },
  },
  actions: {
    setCookie({ state, dispatch }, payload) {
      var d = new Date();
      d.setTime(d.getTime() + payload.hours * 3600 * 1000);
      document.cookie = payload.key + "=" + payload.value + "; expires=" + d.toGMTString(); //时差相差8小时
      state.isRead = true;
      state.isLogin = false;
      dispatch("getCookie");
    },
    getCookie({ state }) {
      console.log(111);
      var cookieArr = document.cookie.split(";");
      for (var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split("=");
        if (arr[0] === "USER_INFO") {
          state.userInfo = arr[1];
          state.isRead = true;
        }
        return;
      }
    },
  },
};
