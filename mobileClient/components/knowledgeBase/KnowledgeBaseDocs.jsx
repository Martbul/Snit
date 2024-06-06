import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import { router } from "expo-router";

const KnowledgeBaseDocs = ({ item }) => {
  return (
    <View className="bg-white w-full h-14 rounded-xl justify-center items-center">
      <Text className="">{ item}</Text>
    </View>
  );
};

export default KnowledgeBaseDocs;
