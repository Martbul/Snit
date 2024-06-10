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


// export const generateText = async (images) => {
//   console.log(images);
//   const data =  'https://firebasestorage.googleapis.com/v0/b/snit-82af4.appspot.com/o/images%2F1717654155537Screenshot_20240605_182302_Chrome.jpg?alt=media&token=03e028d5-cc68-4088-a102-609b2c4b17dc'
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
//     {
//       headers: {
//         Authorization: "Bearer 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",
//       },
//       method: "POST",
//       body: data,
//     }
//   );
//    const result = await response.json();
//    console.log(result);
//   return result;
// }
// export const generateText = async (images) => {
//   try {
//     const prompt = {
//       images: images,
//       messages: [
//         {
//           System:
//             "You are an intelegent car dealer and know everything about cars. These are pictures of cars. I want you to tell me what is this car, model of the car, how old it is, and as much data about it as possible",
//         },
//       ],
//       temperature: 0.5,
//     };

//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//           inputs: "Can you please let us know more details about your ",
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch data from the server", response);
//     }

//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return { error: error.message };
//   }
// };

export const generateText = async (images) => {
  try {
    const prompt = {
      inputs:
        "Can you please let us know more details about your car? You are an intelligent car dealer and know everything about cars. These are pictures of cars. I want you to tell me what is this car, model of the car, how old it is, and as much data about it as possible.",
      images: images,
      temperature: 0.5,
    };

    const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(prompt),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
    return { error: error.message }; // You can handle the error as per your requirements
  }
};

