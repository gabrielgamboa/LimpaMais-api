const { Router } = require("express");
const { DiaristController } = require("../controllers/DiaristController");

const diaristsRoutes = Router();

const diaristsController = new DiaristController();

diaristsRoutes.get("/list", diaristsController.list);
diaristsRoutes.get("/result", diaristsController.result);
diaristsRoutes.post("/create", diaristsController.create);

module.exports = { diaristsRoutes };