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
    path: "/article/:id",
    name: "Article",
    component: () => import(/* webpackChunkName: "article" */ "../views/article/article.vue"),
  },
  {
    path: "/write",
    name: "Write",
    component: () => import(/* webpackChunkName: "write" */ "../views/write/write.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to);
//   // console.log(from);
//   next();
// });
export default router;
