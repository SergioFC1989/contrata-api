exports.methodRequest = function (method, route, collection, requestType) {
  return {
    method,
    route,
    function: async (req, res) => {
      try {
        const response = await requestType(collection, req);
        return res.json(response);
      } catch (error) {
        const err = new Error(error);
        return res.send({
          message: "Error en el metodo methodRequest",
          err,
        });
      }
    },
  };
};
