import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
export const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex flex-row items-center ">
        <TextInput
          autoCapitalize="none"
          className="flex-1 text-white font-psemibold"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
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
};

