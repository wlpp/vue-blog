import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/base.less";
import "@/assets/fonts/iconfont.css";
import message from "@/components/message";
import axios from "axios";
Vue.prototype.$message = message.install;
Vue.config.productionTip = false;

axios.interceptors.response.use(
  (response) => {
    //拦截响应，做统一处理
    if (response.data.code === 401) {
      Vue.prototype.$message(response.data.msg);
    }
    return response;
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error.response.status); // 返回接口返回的错误信息
  }
);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
