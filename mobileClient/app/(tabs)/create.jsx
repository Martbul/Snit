import { View, Text, ScrollView, TouchableOpacity, Image, Alert, } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/singleUIElements/FormField";

import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";

import CustomButton from "../../components/singleUIElements/CustomButton";
import * as DocumentPicker from 'expo-document-picker';
import {router} from 'expo-router'
import { createVideo } from "../../services/videoServices";
import { AuthContext } from "../../contexts/AuthContext";


const Create = () => {
  const { user, setUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    creator: user.email
  });


  //TODO: Show user how on many percent his upload in
  const openPicker = async(selectType) =>{
    const result = await DocumentPicker.getDocumentAsync({
    
      type: selectType === "image" ? ["image/*", "image/png"] : ["video/mp4", "video/gif"],
    });
    

    if(!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }
      if(selectType === 'video') {
        setForm({...form, video:result.assets[0]})
      }
  }else{
    setTimeout(()=>{
      Alert.alert("Canceld", JSON.stringify(result, null,2))
    },100 )
  }
}
  const submit = async() =>{
      if(!form.prompt || !form.title || !form.thumbnail || !form.video){
          Alert.alert("Fill in all filds")
      }

      setUploading(true)
        
      try {

        const newVideo = await createVideo(form)

        Alert.alert('success', 'post uploaded')
        router.push('/home')
      } catch (error) {
        Alert.alert('Error', error.message)
      }finally{
        setForm({
          title: "",
          video: null,
          thumbnail: null,
          prompt: "",
          creator: user.email,
        });

        setUploading(false)
      }

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity
            onPress={() =>openPicker('video') }
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2 ">
        <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() =>openPicker('image') }>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
              
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
               
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create the video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
