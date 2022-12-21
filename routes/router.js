const router = require("express").Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const todoRouter = require("./todo");
const authentication = require("../middlewares/authentication");

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/todo", authentication, todoRouter);

module.exports = router;
