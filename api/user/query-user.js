const { fetchGET } = require("../../utils/method-verbs");

exports.API_QUERY_USER = {
  method: "GET",
  route: "/user",
  function: async (req, res) => {
    try {
      const response = await fetchGET("user", req);
      return res.json(response);
    } catch (error) {
      return res.send(error);
    }
  },
};
