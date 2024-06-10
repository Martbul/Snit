import { baseUrl, postRequest, getRequest } from "../utils/request";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const askAQuestion = async (images) => {
  const response = await postRequest(
    `${baseUrl}/langchain/askAQuestion`,
    JSON.stringify({ images })
  );

  if (response.error) {
    console.log("error", response);
    throw new Error(response);
  }

  return response;
};


