require('dotenv').config();

const express = require('express');
const db = require('./Src/config/db');
const routes = require('./Src/routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server live at Port: ${PORT}`);
    });
});