const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/pate";
const connect = mongoose.connect(uri);
module.exports = connect