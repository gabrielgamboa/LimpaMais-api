const { Router } = require("express");

const { usersRoutes } = require("./users.routes");
const { diaristsRoutes } = require("./diarists.routes");
const { servicesRoutes } = require("./services.routes");
const { ratingsRoutes } = require("./ratings.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/diarists", diaristsRoutes);
routes.use("/services", servicesRoutes);
routes.use("/ratings", ratingsRoutes);

module.exports = { routes };