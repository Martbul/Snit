export const generateText = async (images) => {
  try {
    const prompt = {
      inputs:
        "Can you please let us know more details about your car? You are an intelligent car dealer and know everything about cars. These are pictures of cars. I want you to tell me what is this car, model of the car, how old it is, and as much data about it as possible.",
      images: images,
      temperature: 0.5,
    };

    const response = await fetch(
      // "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",

      "https://api-inference.huggingface.co/models/openai-community/gpt2",
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

