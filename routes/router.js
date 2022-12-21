const router = require("express").Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const todoRouter = require("./todo");
const categoryRouter = require("./category");
const authentication = require("../middlewares/authentication");

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/todo", authentication, todoRouter);

router.use("/category", authentication, categoryRouter);

module.exports = router;
