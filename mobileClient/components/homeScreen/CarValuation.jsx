import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { askAQuestion } from "../../services/langchainServices";
import { generateText } from "../../aiModels/langchain";


export const CarValuation = ({ selectedKnowedgeBase }) => {
 
    const [aiResponse, setAiResponse] = useState(null);
    let { title, images } = selectedKnowedgeBase;
  
  //  let images1 =
  //    "https://firebasestorage.googleapis.com/v0/b/snit-82af4.appspot.com/o/images%2F1717654155537Screenshot_20240605_182302_Chrome.jpg?alt=media&token=03e028d5-cc68-4088-a102-609b2c4b17dc";
  
  useEffect(() => {
    // console.log(images1);
    const AIresponse = async () => {
      const result = await generateText(images);
      console.log(result);
      setAiResponse(result);
    };
    AIresponse();
  }, []);

  return (
    <>
      <View>
        <Text className="text-white text-center font-psemibold">{title}</Text>
        <Text className="text-white text-center font-psemibold">
          AiResult: 
        </Text>
      </View>
    </>
  );
}