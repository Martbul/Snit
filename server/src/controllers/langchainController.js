const router = require("express").Router();
const knowledgeService = require("../services/knowledgeService.js");
const axios = require("axios");

router.post("/askAQuestion", async (req, res) => {
  const images = req.body.images;
console.log(req.body);
  try {
       const response = await axios.post(
         "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
         {
           inputs: images,
         },
         {
           headers: {
             Authorization: `Bearer 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`,
           },
         }
       );

    res.json(response);
  } catch (error) {
    console.log("err  " + error);
    return error;
  }
});




module.exports = router;
