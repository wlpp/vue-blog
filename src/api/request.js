import axios from "axios";
const request = (methods, url, params) => {
  return axios[methods](url, methods === "get" ? { params } : params)
    .then((res) => res)
    .catch((err) => err);
};

export default request;
