const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { API } = require("./api/api.js");

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.static("public"));
app.use(compression());
app.use(cors());
app.use(helmet());

API.forEach((elem) => {
  app.route(elem.route)[elem.method.toLowerCase()](async (req, res) => {
    try {
      await elem.function(req, res);
    } catch (error) {
      res.send(error);
    }
  });
});

app.listen(port, () => {
  console.debug(`server is running in port ${port}`);
});
