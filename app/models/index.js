const mongoose = require ("mongoose");

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;

// models 
db.user = require ("./users.model");
db.role = require ("./role.model");
db.isolated = require("./isolated.model");
db.refreshToken = require('./refreshToken.model');
db.ROLES = ["fiscal", "admin", "moderator"];

module.exports = db;