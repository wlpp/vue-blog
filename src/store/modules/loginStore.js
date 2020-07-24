import homeApi from "@/api/homeApi";
import Vue from "vue";

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
      let cookieArr = document.cookie.split(";");
      cookieArr.map((item, index) => {
        let arr = cookieArr[index].split("=");
        if (arr[0].trim() == "USER_INFO") {
          state.userInfo = arr[1];
          state.isRead = true;
        }
      });
    },
    async updateRead({ state }, readInfo) {
      homeApi
        .updateRead(readInfo)
        .then((res) => {
          if (res.data.success) {
            state.loginPopup = false;
            Vue.prototype.$message(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
