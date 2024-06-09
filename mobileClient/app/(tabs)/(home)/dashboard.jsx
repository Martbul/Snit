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
// import { KnowledgeBaseContext } from "../../contexts/KnowledgeBaseContext";
import CustomButton from "../../../components/singleUIElements/CustomButton";
import { router } from "expo-router";
import KnowledgeBaseCardHome from "../../../components/knowledgeBase/KnowledgeBaseCardHome";
import { getAllKnowledgeBases } from "../../../services/knowledgeServices";
import useFetchKnowledgeBases from "../../../hooks/useFetchKnowledgeBases";
import { CarValuation } from "../../../components/homeScreen/CarValuation";
import { FutureValue } from "../../../components/homeScreen/FutureValue";
import { EasyFixes } from "../../../components/homeScreen/EasyFixes";
import { OfferCreation } from "../../../components/homeScreen/OfferCreation";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { data: knowledgeBases, refetch } = useFetchKnowledgeBases(() =>
    getAllKnowledgeBases(user?.email)
  );

  const [selectedKnowedgeBase, setSelectedKnowedgeBase] = useState(null);

  const [selectedKBimages, setSelectedKBimages] = useState(null);
  const [selectedKBdocuments, setSelectedKBdocuments] = useState(null);

  useEffect(() => {
    const setKnowledgeBases = async () => {
      await refetch();
      setSelectedKnowedgeBase(knowledgeBases[0]);
    };
    setKnowledgeBases();
  }, []);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarWidth = Dimensions.get("window").width * 0.82;
  const sidebarAnim = useState(new Animated.Value(-sidebarWidth))[0];

  const toggleSidebar = () => {
    console.log(selectedKnowedgeBase);
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
        <Text className="text-white text-2xl">Dashboard</Text>
        <View>
          <Image source={icons.profile} className="w-8 h-8" />
        </View>
      </View>
      <View>
        {knowledgeBases == undefined && selectedKnowedgeBase === null ? (
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

        {selectedKnowedgeBase !== null ? 
        <View className="mt-3 pb-16 h-full bg-primary" >  
        
        <Swiper style={styles2.wrapper} loop={false}>
        <View style={styles2.slide}>
        <CarValuation/>
        </View>
        <View style={styles2.slide}>
        <FutureValue/>
        </View>
        <View style={styles2.slide}>
        <EasyFixes/>
        </View>
        <View style={styles2.slide}>
        <OfferCreation/>
        </View>
      </Swiper>
      </View> : null}
      </View>
    
      {isSidebarVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar}>
          <Animated.View
            style={[
              styles.sidebar,
              { transform: [{ translateX: sidebarAnim }], width: sidebarWidth },
            ]}
          >
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Help</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
const styles2 = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dashboard;
