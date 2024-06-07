import {
  View,
  Text,
  Image,
  FlatList,
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

import { AuthContext } from "../../contexts/AuthContext";
import { icons, images } from "../../constants";
import styles from "../../assets/css/knowledgebase/knowledgebase";
// import { KnowledgeBaseContext } from "../../contexts/KnowledgeBaseContext";
import CustomButton from "../../components/singleUIElements/CustomButton";
import { router } from "expo-router";
import KnowledgeBaseCardHome from "../../components/knowledgeBase/KnowledgeBaseCardHome";
import { getAllKnowledgeBases } from "../../services/knowledgeServices";
import useFetchKnowledgeBases from "../../hooks/useFetchKnowledgeBases";
import SelectedKnowledgeBase from "../../components/SelectedKnowledgeBase";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { data: knowledgeBases, refetch } = useFetchKnowledgeBases(() =>
     getAllKnowledgeBases(user?.email))

  const [selectedKnowedgeBase, setSelectedKnowedgeBase] = useState(null);

  const [selectedKBimages, setSelectedKBimages] = useState(null);
  const [selectedKBdocuments, setSelectedKBdocuments] = useState(null);

  useEffect(() => {
    refetch();
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
          <View>
            <View>
              <Text className="text-white text-xl">
                Choose a knwoedgebase to work with
              </Text>
            </View>
            <View>
              <FlatList
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
                data={knowledgeBases}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.cardContainer}>
                    <KnowledgeBaseCardHome item={item} setSelectedKnowedgeBase={setSelectedKnowedgeBase} />
                  </View>
                )}
              />
            </View>
          </View>
        )}

          {selectedKnowedgeBase !== null ? (
          <SelectedKnowledgeBase selectedKB={selectedKnowedgeBase}>
            
          </SelectedKnowledgeBase>
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
    // <SafeAreaView className="bg-primary h-full">
    //   <View className="flex-row justify-between mt-5 mx-2.5">
    //     <TouchableOpacity onPress={toggleSidebar}>
    //       <Image
    //         source={icons.hamburger}
    //         style={styles.hamburgerIcon}
    //         resizeMode="contain"
    //       />
    //     </TouchableOpacity>
    //     <Text className="text-white text-2xl">Dashboard</Text>
    //     <View>
    //       <Image source={icons.profile} className="w-8 h-8" />
    //     </View>
    //   </View>
    //   <View>
    //     <Text className="text-white mt-6 ml-7">Explore</Text>
    //   </View>
    //   <View className="bg-secondary flex-1 rounded-t-3xl mt-20">
    //     <View className="flex flex-row flex-wrap mx-2 mt-10">
    //       <View className="bg-tertiary w-40 h-40 rounded-xl justify-center items-center m-3">
    //         <Image
    //           source={images.undraw_lightbulb_moment_re_ulyo}
    //           className="w-32 h-32"
    //         />
    //         <Text className="text-white ">Make perfect offer</Text>
    //       </View>
    //       <View className="bg-tertiary w-40 h-40 rounded-xl justify-center items-center m-3">
    //         <Image source={images.PricePana} className="w-32 h-32" />
    //         <Text className="text-white ">Discover your car's value</Text>
    //       </View>
    //       <View className="bg-tertiary w-40 h-40 rounded-xl justify-center items-center m-3">
    //         <Image source={images.AnalyzeCuate} className="w-32 h-32" />
    //         <Text className="text-white ">Identify your future value</Text>
    //       </View>
    //       <View className="bg-tertiary w-40 h-40 rounded-xl justify-center items-center m-3">
    //         <Image source={images.CarFix} className="w-32 h-32" />
    //         <Text className="text-white ">
    //           Unlock value through simple fixes
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    //   {isSidebarVisible && (
    //     <TouchableOpacity style={styles.overlay} onPress={toggleSidebar}>
    //       <Animated.View
    //         style={[
    //           styles.sidebar,
    //           { transform: [{ translateX: sidebarAnim }], width: sidebarWidth },
    //         ]}
    //       >
    //         <Text style={styles.sidebarTitle}>Menu</Text>
    //         <TouchableOpacity style={styles.menuItem}>
    //           <Text style={styles.menuItemText}>Home</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.menuItem}>
    //           <Text style={styles.menuItemText}>Profile</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.menuItem}>
    //           <Text style={styles.menuItemText}>Settings</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.menuItem}>
    //           <Text style={styles.menuItemText}>Help</Text>
    //         </TouchableOpacity>
    //       </Animated.View>
    //     </TouchableOpacity>
    //   )}
    // </SafeAreaView>
  );
};

// const Home = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const {data:posts,refetch} = useFetchVideos(getAllVideos)
//   const {data:latestPosts} = useFetchVideos(getLatestVideos)
//   const [refreshing, setRefreshing] = useState(false)

//   //when a user pulls down the screen, it will call this function and fetch new videos(like on instagram)
//     const onRefresh = async() => {
//     setRefreshing(true)
//     await refetch()
//     setRefreshing(false)
//   }

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       {/*FlatList is used for rendering a list of elements */}
//      <FlatList
//         data={posts}

//         keyExtractor={(item)=> item._id}
//         renderItem={({item})=>(
//           <VideoCard video={item}/>
//         )}
//         ListHeaderComponent={()=>(
//           <View className="my-6 px-4 space-y-6">
//             <View className='justify-between items-start flex-row mb-6'>
//               <View>
//                 <Text className="font-pmedium text-sm text-gray-100">Welcome back,</Text>
//                 <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
//               </View>

//               <View className="mt-1.5">
//                 <Image
//                   source={images.logoSmall}
//                   className='w-9 h-10'
//                   resizeMode="contain"
//                 />

//               </View>

//             </View>

//             <SearchInput></SearchInput>
//             <View className="w-full flex-1 pt-5 pb-8">
//               <Text className="text-gray-100 text-lg font-pregular mb-3">Latest videos</Text>
//               <Trending
//                   posts={latestPosts ?? []}

//               />
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={()=>(
//           <EmptyState
//           title="No videos found"
//           subtitle="Be the first to upload a video"
//           />
//         )}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}

//      />
//     </SafeAreaView>
//   )
// }

export default Home;
