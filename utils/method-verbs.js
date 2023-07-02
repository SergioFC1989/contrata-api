const { connectDatabaseMongoDB } = require("../server/mongodb");

exports.fetchGET = async function (collection, req) {
  try {
    const params = Object.keys(req.query).length > 0 ? req.query : undefined;
    const db = await connectDatabaseMongoDB();
    const response = await db.collection(collection).find(params).toArray();
    return response;
  } catch (error) {
    return error;
  }
};
