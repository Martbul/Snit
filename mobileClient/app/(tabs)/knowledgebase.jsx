import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SmallSearchInput from "../../components/singleUIElements/SmallSeacrhInput";
import { icons, images } from "../../constants";

import KnowledgeBaseCard from "../../components/knowledgeBase/KnowledgeBaseCard";
import {
  createKnowledgeBase,
  getAllKnowledgeBases,
} from "../../services/knowledgeServices";
import { AuthContext } from "../../contexts/AuthContext";
import useFetchKnowledgeBases from "../../hooks/useFetchKnowledgeBases";
import EmptyState from "../../components/EmptyState";
import { router } from "expo-router";

const Knowledge = () => {
  const { user } = useContext(AuthContext);

  const { data: knowledgeBases, refetch } = useFetchKnowledgeBases(() =>
    getAllKnowledgeBases(user.email)
  );

  // Use an effect to refetch the data whenever the component mounts or the user changes
  useEffect(() => {
    refetch();
  }, []);

  const createNewKnowledgeBase = async () => {
   
    const newKnowledgeBase = await createKnowledgeBase(user.email)
    
   refetch();

     router.push({
       pathname: "/(knowledge)/[knowledgedata]",
       params: { title: newKnowledgeBase.title },
     });
    //TODO: redirect to the page of the already creaded Kbase
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-row gap-14 pl-1 pr-2 pt-6">
        <View className="flex items-center align-middle pb-44">
          <Image
            source={icons.menuhamburger}
            className="w-12 h-12"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1">
          <SmallSearchInput />
        </View>
      </View>

      <View className="flex mt-[-140px] mb-[340px]">
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={knowledgeBases}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 12, marginRight: 12, marginBottom: 20 }}>
              <KnowledgeBaseCard item={item} />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState 
            
              title="Add knowledge folders"
              // subtitle="Be the first to upload a video"
            />
          )}
        />
      </View>

      <TouchableOpacity
        onPress={createNewKnowledgeBase}
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
          source={icons.plusBig}
          className="w-14 h-14"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Knowledge;
