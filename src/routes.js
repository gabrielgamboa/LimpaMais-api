// modularizar as rotas da aplicação
const express = require('express');

const routes = express.Router();

routes.get("/", (req, res) => {
    res.json({Hello: 'world'});
});

module.exports = routes;