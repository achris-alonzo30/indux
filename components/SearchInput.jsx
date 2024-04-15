import React from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import { View, Image, Alert, TextInput, TouchableOpacity } from "react-native";

export const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = React.useState(initialQuery || "");

  return (
    <View className="flex flex-row w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        autoCapitalize="none"
        className="mt-0.5 text-white items-center flex-1 font-pregular"
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder="Search for a video"
        placeholderTextColor="#CDCDE0"
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing Query", "Please enter a search query");
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
