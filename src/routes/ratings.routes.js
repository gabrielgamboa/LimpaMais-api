const { Router } = require("express");
const { RatingController } = require("../controllers/RatingController");

const ratingsRoutes = Router();

const ratingController = new RatingController();

ratingsRoutes.post("/create", ratingController.create);
ratingsRoutes.get("/:id", ratingController.find);

module.exports = { ratingsRoutes };
