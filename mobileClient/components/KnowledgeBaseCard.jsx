import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../constants";

const KnowledgeBaseCard = ({item}) => {
  return (
    //  <View className="flex-col items-center px-4 mb-14">
    //    <View className="flex-row gap-3 items-start">
    //      <View className="justify-center items-center flex-row flex-1">
    //        <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
    //          <Image
    //            source={images.user}
    //            className="w-[46px] h-[46px]"
    //            resizeMode="contain"
    //          />
    //        </View>

    //        <View className="justify-center flex-1 ml-3 gap-y-1">
    //          <Text
    //            className="text-white font-psemibold text-sm"
    //            numberOfLines={1}
    //          >
    //            {title}
    //          </Text>
    //          <Text className="text-xs text-gray-100 font-pregular">
    //            {creator}
    //          </Text>
    //        </View>
    //      </View>

    //      <View className="pt-2 ">
    //        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
    //      </View>
    //    </View>
    //  </View>

    <View className="bg-secondary w-40 h-14 rounded-2xl justify-center items-center">
      <Text className="flex justify-center items-center">Dataset 1</Text>
    </View>
  );
};

export default KnowledgeBaseCard;
