require("dotenv").config();
const { connect, connection } = require("mongoose");

connect("mongodb://127.0.0.1:27017/CoMon-Go-Talk");


module.exports = connection;
