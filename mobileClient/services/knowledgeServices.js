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
    console.log("response", response);
    throw new Error(response);
  }
  console.log(response);

  return response;
};




export const createKnowledgeBase = async (email) => {
   
   const body = {email}
   const response = await postRequest(`${baseUrl}/knowledge/createNewKnowledgeBase`, JSON.stringify(body));

  if (response.error) {
    console.log("response", response);
    throw new Error(response);
   }
   console.log(response);

  return response;
};
