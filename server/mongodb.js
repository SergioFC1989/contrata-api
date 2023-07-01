require("dotenv").config({});
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const onConnectMongoDB = async function () {
  try {
    await client.connect();
    await client.db(process.env.MONGODB_DATABASE).command({ ping: 1 });
    return "Conected success!!";
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};

exports.API_MONGODB = {
  method: "GET",
  route: "/",
  function: async (_req, _res) => {
    try {
      return _res.send(await onConnectMongoDB());
    } catch (error) {
      return _res.send(error);
    }
  },
};
