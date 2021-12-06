const { Router } = require("express");
const { UserController } = require("../controllers/UserController");

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.create);
usersRoutes.get("/:id", userController.find);
usersRoutes.post("/login", userController.login);

module.exports = { usersRoutes };

