const express = require("express");
const router = express.Router();

router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);
router.post("/create", usersController.create);
