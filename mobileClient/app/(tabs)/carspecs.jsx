import { View, Text, Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants';
import SmallSearchInput from './../../components/singleUIElements/SmallSeacrhInput';

const CarSpecs = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex flex-col">
        <View className="flex-row gap-14 pl-1 pr-2 pt-6">
          <View className="flex items-center align-middle pb-44">
            <TouchableOpacity
              onPress={() => router.push("/knowledgebase")}
              style={{ paddingLeft: 10 }}
            >
              <Image
                source={icons.backArrow}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-1 items-center">
            <TouchableOpacity>
              <Text className="text-white text-2xl">Car Archive</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={icons.dots}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </View>
        </View>
        <View className="w-full pr-5 pl-5">
          <SmallSearchInput />
        </View>
      </View>
      <View className="w-full bg-secondary">
        <View className="flex-row justify-center items-center">
          <View
            className=" bg-white border border-xl rounded-xl h-12 justify-center items-center m-3"
            style={{ width: "45%" }}
          >
            <Text>BMW</Text>
          </View>
          <View
            className=" bg-white border border-xl rounded-xl h-12 justify-center items-center m-3"
            style={{ width: "45%" }}
          >
            <Text>Audi</Text>
          </View>

          
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CarSpecs;