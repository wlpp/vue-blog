import axios from "axios";
const request = (url, method = "get") => {
  return axios({
    url,
    method,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default request;
