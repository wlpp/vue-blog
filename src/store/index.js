import Vue from "vue";
import Vuex from "vuex";
import homeStore from "./modules/homeStore";
import articleStore from "./modules/articleStore";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { homeStore, articleStore },
});
