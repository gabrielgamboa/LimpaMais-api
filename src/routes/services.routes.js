const { Router } = require("express");

const { RatingController } = require("../controllers/RatingController");
const { ServiceController } = require("../controllers/ServiceController");

const servicesRoutes = Router();

const serviceController = new ServiceController();
const ratingController = new RatingController();

servicesRoutes.post("/", serviceController.create);
servicesRoutes.get("/:id", serviceController.findServiceById);

servicesRoutes.post("/:id/rating", ratingController.create);
servicesRoutes.get("/:id/rating", ratingController.findByServiceId);

module.exports = { servicesRoutes }