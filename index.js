require('dotenv').config();

const express = require('express');
const db = require('./Src/config/db');
const routes = require('./Src/routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server live at Port: ${PORT}`);
    });
});