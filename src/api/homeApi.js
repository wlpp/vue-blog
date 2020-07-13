import request from "./request";
export default {
  getArticles: async (params) => {
    return request("get", "/articles", params);
  },
  getTags: async () => {
    return request("get", "/tags");
  },
  getInformation: async () => {
    return request("get", "/information");
  },
  updateRead: async () => {
    return request("post", "/updateRead");
  },
  addReader: async (params) => {
    return request("post", "/addReader", params);
  },
};
