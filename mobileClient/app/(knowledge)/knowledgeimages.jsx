import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SmallSearchInput from "../../components/SmallSeacrhInout";
import { icons, images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import KnowledgeBaseCard from "../../components/KnowledgeBaseCard";
import FileCategory from "../../components/FileCategory";
import KnowledgeBaseImage from "../../components/KnowledgeBaseImage";
import { router } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";



const KnowledgeImages = (name) => {
 const route = useRoute();
 const navigation = useNavigation();

 // Accessing the params
 const { title } = route.params;
  const addImage = () => {
    console.log("add image");
  };



  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-row gap-14 pl-1 pr-2 pt-6">
        <View className="flex items-center align-middle pb-44">
          <TouchableOpacity
            onPress={() => router.push("/knowledge")}
            style={{ paddingLeft: 10 }}
          >
            <Image
              source={icons.backArrow}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center">
          <TouchableOpacity>
            {/* //TODO: get somehow the name of the knowlegde base
            //TODO: + when a user creates a new knowledge base he will be redirected to the screen and this touchable opacity will be 
            //TODO:in focus so that he can name his knowledge base with his desired name + it stays frild that can be edited the name of the knowledge base */}
            {/* <Text>{KnowledgeImages}</Text> */}
            <Text className="text-white text-2xl">Dataset 1</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image source={icons.dots} className="w-7 h-7" resizeMode="contain" />
        </View>
      </View>

      <View className="flex mt-[-140px] mb-[340px]">
        <FlatList
          data={[{ id: 1 }, { id: 2 }]}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
              <KnowledgeBaseImage item={item} />
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex-row gap-4 justify-center items-center mb-6">
              <View>
                <FileCategory isImage={true} isSelected={true} />
              </View>
              <View>
                <FileCategory isImage={false} isSelected={false} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="Add images"
              subtitle="Import images to your dataset for car-value evaluation"
            />
          )}
        />
      </View>
      
        <TouchableOpacity
          onPress={addImage}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            marginBottom: 24,
          }}
        >
          <Image
            source={icons.addPhoto}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </TouchableOpacity>
     
    </SafeAreaView>
  );
};

export default KnowledgeImages;
