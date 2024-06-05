const router = require("express").Router();
const knowledgeService = require("../services/knowledgeService.js");


router.post("/getAllKnowledgeBases", async (req, res) => {
  const userEmail = req.body.userEmail;
  
  try {
    const allUserKnowledgeBases = await knowledgeService.allUserKnowledgeBases(
      userEmail
    );
   
    res.json(allUserKnowledgeBases);
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log("err  " + errorMessages);
    return errorMessages;
  }
});
module.exports = router;




router.post("/createNewKnowledgeBase", async (req, res) => {
  const creator = req.body.email
  
  try {
    const newKnowledgeBase = await knowledgeService.createNewKnowledgeBase(
      creator
    );
    ;
    res.json(newKnowledgeBase);
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log("err  " + errorMessages);
    return errorMessages;
  }
});







router.post("/addFilesToKnowledgeBase", async (req, res) => {
  console.log(req.body);
  const { fileUrl, creator, title } = req.body;
  const owner = creator
  try {
    const newFileToKnowledgeBase =
      await knowledgeService.addFileToSelectedKnoledgeBase(
        title,
        fileUrl,
        owner
      );

    res.json(newFileToKnowledgeBase);
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the video." });
  }
});

module.exports = router;
