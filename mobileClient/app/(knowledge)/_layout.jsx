import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text,Image } from 'react-native'
import KnowledgeImages from './knowledgeimages';
import KnowledgeVideos from './knowledgevideos';
import { NavigationContainer } from '@react-navigation/native';



const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="knowledgeimages" options={{ headerShown: false }} />
        <Stack.Screen name="knowledgevideos" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
      {/* <Stack.Navigator>
        <Stack.Screen
          name="knowledgeimages"
          component={KnowledgeImages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="knowledgevideos"
          component={KnowledgeVideos}
          options={{ headerShown: false }}
        />
        <StatusBar backgroundColor="#161622" style="light" />
      </Stack.Navigator> */}
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="knowledgeimages">
          
          <Stack.Screen
            name="knowledgeImages"
            component={KnowledgeImages}

          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  );
}

export default TabsLayout


// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { StatusBar } from "expo-status-bar";
// import { View, Text, Image } from "react-native";

// const Stack = createStackNavigator();

// const TabsLayout = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="knowledgeimages"
//           component={KnowledgeImages}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="knowledgevideos"
//           component={KnowledgeVideos}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//       <StatusBar backgroundColor="#161622" style="light" />
//     </NavigationContainer>
//   );
// };

// export default TabsLayout;
