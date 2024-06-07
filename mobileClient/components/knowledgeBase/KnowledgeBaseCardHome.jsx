import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const KnowledgeBaseCardHome = ({ item }) => {
    const {
      allUserKnowledgeBases,
      selectedKnowedgeBase,
      selectedKBimages,
      selectedKBdocuments,
    } = useContext(KnowledgeBaseContext);
  return (
    <>
      <TouchableOpacity
        className="bg-secondary w-40 h-14 rounded-2xl justify-center items-center"
        onPress={() => selectedKnowedgeBase(item.title)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 12, color: "white" }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default KnowledgeBaseCardHome;
