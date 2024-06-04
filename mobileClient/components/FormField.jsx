import { View, Text, TextInput,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import {icons} from '../constants'
const FormField = ({title, value, placeholder, otherStyles,handleChangeText,...props}) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

        <View className="w-full h-16 px-4 bg-tertiary rounded-2xl border-2 border-tertiary focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "password" && !showPassword}
            {...props}
          />

          {title === "password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
}

export default FormField