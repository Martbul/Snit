import { baseUrl, postRequest, getRequest } from "../utils/request";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";



export const getAllKnowledgeBases = async (userEmail) => {
 
  const response = await postRequest(
    `${baseUrl}/knowledge/getAllKnowledgeBases`,
    JSON.stringify({ userEmail })
  );

  if (response.error) {
    console.log("error", response);
    throw new Error(response);
  }
 

  return response;
};




export const createKnowledgeBase = async (email) => {
   
   const body = {email}
   const response = await postRequest(`${baseUrl}/knowledge/createNewKnowledgeBase`, JSON.stringify(body));

  if (response.error) {
    console.log("error", response);
    throw new Error(response);
   }
  

  return response;
};









export const uploadFileToCloud = async (file, type) => {
  console.log("uploading files to firebase");
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  console.log("asset", asset);

  const storage = getStorage(app);
  const folder = type === "image" ? "images/" : "docs/";

  const fileName = new Date().getTime() + asset.name;
  const storageRef = ref(storage, folder + fileName);
  const response = await fetch(asset.uri);
  const blob = await response.blob();

  // Create the upload task
  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch(reject);
      }
    );
  });
};



export const addFilesToKnowledgeBase = async (
  file,
  selectType,
  creator,
  title,
  
) => {
  try {
    let body;
    if (selectType === "image") {
      const fileUrl = await uploadFileToCloud(file, selectType);
      body = { fileUrl, creator, title };
    } else if (selectType === "docs") {
      const fileUrl = await uploadFileToCloud(file, selectType);
      body = { fileUrl, creator, title };
    }

    const response = await fetch(
      `${baseUrl}/knowledge/addFilesToKnowledgeBase`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("new video", result);
      return result;
    } else {
      console.error("response", result);
      throw new Error(result);
    }
  } catch (error) {
    throw new Error(error);
  }
};



export const getCurrentKnowledgeBaseImages = async (title,userEmail) => {

  const response = await postRequest(
    `${baseUrl}/knowledge/getCurrentKnowledgeBaseImages`,

    JSON.stringify({ title, userEmail })
  );

  if (response.error) {
    console.log("error", response);
    throw new Error(response);
  }
  console.log("DATA", response);

  return response;
};

export const getcurrentKnowledgeBaseDocs = async (title, userEmail) => {
  const response = await postRequest(
    `${baseUrl}/knowledge/getCurrentKnowledgeBaseDocs`,

    JSON.stringify({ title, userEmail })
  );

  if (response.error) {
    console.log("error", response);
    throw new Error(response);
  }
  console.log("DATA", response);

  return response;
};



