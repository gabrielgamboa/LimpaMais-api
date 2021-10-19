const { Router } = require("express");
const UserController = require("../controllers/UserController");

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.createUser);

module.exports = userRoutes;

