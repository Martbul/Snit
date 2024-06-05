const router = require("express").Router();

const userController = require("./controllers/userController");
const videoController = require("./controllers/videoController");
const knowledgeController = require("./controllers/knowledgeController");


router.use("/users", userController);
router.use("/videos", videoController);
router.use("/knowledge", knowledgeController);

module.exports = router;
