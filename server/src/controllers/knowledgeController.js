const router = require("express").Router();
const knowledgeService = require("../services/knowledgeService.js");


router.post("/getAllKnowledgeBases", async (req, res) => {
  const userEmail = req.body.userEmail;
  console.log(userEmail);
  try {
    const allUserKnowledgeBases = await knowledgeService.allUserKnowledgeBases(
      userEmail
    );
    console.log(allUserKnowledgeBases);
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
  console.log(creator);
  try {
    const newKnowledgeBase = await knowledgeService.createNewKnowledgeBase(
      creator
    );
    console.log(newKnowledgeBase);
    res.json(newKnowledgeBase);
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log("err  " + errorMessages);
    return errorMessages;
  }
});
module.exports = router;
