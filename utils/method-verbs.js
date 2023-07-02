const { connectDatabaseMongoDB } = require("../server/mongodb");

exports.fetchGET = async function (collection, req) {
  try {
    const params = Object.keys(req.query).length > 0 ? req.query : undefined;
    const db = await connectDatabaseMongoDB();
    const response = await db.collection(collection).find(params).toArray();
    return response;
  } catch (error) {
    const err = new Response(error);
    throw res.send(err);
  }
};

exports.fetchPOST = async function (collection, req) {
  const insert = typeof req.body === "object" ? "insertOne" : "insertMany";
  try {
    const db = await connectDatabaseMongoDB();
    const response = await db.collection(collection)[insert](req.body);
    return response;
  } catch (error) {
    const err = new Response(error);
    throw res.send(err);
  }
};
