import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const KnowledgeBaseCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    // //TODO: add logic so that use is redirected to the correct dataset
    // <TouchableOpacity
    //   className="bg-secondary w-40 h-14 rounded-2xl justify-center items-center"
    //   onPress={() => router.push("/knowledgeimages")}
    // >
    //   <Text className="flex justify-center items-center">{item}</Text>
    // </TouchableOpacity>

    <TouchableOpacity
      className="bg-secondary w-40 h-14 rounded-2xl justify-center items-center"
      onPress={() =>
        navigation.navigate("knowledgeimages", {
          title: item.title,
        })
      }
    >
      <Text style={{ fontWeight: "bold", fontSize: 12, color: "white" }}>
        {item.title}
      </Text>
      {/* Render other properties of item as needed */}

      {/* <Text>Created At: {item.createdAt}</Text> */}
      {/* Render images */}
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0] }} // Assuming images is an array of URIs
          style={{ width: 70, height: 70, marginTop: 10 }}
          resizeMode="contain"
        />
      )}
      {/* Render videos or other properties as needed */}
    </TouchableOpacity>
  );
};

export default KnowledgeBaseCard;
