const express = require("express");
const cors = require("cors");

const { API } = require("./api/api.js");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

API.forEach((elem) => {
  app
    .route(elem.route)
    [elem.method.toLowerCase()](async (req, res) => elem.function(req, res));
});

app.listen(port, () => {
  console.debug(`server is running in port ${port}`);
});
