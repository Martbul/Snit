const Knowledgebase = require("../models/Knowledgebase");


exports.createNewKnowledgeBase = async (creator) => {
  try {
    const existingKnowledgeBases = await Knowledgebase.find({});
    let newKnowledgeBaseName = "untitledbase";
    if (existingKnowledgeBases.length > 0) {
      newKnowledgeBaseName = `untitledbase${existingKnowledgeBases.length + 1}`;
    }

    const newKnowledgeBase = new Knowledgebase({
      title: newKnowledgeBaseName,
      creator,
    });
    await newKnowledgeBase.save();

 
    return newKnowledgeBase;
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    throw error;
  }
};

exports.allUserKnowledgeBases = async (userEmail) => {
  try {
    const allUserKnowledgeBases = await Knowledgebase.find({
      creator: userEmail,
    }).sort({
      createdAt: -1,
    });
    return allUserKnowledgeBases;
  } catch (err) {
    console.log("err: " + err);
  }
};

;



exports.addFileToSelectedKnoledgeBase = async (title, fileUrl, owner) => {
  try {
 
    const creator = owner.creator;

    const knowledgeBase = await Knowledgebase.findOne({
      title,
      creator,
    });

    if (!knowledgeBase) {
      throw new Error("KnowledgeBase not found or you're not the owner.");
    }

    const fileType =
      fileUrl.includes("/pdf%") ||
      fileUrl.includes("/docs%") ||
      fileUrl.includes("/xlsx%")
        ? "document"
        : "image";

    if (fileType === "image") {
      knowledgeBase.images.push(fileUrl);
    } else {
      knowledgeBase.docs.push(fileUrl);
    }
    const updatedKnowledgeBase = await knowledgeBase.save();

    return updatedKnowledgeBase;
  } catch (err) {
    console.log("err: " + err);
  }
};





exports.getCurrentKnowledgeBaseImages = async (title, userEmail) => {
 
  try {
    const knowledgeBase = await Knowledgebase.find({
      title,
      creator: userEmail,
    })

      const allImages = knowledgeBase.flatMap((entry) => entry.images || []);
      return allImages;
    
  } catch (err) {
    console.log("err: " + err);
  }
};



exports.getCurrentKnowledeBaseDocs = async (title, userEmail) => {
  try {
    const knowledgeBase = await Knowledgebase.find({
      title,
      creator: userEmail,
    });

    const allDocs = knowledgeBase.flatMap((entry) => entry.docs || []);
    return allDocs;
  } catch (err) {
    console.log("err: " + err);
  }
};




exports.deleteFileFromCurrentKnowledgeBase = async (
  fileFirebaseUrl,
  knowledgeBaseTitle,
  creator
) => {
  try {
  

    const knowledgeBase = await Knowledgebase.findOne({
      title: knowledgeBaseTitle,
      creator,
    });
    console.log(knowledgeBase);

    if (!knowledgeBase) {
      throw new Error("Knowledge base not found.");
    }

   const isImage = fileFirebaseUrl.includes("/images%");
    const isDocument =
      fileFirebaseUrl.includes("/docs%") ||
      fileFirebaseUrl.includes("/xlsx%") ||
      fileFirebaseUrl.includes("/pdf%");
    
    if (!isImage && !isDocument) {
      throw new Error("Invalid file type.");
    }

    if (isImage) {
      knowledgeBase.images = knowledgeBase.images.filter(
        (image) => image !== fileFirebaseUrl
      );
    } else if (isDocument) {
      knowledgeBase.docs = knowledgeBase.docs.filter(
        (doc) => doc !== fileFirebaseUrl
      );
    }

   
    await knowledgeBase.save();

    return knowledgeBase; 


  } catch (err) {
    console.log("err: " + err);
  }
};



exports.editKnowledgeBaseName = async (
  newName,
  knowledgeBaseTitle,
  creator
) => {
  try {
    const knowledgeBase = await Knowledgebase.findOne({
      title: knowledgeBaseTitle,
      creator,
    });
   

    if (!knowledgeBase) {
      throw new Error("Knowledge base not found.");
    }

    knowledgeBase.title = newName; 
    const updatedKBname = await knowledgeBase.save(); 
    return updatedKBname; 
  } catch (err) {
    console.log("err: " + err);
  }
};