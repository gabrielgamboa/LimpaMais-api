const { Router } = require("express");
const { DiaristController } = require("../controllers/DiaristController");

const diaristsRoutes = Router();

const diaristsController = new DiaristController();

diaristsRoutes.post("/create", diaristsController.create);
diaristsRoutes.get("/:id", diaristsController.find);
diaristsRoutes.get("/list", diaristsController.list);
diaristsRoutes.get("/result", diaristsController.count);

module.exports = { diaristsRoutes };