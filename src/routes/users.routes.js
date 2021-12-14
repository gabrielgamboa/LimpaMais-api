const { Router } = require("express");
const multer = require("multer");

const { UserController } = require("../controllers/UserController");
const multerConfig = require("../config/multer");

const usersRoutes = Router();
const upload = multer(multerConfig);

const userController = new UserController();

usersRoutes.post("/", userController.create);
usersRoutes.get("/:id", userController.find);
usersRoutes.post("/login", userController.login);
usersRoutes.patch("/:id", upload.single('file'), userController.update);
usersRoutes.get("/:id/services", userController.findServicesByUserId);

module.exports = { usersRoutes };

