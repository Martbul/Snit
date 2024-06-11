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
})




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




router.post("/getCurrentKnowledgeBaseImages", async (req, res) => {
  const title = req.body.title;
  const userEmail = req.body.userEmail;
  try {
    const currentKnowledgeBaseImages =
      await knowledgeService.getCurrentKnowledgeBaseImages(title, userEmail);
    res.json(currentKnowledgeBaseImages);
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log("err  " + errorMessages);
    return errorMessages;
  }
});



router.post("/getCurrentKnowledgeBaseDocs", async (req, res) => {
  const title = req.body.title;
  const userEmail = req.body.userEmail;
  try {
    const currentKnowledgeBaseDocs =
      await knowledgeService.getCurrentKnowledeBaseDocs(title, userEmail);
    res.json(currentKnowledgeBaseDocs);
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log("err  " + errorMessages);
    return errorMessages;
  }
});

router.post("/deleteFileFromCurrentKnowledgeBase",
  async (req, res) => {
    try {
      const fileFirebaseUrl = req.body.fileFirebaseUrl;
      const knowledgeBaseTitle = req.body.knowledgeBaseTitle;
      const creator = req.body.creator;
    
      
      const successfilDelete = await knowledgeService.deleteFileFromCurrentKnowledgeBase(
          fileFirebaseUrl,
          knowledgeBaseTitle,
          creator
        );
       res.json(successfilDelete);
    } catch (error) {
      const errorMessages = extractErrorMsgs(error);
      console.log("err  " + errorMessages);
      return errorMessages;
    }
  }
);



router.put("/editKnowledgeBaseName", async (req, res) => {
  const { newName, knowledgeBaseTitle, creator } = req.body;
  console.log(newName, knowledgeBaseTitle, creator);
  try {
    const updatedKBname = await knowledgeService.editKnowledgeBaseName(
      newName,
      knowledgeBaseTitle,
      creator
    );

    const allUserKnowledgeBases = await knowledgeService.allUserKnowledgeBases(
      creator
    );

        res.json(allUserKnowledgeBases);
      
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log("err  " + errorMessages);
    return errorMessages;
  }
});






module.exports = router;
