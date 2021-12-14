const { Router } = require("express");
const multer = require("multer");

const { DiaristController } = require("../controllers/DiaristController");
const multerConfig = require("../config/multer");

const diaristsRoutes = Router();
const upload = multer(multerConfig);

const diaristsController = new DiaristController();

diaristsRoutes.post("/", diaristsController.create);
diaristsRoutes.get("/", diaristsController.list);
diaristsRoutes.get("/:id", diaristsController.find);
diaristsRoutes.patch("/:id", diaristsController.update);
diaristsRoutes.patch("/:id/upload", upload.single('file'), diaristsController.upload);
diaristsRoutes.get("/:id/services", diaristsController.findServicesByDiaristId);

module.exports = { diaristsRoutes };