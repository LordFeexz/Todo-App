const router = require("express").Router();
const userRouter = require("./user");
const authRouter = require("./auth");
const authentication = require("../middlewares/authentication");

router.use("/user", authentication, userRouter);

router.use("/auth", authRouter);

module.exports = router;
