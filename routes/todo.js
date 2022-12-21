const Controller = require("../controllers/todo");

const router = require("express").Router();

router.get("/", Controller.getMyData);

router.post("/", Controller.create);

router.patch("/:id", Controller.completed);

router.delete("/:id", Controller.delete);

module.exports = router;
