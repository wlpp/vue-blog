import router from "@/router";

const path = {
  // 去文章页
  goArticle(id) {
    router.push({ path: `/article/${id}` });
  },
};

export default path;
