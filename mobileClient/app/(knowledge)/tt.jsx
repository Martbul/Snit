// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import SmallSearchInput from "../../components/SmallSeacrhInout";
// import { icons, images } from "../../constants";
// import SearchInput from "../../components/SearchInput";
// import VideoCard from "../../components/VideoCard";
// import KnowledgeBaseCard from "../../components/KnowledgeBaseCard";
// import KnowledgeBaseImage from "../../components/KnowledgeBaseImage";
// import FileCategory from "../../components/FileCategory";
// import EmptyState from "../../components/EmptyState";
// import KnowledgeBaseVideo from "../../components/KnowledgeBaseVideo";
// import { NavigationContainer } from "@react-navigation/native";
// import { router } from "expo-router";
// const KnowledgeVideos = () => {
//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <View className="flex-row gap-14 pl-1 pr-2 pt-6">
//         <View className="flex items-center align-middle pb-44">
//           <TouchableOpacity
//             onPress={() => router.push("/knowledge")}
//             style={{ paddingLeft: 10 }}
//           >
//             <Image
//               source={icons.backArrow}
//               style={{ width: 28, height: 28 }}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//         <View className="flex-1 items-center">
//           <TouchableOpacity>
//             {/* //TODO: get somehow the name of the knowlegde base
//             //TODO: + when a user creates a new knowledge base he will be redirected to the screen and this touchable opacity will be 
//             //TODO:in focus so that he can name his knowledge base with his desired name + it stays frild that can be edited the name of the knowledge base */}
//             {/* <Text>{KnowledgeImages}</Text> */}
//             <Text className="text-white text-2xl">Dataset 1</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <Image source={icons.dots} className="w-7 h-7" resizeMode="contain" />
//         </View>
//       </View>

//       <View className="flex mt-[-140px] mb-[340px]">
//         <FlatList
//           data={[{ id: 1 }, { id: 2 }]}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
//               <KnowledgeBaseVideo item={item} />
//             </View>
//           )}
//           ListHeaderComponent={() => (
//             <View className="flex-row gap-4 justify-center items-center mb-6">
//               <View>
//                 <FileCategory isImage={true} isSelected={false} />
//               </View>
//               <View>
//                 <FileCategory isImage={false} isSelected={true} />
//               </View>
//             </View>
//           )}
//           ListEmptyComponent={() => (
//             <EmptyState
//               title="Add images"
//               subtitle="Import images to your dataset for car-value evaluation"
//             />
//           )}
//         />
//       </View>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "flex-end",
//           alignItems: "center",
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           marginBottom: 24,
//         }}
//       >
//         <Image
//           source={icons.addFolder}
//           className="w-14 h-14"
//           resizeMode="contain"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default KnowledgeVideos;
