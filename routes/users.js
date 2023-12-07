const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controllers");
const todosController = require("../controllers/todosController");
router.post("/register", usersController.register);
router.post("/login", usersController.login);

router.post("/create-todo", todosController.createTodo);
router.post("/delete-todo", todosController.deleteTodo);
router.post("/edit-todo", todosController.editTodo);
router.post("/toggle-todo", todosController.markTodo);

router.get("/get-todos", todosController.fetchTodo);

module.exports = router;
