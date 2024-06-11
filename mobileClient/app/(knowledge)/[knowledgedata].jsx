import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import KnowledgeBaseImage from "../../components/knowledgeBase/KnowledgeBaseImage";
import { router, useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { AuthContext } from "../../contexts/AuthContext";
import {
  addFilesToKnowledgeBase,
  editKnowledgeBaseName,
  
  getCurrentKnowledgeBaseImages,
  getcurrentKnowledgeBaseDocs,
} from "../../services/knowledgeServices";
import KnowledgeBaseDocs from "../../components/knowledgeBase/KnowledgeBaseDocs";
import * as Progress from "react-native-progress";

import { BackHandler } from "react-native";
const KnowledgeData = () => {
  const { user } = useContext(AuthContext);

  
const { title } = useLocalSearchParams();

const [progress,setProgress] = useState(null)
  const [isImagePage, setIsImagesPage] = useState(true);
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);

 
  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/*"] : ["application/*"],
    });

    
    if (!result.canceled) {
      //TODo: the logic is the same in the 2 if statements
      if (selectType === "image") {
        const newImage = await addFilesToKnowledgeBase(
          result.assets[0],
          selectType,
          { creator: user.email },
          title,
          setProgress
        );
        getCurrentKnowledgeBaseData();
      }
      if (selectType === "docs") {
        const newDocs = await addFilesToKnowledgeBase(
          result.assets[0],
          selectType,
          { creator: user.email },
          title,
          setProgress
        );
        getCurrentKnowledgeBaseData();
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

    const currentKnowledgeBaseDocs = await getcurrentKnowledgeBaseDocs(
      title,
      user.email
    );
    setDocs(currentKnowledgeBaseDocs);
  };


  useEffect(() => {
    getCurrentKnowledgeBaseData();
  }, []);



  //editing the knoweldgebase title
   const [isEditing, setIsEditing] = useState(false);
   const [currentTitle, setCurrentTitle] = useState(title);

   const handleHeadingClick = () => {
     setIsEditing(true);
     console.log('EDITING KNOWLEDGEBASE NAME');
   };

   const handleInputChange = (text) => {
     setCurrentTitle(text);
   };

   const handleBlur = () => {
     setIsEditing(false);
     //onTitleChange(currentTitle);
   };

  const handleSubmitEditing = async () => {
    //todo: add functionality to check f the new name already exists
   
    setIsEditing(false);
    console.log(currentTitle);
    const allEditedKB = await editKnowledgeBaseName(
      currentTitle,
      title,
      user.email
    );
    
    
  };
useEffect(() => {
  const backAction = () => {
    router.push("/knowledgebase");
    return true; // Prevent default behavior (exit app)
  };
console.log('pushing');
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
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
              source={icons.left}
             className="w-10 h-14"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          {isEditing ? (
            <TextInput
              style={styles.input}
              className="text-white text-2xl"
              value={currentTitle}
              onChangeText={handleInputChange}
              onBlur={handleBlur}
              onSubmitEditing={handleSubmitEditing}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={handleHeadingClick}>
              <Text style={styles.heading} className="text-white text-2xl">
                {currentTitle}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Image source={icons.dots} className="w-7 h-7" resizeMode="contain" />
        </View>
      </View>

      <View className="flex mt-[-160px] mb-[220px]">
        <FlatList
          // numColumns={2}
          // contentContainerStyle={{
          //   alignItems: "center",
          // }}
          data={isImagePage ? images : docs}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View className="mb-1">
              {isImagePage === true ? (
                <KnowledgeBaseImage
                  item={item}
                  knowledgeBaseTitle={title}
                  creator={user.email}
                  getCurrentKnowledgeBaseData={getCurrentKnowledgeBaseData}
                />
              ) : (
                <KnowledgeBaseDocs
                  item={item}
                  knowledgeBaseTitle={title}
                  creator={user.email}
                  getCurrentKnowledgeBaseData={getCurrentKnowledgeBaseData}
                />
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
                    Documents
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              subtitle={
                isImagePage === true
                  ? "Add images to your dataset for car-value evaluation"
                  : "Add documents to your dataset for car-value evaluation"
              }
            />
          )}
        />
      </View>
      <View
        className="flex justify-center items-center"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          marginBottom: 100,
        }}
      >
        {/* // <Text className="text-white text-2xl justify-center">{progress}</Text> */}
        {progress !== null ? (
          <Progress.Circle
            size={100}
            showsText={true}
            progress={progress}
            thickness={6}
          />
        ) : null}
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
          marginBottom: 16,
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
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
  input: {
    fontSize: 24,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
});
export default KnowledgeData;
