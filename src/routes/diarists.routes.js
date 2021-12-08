const { Router } = require("express");
const { DiaristController } = require("../controllers/DiaristController");

const diaristsRoutes = Router();

const diaristsController = new DiaristController();

diaristsRoutes.post("/", diaristsController.create);
diaristsRoutes.get("/", diaristsController.list);
diaristsRoutes.get("/:id", diaristsController.find);
diaristsRoutes.patch("/:id", diaristsController.update);

module.exports = { diaristsRoutes };