import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/article",
    name: "Article",
    component: () => import(/* webpackChunkName: "article" */ "../views/article/article.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
