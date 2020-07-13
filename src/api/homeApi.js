import request from "./request";
export default {
  getArchive: async (params) => {
    return request("get", "/archive", params);
  },
  getTags: async () => {
    return request("get", "/tags");
  },
  getBlogger: async () => {
    return request("get", "/blogger");
  },
  updateRead: async () => {
    return request("post", "/updateRead");
  },
  addReader: async (params) => {
    return request("post", "/addReader", params);
  },
};
