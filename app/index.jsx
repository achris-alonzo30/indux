import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-slate-900 items-center justify-center">
      <Text className="text-emerald-500">Indux</Text>
      <StatusBar style="auto" />
    </View>
  );
}

