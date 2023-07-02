const { fetchPOST } = require("../../utils/method-verbs");

exports.API_INSERT_USER = {
  method: "POST",
  route: "/user",
  function: async (req, res) => {
    try {
      const response = await fetchPOST("user", req);
      return res.json(response);
    } catch (error) {
      const err = new Response(error);
      throw res.send(err);
    }
  },
};
