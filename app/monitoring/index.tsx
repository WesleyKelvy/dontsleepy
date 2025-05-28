import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MonitoringScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Top Bar */}
      <View className="flex-row items-center px-4 pb-3 pt-24  bg-white rounded-b-3xl">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl text-purple-600 font-bold ml-2">
          Monitoramento
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center"></View>

      {/* Start Button */}
      <View className="px-6 pb-10">
        <TouchableOpacity className="bg-purple-600 rounded-full py-3 items-center">
          <Text className="text-white text-lg font-semibold">Iniciar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
