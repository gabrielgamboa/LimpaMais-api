const { Router } = require('express');

const { servicesRoutes } = require('./services.routes');
const { diaristsRoutes } = require('./diarists.routes');
const { usersRoutes } = require("./users.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/diarists", diaristsRoutes);
routes.use("/services", servicesRoutes);

module.exports = routes;