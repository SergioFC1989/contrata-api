const {
  fetchGET,
  fetchPOST,
  fetchUPDATE,
} = require("../../utils/method-verbs");
const { methodRequest } = require("../../utils/method-request");

const configUser = {
  route: "/user",
  collection: "user",
  verbs: [
    { method: "GET", requestType: fetchGET },
    { method: "POST", requestType: fetchPOST },
    { method: "PUT", requestType: fetchUPDATE },
  ],
};

exports.API_USER = configUser.verbs.map((elem) => {
  return methodRequest(
    elem.method,
    configUser.route,
    configUser.collection,
    elem.requestType
  );
});
