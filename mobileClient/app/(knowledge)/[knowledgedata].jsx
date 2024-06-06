import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import KnowledgeBaseImage from "../../components/knowledgeBase/KnowledgeBaseImage";
import { router, useLocalSearchParams } from "expo-router";
import KnowledgeBaseVideo from "../../components/knowledgeBase/KnowledgeBaseVideo";
import * as DocumentPicker from "expo-document-picker";
import { AuthContext } from "../../contexts/AuthContext";
import {
  addFilesToKnowledgeBase,
  getCurrentKnowledgeBaseImages,
} from "../../services/knowledgeServices";

const KnowledgeData = () => {
  const { user } = useContext(AuthContext);
  const { title } = useLocalSearchParams();

  const [isImagePage, setIsImagesPage] = useState(true);
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);

  const [uploading, setUploading] = useState(false);

  //TODO: Show user how on many percent his upload in
  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/*"] : ["application/*"],
    });
    console.log("RESULT", result);

    if (!result.canceled) {
      if (selectType === "image") {
        const newImage = await addFilesToKnowledgeBase(
          result.assets[0],
          selectType,
          { creator: user.email },
          title
        );
        getCurrentKnowledgeBaseData();
      }
      if (selectType === "docs") {
        const newDocs = await addFilesToKnowledgeBase(
          result.assets[0],
          selectType,
          { creator: user.email },
          title
        );
      }
    } else {
      setTimeout(() => {
        Alert.alert("Canceld", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const getCurrentKnowledgeBaseData = async () => {
    const currentKnowledgeBaseImages = await getCurrentKnowledgeBaseImages(
      title,
      user.email
    );
    setImages(currentKnowledgeBaseImages);

    const currentKnowledgeBaseDocs = await getcurrentKnowledgeBaseDocs();
    setDocs(currentKnowledgeBaseDocs);
  };
  useEffect(() => {
    getCurrentKnowledgeBaseData();

    //TODO: gett all images and videos and set them in a use  State and show rthem based on isImagePage
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-row gap-14 pl-1 pr-2 pt-6">
        <View className="flex items-center align-middle pb-44">
          <TouchableOpacity
            onPress={() => router.push("/knowledgebase")}
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
            <Text className="text-white text-2xl">{title}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image source={icons.dots} className="w-7 h-7" resizeMode="contain" />
        </View>
      </View>

      <View className="flex mt-[-140px] mb-[340px]">
        <FlatList
          // {isImagePage === true ?   data={images} : data={docs}}
          data={isImagePage ? images : docs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
              {isImagePage === true ? (
                <KnowledgeBaseImage item={item} />
              ) : (
                <KnowledgeBaseVideo item={item} />
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="flex-row gap-4 justify-center items-center mb-6">
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setIsImagesPage(true);
                  }}
                  className={`bg-tertiary w-40 h-7 rounded-2xl justify-center items-center ${
                    isImagePage == true ? "bg-secondary" : ""
                  }`}
                >
                  <Text className="flex justify-center items-center text-white">
                    Images
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    setIsImagesPage(false);
                  }}
                  className={`bg-tertiary w-40 h-7 rounded-2xl justify-center items-center ${
                    isImagePage == false ? "bg-secondary" : ""
                  }`}
                >
                  <Text className="flex justify-center items-center text-white">
                    Videos
                  </Text>
                </TouchableOpacity>
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
        onPress={() => {
          isImagePage === true ? openPicker("image") : openPicker("docs");
        }}
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
        {isImagePage === true ? (
          <Image
            source={icons.addPhoto}
            className="w-14 h-14"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={icons.addFolder}
            className="w-14 h-14"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default KnowledgeData;
