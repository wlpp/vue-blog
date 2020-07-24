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
  updateRead: async (params) => {
    return request("post", "/updateRead", params);
  },
  addReader: async (params) => {
    return request("post", "/addReader", params);
  },
};
