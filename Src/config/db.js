require("dotenv").config();
const { connect, connection } = require("mongoose");

const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/CoMon-Go-Talk";

const initializeDatabaseConnection = async () => {
    try {
        await connect(MONGO_URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

initializeDatabaseConnection();

module.exports = connection;
