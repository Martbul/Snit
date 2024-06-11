import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const KnowledgeBaseCard = ({ item }) => {
  return (
    <>
      <TouchableOpacity
        className="bg-black w-40 h-14 rounded-2xl justify-center items-center border-white border-4"
        onPress={() =>
          router.push({
            pathname: "/(knowledge)/[knowledgedata]",
            params: {
              title: item.title,
            
            },
          })
        }
      >
        <Text style={{ fontWeight: "bold", fontSize: 12, color: "white" }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default KnowledgeBaseCard;
