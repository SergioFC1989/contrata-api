const compression = require("compression");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const helmet = require("helmet");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const { disconnectDatabaseMongoDB } = require("./server/mongodb");
const { API } = require("./api");

const port = process.env.PORT || 3000;
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(helmet());

API.forEach((elem) => {
  app
    .route(elem.route)
    [elem.method.toLowerCase()](upload.none(), async (req, res) => {
      try {
        await elem.function(req, res);
      } catch (error) {
        const err = new Response(error);
        throw res.send({
          message: "Error en la solicitud de peticion de Express",
          err,
        });
      } finally {
        await disconnectDatabaseMongoDB();
      }
    });
});

const swaggerDocument = YAML.load(path.resolve(__dirname, "openapi.yaml"));
app.use(
  "/swagger-ui.css",
  express.static(path.join(__dirname, "public", "swagger-ui.css"))
);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.debug(`server is running in port ${port}`);
});
