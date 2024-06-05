import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { router } from "expo-router";

const FileCategory = ({ isSelected, isImage }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(isImage ? "/knowledgeimages" : "/knowledgevideos")
      }
      className={`bg-tertiary w-40 h-7 rounded-2xl justify-center items-center ${
        isSelected == true ? "bg-secondary" : ""
      }`}
    >
      <Text className="flex justify-center items-center text-white">
        {isImage == true ? "Images" : "Videos"}
      </Text>
    </TouchableOpacity>
  );
};

export default FileCategory;
