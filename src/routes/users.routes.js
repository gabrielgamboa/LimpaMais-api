const { Router } = require("express");
const { UserController } = require("../controllers/UserController");

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.create);
usersRoutes.get("/:id", userController.find);
usersRoutes.post("/login", userController.login);
usersRoutes.patch("/:id", userController.update);

module.exports = { usersRoutes };

