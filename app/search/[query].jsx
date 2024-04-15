import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { SearchInput } from "../../components/SearchInput";
import { Trending } from "../../components/Trending";
import { Empty } from "../../components/Empty";
import { getSearchPosts } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";
import { VideoCard } from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const SearchQuery = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getSearchPosts(query));
  const [refreshing, setRefreshing] = React.useState(false);

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
