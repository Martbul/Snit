
export const generateText = async (images) => {
  try {
    const GROQ_API_KEY =
      "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";
    const data = JSON.stringify({
      messages: [
        {
          role: "user",
          content: "who is grigor dimitrov?\n",
        },
        {
          role: "assistant",
          content: `You are a tennis history expert and know evertyhing about every tennis player.`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

 fetch("https://api.groq.com/openai/v1/chat/completions", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${GROQ_API_KEY}`,
   },
   body: data,
 })
   .then((response) => {
     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     return response.json();
   })
   .then((responseText) => {
     console.log(responseText.choices[0].message.content); // Log the response text
   })
   .catch((error) => console.error("Error:", error));


  } catch (error) {
    console.error("Error:", error.message);
    return { error: error.message };
  }
};


// const Groq = require("groq-sdk");

// const groq = new Groq();

// export const generateText = async (images) => {
//   try {
//      const chatCompletion = await groq.chat.completions.create({
//        messages: [
//          {
//            role: "user",
//            content: "what is the current calue for mx-3 1998\n",
//          },
//          {
//            role: "assistant",
//            content:
//              "A sweet ride!\n\nThe Mazda MX-3 is a rare and quirky car, and its value can vary depending on several factors, such as the condition, mileage, location, and trim level. Here are some general guidelines on the current value of a 1998 Mazda MX-3:\n\n** Kelley Blue Book (KBB) Values **\n\n* Good condition, average mileage (around 100,000 miles): $1,350 - $2,350\n* Good condition, low mileage (around 50,000 miles): $2,350 - $3,350\n* Excellent condition, low mileage (around 30,000 miles): $3,350 - $4,350\n\n** National Automobile Dealers Association (NADA) Values **\n\n* Good condition, average mileage (around 100,000 miles): $1,500 - $2,500\n* Good condition, low mileage (around 50,000 miles): $2,500 - $3,500\n* Excellent condition, low mileage (around 30,000 miles): $3,500 - $4,500\n\n** eBay and private sales listings **\n\n* Prices on eBay and private sales listings can vary widely, but here are some examples:\n\t+ Low-mileage (around 30,000 miles), good condition: $3,000 - $4,500\n\t+ Average-mileage (around 100,000 miles), good condition: $1,500 - $2,500\n\t+ High-mileage (around 150,000 miles), fair condition: $800 - $1,500\n\nKeep in mind that these values are estimates and can vary depending on your location, the car's condition, and other factors. If you're considering buying or selling a 1998 Mazda MX-3, I recommend researching local listings, consulting with a mechanic, and getting an appraisal to determine a fair market value.",
//          },
//        ],
//        model: "llama3-70b-8192",
//        temperature: 1,
//        max_tokens: 1024,
//        top_p: 1,
//        stream: true,
//        stop: null,
//      });

//      for await (const chunk of chatCompletion) {
//        process.stdout.write(chunk.choices[0]?.delta?.content || "");
//     }
    

//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return { error: error.message };
//   }
// };



// export const generateText = async (images) => {
//   try {
//     const systemPrompt = {
//       role: "system",
//       content:
//         "You are an intelligent car dealer and know everything about cars. These are pictures of cars. I want you to tell me what is this car, model of the car, how old it is, and as much data about it as possible.",
//     };

//     const userPrompt = {
//       role: "user",
//       content: "Here are the car images.",
//     };

//     // Assuming images is an array of base64-encoded strings
//     const inputs = images.join(" "); // Combine all images into a single string separated by space

//     const prompt = {
//       messages: [systemPrompt, userPrompt],
//       temperature: 0.5,
//       inputs: inputs, // Ensure inputs is a single string
//     };

//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
//       {
//         headers: {
//           Authorization: "Bearer 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",
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(prompt),
//       }
//     );

//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(`Failed to fetch data from the server: ${errorDetails}`);
//     }

//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return { error: error.message };
//   }
// };
