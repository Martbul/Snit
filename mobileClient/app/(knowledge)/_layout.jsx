import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[knowledgedata]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}

export default TabsLayout


