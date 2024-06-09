import { View, Text, Image, TouchableOpacity, FlatList, Animated, Easing, Dimensions } from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants';
import SmallSearchInput from './../../components/singleUIElements/SmallSeacrhInput';
import { carBrandsArr } from '../../assets/carsBrands/carBrands';
import CarBrandCard from "../../components/CarBrandCard";
import styles from "../../assets/css/knowledgebase/knowledgebase";
import { Sidebar } from "../../components/sidebar/Sidebar";

const CarSpecs = () => {
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
   const sidebarWidth = Dimensions.get("window").width * 0.82;
   const sidebarAnim = useState(new Animated.Value(-sidebarWidth))[0];

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
    <SafeAreaView className="bg-primary h-full ">
      <View className="flex-row justify-between mt-5 mx-2.5">
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={icons.hamburger}
            style={styles.hamburgerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="text-white text-2xl">Specs</Text>
        <View>
          <Image source={icons.profile} className="w-8 h-8" />
        </View>
      </View>
      <View className="mx-5 mt-7">
        <SmallSearchInput />
      </View>

      <FlatList
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
        data={carBrandsArr}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <CarBrandCard item={item} />
          </View>
        )}
      />
        {isSidebarVisible && (
        <Sidebar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth} sidebarAnim={sidebarAnim} />
      )}
    </SafeAreaView>
  );
}

export default CarSpecs;