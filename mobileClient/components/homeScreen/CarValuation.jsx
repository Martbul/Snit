import { Text, View } from "react-native";

export const CarValuation = ({selectedKnowedgeBase }) => {
    if(selectedKnowedgeBase){
   let { title } = selectedKnowedgeBase
    }else{
        title ='error with getting KB'
    }



    return ( <>
        <View>
            <Text className="text-white text-center font-psemibold">{title}</Text>
            
        </View>
    </> );
}