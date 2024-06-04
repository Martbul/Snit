import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SmallSearchInput from '../../components/SmallSeacrhInout';
import { icons, images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import KnowledgeBaseCard from '../../components/KnowledgeBaseCard';
const Bookmark = () => {
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
        {/* <ScrollView>
<FlatList></FlatList>
        </ScrollView> */}
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={[
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 1 },
            { name: 2 },
            { name: 3 },

            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 1 },
            { name: 2 },
            { name: 3 },

            { name: 1 },
            { name: 2 },
            { name: 3 },
          ]}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 12, marginRight: 12, marginBottom: 20 }}>
              <KnowledgeBaseCard item={item} />
            </View>
          )}
          // ListHeaderComponent={() => (
          //   <View className="my-6 px-4 space-y-6">
          //     <View className="justify-between items-start flex-row mb-6">
          //       <View>
          //         <Text className="font-pmedium text-sm text-gray-100">
          //           Welcome back,
          //         </Text>
          //         <Text className="text-2xl font-psemibold text-white">
          //          sdsdsa
          //         </Text>
          //       </View>

          //       <View className="mt-1.5">
          //         <Image
          //           source={images.logoSmall}
          //           className="w-9 h-10"
          //           resizeMode="contain"
          //         />
          //       </View>
          //     </View>

          //     <SearchInput></SearchInput>
          //     <View className="w-full flex-1 pt-5 pb-8">
          //       <Text className="text-gray-100 text-lg font-pregular mb-3">
          //         Latest videos
          //       </Text>
          //       {/* <Trending posts={latestPosts ?? []} /> */}
          //     </View>
          //   </View>
          // )}
          ListEmptyComponent={() => (
            <EmptyState
              title="Add knowledge folders"
              // subtitle="Be the first to upload a video"
            />
          )}
        />
      </View>
      <View
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
      </View>
    </SafeAreaView>
  );
}

export default Bookmark