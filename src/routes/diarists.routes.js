const { Router } = require("express");
const { DiaristController } = require("../controllers/DiaristController");

const diaristsRoutes = Router();

const diaristsController = new DiaristController();

diaristsRoutes.post("/", diaristsController.create);
diaristsRoutes.get("/", diaristsController.list);
diaristsRoutes.get("/:id", diaristsController.find);
diaristsRoutes.get("/list", diaristsController.count); //falhando por causa do sequelize

module.exports = { diaristsRoutes };