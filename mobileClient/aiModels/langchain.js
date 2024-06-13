//TODO: groq doesnt support images but can be used for text, so make it to work with the documents a user provides
export const generateText = async (images) => {
 
  try {
    const GROQ_API_KEY =
      "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";
    const data = JSON.stringify({
      messages: [
        {
          role: "user",
          content: "I have subaru BRZ. I t is 2 years old and has some craks on the door.",
        },
        {
          role: "assistant",
          content: `You are an expert car dealer. You know evertyhin about every car. 
          You will be given images of some car and you must tell me what brand is the car,
          what model it is, what age it is, is it in good condition, what this car market
           value(range in dollars(the range must not be big)) is and what are some easy fixes that can be made to upper the price(also describe how much these fixes will cost)? Dont ask questions.
           Answer in form of a JSON. Ig you have additional info set it as "additional_info" in the JSON.
           Return only the JSON!`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 2024,
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
       //  throw new Error("Network response was not ok", response);
       console.log(response);
       throw Error(response.message)
     }
     return response.json();
   })
   .then((responseText) => {
     console.log(responseText.choices[0].message.content); 
   })
   .catch((error) => console.error("Error:", error));


  } catch (error) {
    console.error("Error:", error.message);
    return { error: error.message };
  }
};

