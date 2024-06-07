import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const CarBrandCard = ({ item }) => {
  return (
    <>
      <TouchableOpacity
        className="bg-green w-40 h-14 rounded-2xl justify-center items-center"
        // onPress={() =>
        //   router.push({
        //     pathname: "/(knowledge)/[knowledgedata]",
        //     params: { title: item.title },
        //   })
        // }
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
          {item}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CarBrandCard;
