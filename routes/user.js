const Controller = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.get("/", Controller.getUsers);

router.get("/:id", Controller.getUser);

router.use(authentication);

router.put("/:id", Controller.updateData);

module.exports = router;
