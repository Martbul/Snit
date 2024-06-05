import {Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const KnowledgeBaseCard = ({ item }) => {
  
  return (
    <>
      <TouchableOpacity
        className="bg-secondary w-40 h-14 rounded-2xl justify-center items-center"
        // onPress={() => router.push(`/(knowledge)/${item.title}`)}
        onPress={() =>
          router.push({
            pathname: "/(knowledge)/[knowledgedata]",
            params:{title: item.title}
          })
        }
      >
        <Text style={{ fontWeight: "bold", fontSize: 12, color: "white" }}>
          {item.title}
        </Text>

        {item.images && item.images.length > 0 && (
          <Image
            source={{ uri: item.images[0] }}
            style={{ width: 70, height: 70, marginTop: 10 }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default KnowledgeBaseCard;
