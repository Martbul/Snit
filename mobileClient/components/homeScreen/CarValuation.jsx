import { Text, View } from "react-native";

export const CarValuation = ({selectedKnowedgeBase }) => {
   const { title } = selectedKnowedgeBase

    return ( <>
        <View>
            <Text className="text-white text-center font-psemibold">{title}</Text>
            
        </View>
    </> );
}