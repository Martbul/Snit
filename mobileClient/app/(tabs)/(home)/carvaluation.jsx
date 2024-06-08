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

import { AuthContext } from "../../../contexts/AuthContext";
import { icons, images } from "../../../constants";
import styles from "../../../assets/css/knowledgebase/knowledgebase";
// import { KnowledgeBaseContext } from "../../contexts/KnowledgeBaseContext";
import CustomButton from "../../../components/singleUIElements/CustomButton";
import { router } from "expo-router";
import KnowledgeBaseCardHome from "../../../components/knowledgeBase/KnowledgeBaseCardHome";
import { getAllKnowledgeBases } from "../../../services/knowledgeServices";
import useFetchKnowledgeBases from "../../../hooks/useFetchKnowledgeBases";
import CarValuation from "../../../components/homeScreen/CarValuation";
import PagerView from 'react-native-pager-view';
const Carvaluation = () => {
  const { user } = useContext(AuthContext);
  const { data: knowledgeBases, refetch } = useFetchKnowledgeBases(() =>
     getAllKnowledgeBases(user?.email))

  const [selectedKnowedgeBase, setSelectedKnowedgeBase] = useState(null);

  const [selectedKBimages, setSelectedKBimages] = useState(null);
  const [selectedKBdocuments, setSelectedKBdocuments] = useState(null);

  useEffect(() => {
    const setKnowledgeBases = async() =>{
      await refetch();
    setSelectedKnowedgeBase(knowledgeBases[0])
    }
    setKnowledgeBases()
  }, []);
  // const {
  //   allUserKnowledgeBases, selectedKnowedgeBase,
  //   selectedKBimages,
  //   selectedKBdocuments,
  // } = useContext(KnowledgeBaseContext);

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
        ) : (
          <></>
          // <View>
          //   <View>
          //     <Text className="text-white text-xl">
          //       Choose a knwoedgebase to work with
          //     </Text>
          //   </View>
          //   <View>
          //     {/* <FlatList
          //       numColumns={2}
          //       contentContainerStyle={styles.flatListContainer}
          //       data={knowledgeBases}
          //       keyExtractor={(item) => item._id}
          //       renderItem={({ item }) => (
          //         <View style={styles.cardContainer}>
          //           <KnowledgeBaseCardHome item={item} setSelectedKnowedgeBase={setSelectedKnowedgeBase} />
          //         </View>
          //       )}
          //     /> */}
          //   </View>
          // </View>
        )}

          {selectedKnowedgeBase !== null ? (
          // <CarValuation selectedKB={selectedKnowedgeBase}>
            
          // </CarValuation>
          <View style={styles1.container}>
          <PagerView style={styles1.container} initialPage={0}>
            <View style={styles1.page} key="1">
              <Text className="text-white text-2xl">First page</Text>
              <Text className="text-white text-2xl">Swipe ➡️</Text>
            </View>
            <View style={styles1.page} key="2">
              <Text className="text-white text-2xl">Second page</Text>
            </View>
            <View style={styles1.page} key="3">
              <Text className="text-white text-2xl">Third page</Text>
            </View>
          </PagerView>
        </View>
        ) : ''}
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

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Carvaluation;
