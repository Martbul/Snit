import { StatusBar } from "expo-status-bar";
import {   Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../constants'

import CustomButton from "../components/singleUIElements/CustomButton";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
export default function App() {
   const{user,isLoading} = useContext(AuthContext);
  
  if (isLoading) {
    return <LoadingSpinner />; // Render a loading indicator while user data is being fetched
  }


   if(!isLoading && user !== null ) return <Redirect href="/(home)/dashboard"/>
   return (
 
     <SafeAreaView className="bg-primary h-full">
     
       <ScrollView contentContainerStyle={{ height: "100%" }}>
         <View className="w-full justify-center items-center min-h-[85vh] px-4">
           <Image
             source={images.logo}
             className="w-[130px] h-[84px]"
             resizeMode="contain"
           />

           <Image
             source={images.searchCar}
             className="max-w-[380px] w-full h-[300px] mr-[40px]"
             resizeMode="contain"
           />

           <View className="relative mt-5">
             <Text className="text-3xl text-white font-bold text-center">
               Find how much your car is worth with{` `}
               <Text className="text-secondary">Snit</Text>
             </Text>

             <Image
               source={images.path}
               className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
               resizeMode="contain"
             />
           </View>
           <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
             Get an accurate estimate of your car's value based on current
             market trends and its specific condition.
           </Text>

           <CustomButton
             title="Continue with Email"
             handlePress={() => router.push("/sign-in")}
             containerStyles="w-full mt-7"
           />
         </View>
       </ScrollView>

       <StatusBar backgroundColor="#161622" style="light" />
     </SafeAreaView>
   );
}
