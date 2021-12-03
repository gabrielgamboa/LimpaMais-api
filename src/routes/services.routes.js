const { Router } = require("express");
const { ServiceController } = require("../controllers/ServiceController");

const servicesRoutes = Router();

const serviceController = new ServiceController();

servicesRoutes.post("/create", serviceController.create);
servicesRoutes.get("/:id", serviceController.findServiceById);

module.exports = { servicesRoutes }