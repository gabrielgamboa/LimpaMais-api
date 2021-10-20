require('dotenv').config({
    path: process.env.NODE_ENV.trim() === "dev" ? ".env.dev" : ".env"
});

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log(`Server is running on port ${process.env.PORT}`));