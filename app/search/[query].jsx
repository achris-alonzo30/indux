import React from "react";
import { Empty } from "../../components/Empty";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { getSearchPosts } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";
import { VideoCard } from "../../components/VideoCard";
import { SearchInput } from "../../components/SearchInput";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchQuery = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getSearchPosts(query));

  React.useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="font-psemibold text-2xl text-white capitalize">
              {query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Empty subtitle="No videos found for this query" />
        )}
      />
    </SafeAreaView>
  );
};

export default SearchQuery;
