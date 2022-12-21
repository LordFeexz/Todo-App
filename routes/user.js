const Controller = require("../controllers/user");

const router = require("express").Router();

router.get("/", Controller.getUsers);

router.get("/:id", Controller.getUser);

router.put("/:id", Controller.updateData);

module.exports = router;
