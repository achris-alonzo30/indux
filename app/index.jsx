import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-slate-900 items-center justify-center">
      <Text className="text-emerald-500 font-pblack">Indux</Text>
      <Link href="/home" className="text-white">Go To</Link>
      <StatusBar style="auto" />
    </View>
  );
}

