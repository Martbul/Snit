import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text,Image } from 'react-native'



const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="knowledgeimages" options={{ headerShown: false }} />
        <Stack.Screen name="knowledgevideos" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}

export default TabsLayout