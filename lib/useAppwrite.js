import React from "react";
import { Alert } from "react-native";
export const useAppwrite = (fn) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const posts = await fn();

      setData(posts);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};
