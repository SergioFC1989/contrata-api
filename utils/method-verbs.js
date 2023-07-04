const { connectDatabaseMongoDB } = require("../server/mongodb");

exports.fetchGET = async function (collection, req) {
  try {
    const params = Object.keys(req.query).length > 0 ? req.query : undefined;
    const db = await connectDatabaseMongoDB();
    const response = await db.collection(collection).find(params).toArray();
    return response;
  } catch (error) {
    const err = new Error(error);
    return {
      message: "Error al leer el registro",
      err,
    };
  }
};

exports.fetchPOST = async function (collection, req) {
  const typeInsert = typeof req.body === "object" ? "insertOne" : "insertMany";
  try {
    const db = await connectDatabaseMongoDB();
    const response = await db.collection(collection)[typeInsert](req.body);
    return response;
  } catch (error) {
    const err = new Error(error);
    return {
      message: "Error al crear el registro",
      err,
    };
  }
};

exports.fetchUPDATE = async function (collection, req) {
  try {
    const db = await connectDatabaseMongoDB();
    const response = await db
      .collection(collection)
      .updateMany({ $or: req.body.filter }, { $set: req.body.data });
    return response;
  } catch (error) {
    const err = new Error(error);
    return {
      message: "Error al actualizar el registro",
      err,
    };
  }
};

exports.fetchDELETE = async function (collection, req) {
  try {
    const db = await connectDatabaseMongoDB();
    const response = await db
      .collection(collection)
      .deleteMany({ $or: req.body.filter });
    return response;
  } catch (error) {
    const err = new Error(error);
    return {
      message: "Error al eliminar el registro",
      err,
    };
  }
};
