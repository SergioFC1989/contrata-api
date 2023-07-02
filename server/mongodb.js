require("dotenv").config({});
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDatabaseMongoDB = async function () {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    return db;
  } catch (error) {
    const err = new Response(error);
    throw res.send(err);
  }
};

const disconnectDatabaseMongoDB = async function () {
  try {
    await client.close();
  } catch (error) {
    const err = new Response(error);
    throw res.send(err);
  }
};

module.exports = { connectDatabaseMongoDB, disconnectDatabaseMongoDB };
