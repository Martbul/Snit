const router = require("express").Router();

const userController = require("./controllers/userController");
const videoController = require("./controllers/videoController");
const knowledgeController = require("./controllers/knowledgeController");
const langchainController = require("./controllers/langchainController");


router.use("/users", userController);
router.use("/videos", videoController);
router.use("/knowledge", knowledgeController);
router.use("/langchain", langchainController);

module.exports = router;
