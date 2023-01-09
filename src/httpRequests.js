// peticiones http de tipo .get a Axios.
const axios = require("axios");

const getHttpStatus = (urls) => {
  const promises = urls.map((url) => {
    return axios
    .get(url.href, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    })
    .then((response)=>{
      const status = response.status;
      return {...url, status: status, message: "ok"};
    })
    .catch((error)=>{
      const errorStatus = error.response.status;
      return {...url, status: errorStatus, message: "fail"};
    });
  });
  return Promise.all(promises);
}

module.exports = getHttpStatus;
