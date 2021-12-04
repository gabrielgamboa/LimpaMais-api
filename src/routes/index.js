const { Router } = require("express");

const { usersRoutes } = require("./users.routes");
const { diaristsRoutes } = require("./diarists.routes");
const { servicesRoutes } = require("./services.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/diarists", diaristsRoutes);
routes.use("/services", servicesRoutes);

module.exports = { routes };