const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/create", userController.createUser);
userRouter.get("/:id", userController.protectUser, userController.getUser);
userRouter.put("/:id", userController.userUpdate);

module.exports = userRouter;