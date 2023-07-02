const { API_INSERT_USER } = require("./insert-user");
const { API_QUERY_USER } = require("./query-user");

exports.API_USER = [API_QUERY_USER, API_INSERT_USER];
