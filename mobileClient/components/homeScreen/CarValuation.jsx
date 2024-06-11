import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { askAQuestion } from "../../services/langchainServices";
import { generateText } from "../../aiModels/langchain";


export const CarValuation = ({ selectedKnowedgeBase }) => {
 
    const [aiResponse, setAiResponse] = useState(null);
    let { title, images } = selectedKnowedgeBase;
  
  
  useEffect(() => {
    
    const AIresponse = async () => {
      const result = await generateText(images);
      console.log("AIAIAIAI", result[0].generated_text);
      setAiResponse(result[0].generated_text);
    };
    AIresponse();
  }, []);

  return (
    <>
      <View>
       
        <Text className="text-white text-center font-psemibold">
          AiResult: {aiResponse ? (<Text>{aiResponse}</Text>) : null}
        </Text>
      </View>
    </>
  );
}