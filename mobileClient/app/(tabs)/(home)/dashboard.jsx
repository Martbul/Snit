import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Modal,
  Easing,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { AuthContext } from "../../../contexts/AuthContext";
import { icons, images } from "../../../constants";
import styles from "../../../assets/css/knowledgebase/knowledgebase";
import CustomButton from "../../../components/singleUIElements/CustomButton";
import { router } from "expo-router";
import { getAllKnowledgeBases } from "../../../services/knowledgeServices";
import useFetchKnowledgeBases from "../../../hooks/useFetchKnowledgeBases";
import { CarValuation } from "../../../components/homeScreen/CarValuation";
import { FutureValue } from "../../../components/homeScreen/FutureValue";
import { EasyFixes } from "../../../components/homeScreen/EasyFixes";
import { OfferCreation } from "../../../components/homeScreen/OfferCreation";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { generateText } from "../../../aiModels/langchain";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { refetch } = useFetchKnowledgeBases(() =>
    getAllKnowledgeBases(user.email)
  );
  const [selectedKnowedgeBase, setSelectedKnowedgeBase] = useState(null);

 const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarWidth = Dimensions.get("window").width * 0.82;
  const sidebarAnim = useState(new Animated.Value(-sidebarWidth))[0];
  
  useEffect(() => {
    const setKnowledgeBases = async () => {
      const knowledgeBases = await getAllKnowledgeBases(user.email);
      await refetch();
      setSelectedKnowedgeBase(knowledgeBases[0]);
    };
    setKnowledgeBases();
  }, []);

 

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -sidebarWidth,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setIsSidebarVisible(false));
    } else {
      setIsSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-row justify-between mt-5 mx-2.5">
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={icons.hamburger}
            style={styles.hamburgerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="text-white text-2xl">Home</Text>
        <View>
          <Image source={icons.profile} className="w-8 h-8" />
        </View>
      </View>
      <View>
        {selectedKnowedgeBase === null ? (
          <>
            <View className="flex flex-col justify-center items-center">
              <Image source={images.FilesSearching} className="w-60 h-60" />
              <Text className="text-white text-xl">
                Create your firts knowedgebase
              </Text>
              <CustomButton
                title="Create Knowledge Base"
                handlePress={router.push("/knowledgebase")}
                containerStyles="mt-7"
              />
            </View>
          </>
        ) : null}

        {selectedKnowedgeBase !== null ? (
          <View className="mt-3 pb-16 h-full bg-primary">
            {/* //Todo: add functionality for choosing a databse to work with */}

            <TouchableOpacity className="bg-secondary flex flex-row w-40 h-10 mt-5 justify-center items-center rounded-r-3xl">
              <Text className="text-white text-center font-psemibold">
                {selectedKnowedgeBase?.title}
              </Text>

              <Image source={icons.downarrow} className="w-5 h-5" />
            </TouchableOpacity>

            <Swiper
              style={styles2.wrapper}
              loop={false}
              activeDotColor={"white"}
              dotColor={"gray"}
            >
              <View style={styles2.slide}>
                <CarValuation selectedKnowedgeBase={selectedKnowedgeBase} />
              </View>
              <View style={styles2.slide}>
                <FutureValue />
              </View>
              <View style={styles2.slide}>
                <EasyFixes />
              </View>
              <View style={styles2.slide}>
                <OfferCreation />
              </View>
            </Swiper>
          </View>
        ) : null}
      </View>

      {isSidebarVisible && (
        <Sidebar
          toggleSidebar={toggleSidebar}
          sidebarWidth={sidebarWidth}
          sidebarAnim={sidebarAnim}
        />
      )}
    </SafeAreaView>
  );
};
const styles2 = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;
