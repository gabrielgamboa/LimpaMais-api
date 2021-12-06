const { Router } = require("express");
const { DiaristController } = require("../controllers/DiaristController");

const diaristsRoutes = Router();

const diaristsController = new DiaristController();

diaristsRoutes.post("/", diaristsController.create);
diaristsRoutes.get("/", diaristsController.list);
diaristsRoutes.get("/:id", diaristsController.find);
diaristsRoutes.post("/list", diaristsController.count); //falhando caso trocar por GET

module.exports = { diaristsRoutes };