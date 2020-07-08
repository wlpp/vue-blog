import request from "./request";
export default {
  getArticles: async (params) => {
    return request(
      `/articles?title=${params.title}&tagNames=${params.tagNames}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
    );
  },
  getTags: async () => {
    return request("/tags");
  },
  getInformation: async () => {
    return request("/information");
  },
  updateRead: async () => {
    return request("/updateRead", "post");
  },
  addReader: async (params) => {
    return request(`/addReader?name=${params.name}&email=${params.email}`, "post");
  },
};
