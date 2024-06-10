// import { HuggingFaceInference } from "langchain/llms/";


// const apiKey = "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";

// export const generateText = async (prompt) => {
//    const hfInference = new HuggingFaceInference(apiKey);
//   prompt = prompt + " What you see on this picture?"
//   console.log(prompt);

//   try {
//     const res = await hfInference.textGeneration({
//       model: "gpt2",
//       inputs: prompt,
//     });
//       console.log(res.generated_text);
//     return res.generated_text;
//   } catch (error) {
//     throw new Error("An error occurred while generating the text.");
//   }
// };


export const generateText = async (prompt)=> {
  const data =  'https://firebasestorage.googleapis.com/v0/b/snit-82af4.appspot.com/o/images%2F1717654155537Screenshot_20240605_182302_Chrome.jpg?alt=media&token=03e028d5-cc68-4088-a102-609b2c4b17dc'
  const response = await fetch(
    "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: data,
    }
  );
   const result = await response.json();
   console.log(result);
  return result;
}
