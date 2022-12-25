const Controller = require("../controllers/category");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.get("/", Controller.getAll);

router.use(authentication);

router.post("/", Controller.create);

router.patch("/:id", Controller.updateData);

router.delete("/:id", Controller.delete);

module.exports = router;
