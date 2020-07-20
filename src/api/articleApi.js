import request from "./request";
export default {
  getArticle: async (params) => {
    return request("get", "/getArticle", params);
  },
  updateArticle: async (params) => {
    return request("post", "/updateArticle", params);
  },
  addArticle: async (params) => {
    return request("post", "/addArticle", params);
  },
  likeArticle: async (params) => {
    return request("post", "/likeArticle", params);
  },
};
