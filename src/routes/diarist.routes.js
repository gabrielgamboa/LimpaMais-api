const { Router } = require("express");
const { DiaristController } = require("../controllers/DiaristController");

const diaristsRoutes = Router();

const diaristsController = new DiaristController();

diaristsRoutes.post("/create", diaristsController.create);


module.exports = { diaristsRoutes };