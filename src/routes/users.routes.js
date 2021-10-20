const { Router } = require("express");
const { UserController } = require("../controllers/UserController")

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/login", userController.login);
usersRoutes.post("/create", userController.store);

module.exports = { usersRoutes };

