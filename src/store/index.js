import Vue from "vue";
import Vuex from "vuex";
import homeStore from "./modules/homeStore";
import articleStore from "./modules/articleStore";
import loginStore from "./modules/loginStore";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { homeStore, articleStore, loginStore },
});
