import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import { router } from "expo-router";

const KnowledgeBaseImage = ({ item }) => {
  return (
    <View className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
      <Image
        source={{ uri: item }}
        className="w-full h-full rounded-xl mt-3"
        resizeMode="cover"
      />
    </View>
  );
};

export default KnowledgeBaseImage;
