
import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import { CustomButton } from "./CustomButton";
import { View, Text, Image } from "react-native";

export const Empty = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="font-psemibold text-xl text-center mt-2 text-white capitalize">
        {subtitle}
      </Text>

      <CustomButton title="Get Started" handlePress={() => router.push("/create")} containerStyles="w-full my-5" />
    </View>
  );
};
