const { Router } = require('express');

const { diaristsRoutes } = require('./diarist.routes');
const { usersRoutes } = require("./users.routes");


const routes = Router();

routes.use("/users", usersRoutes);
routes.use("diarists", diaristsRoutes);

module.exports = routes;