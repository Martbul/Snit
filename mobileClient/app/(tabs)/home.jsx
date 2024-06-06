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
import { icons } from "../../constants";
import styles from "../../assets/css/knowledgebase/knowledgebase";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);

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
      <View>
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={icons.menuhamburger}
            style={styles.hamburgerIcon}
            resizeMode="contain"
          />
          <Text className="text-white">sdsd</Text>
        </TouchableOpacity>
        <View></View>
      </View>
      <View>
        <Text className="text-white">Dashboard</Text>
        <Text className="text-white">Dummy text</Text>
      </View>
      <View>
        <View>
          <View>
            <Image />
            <Text>Box</Text>
          </View>
          <View>
            <Image />
            <Text>Box</Text>
          </View>
          <View>
            <Image />
            <Text>Box</Text>
          </View>
          <View>
            <Image />
            <Text>Box</Text>
          </View>
        </View>
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
