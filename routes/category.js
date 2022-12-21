const Controller = require("../controllers/category");

const router = require("express").Router();

router.get("/", Controller.getAll);

router.post("/", Controller.create);

router.patch("/:id", Controller.updateData);

router.delete("/:id", Controller.delete);

module.exports = router;
