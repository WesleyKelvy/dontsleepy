import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import BottomNavbar from "@/components/ui/NavBar";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-24">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-purple-600">Bem vindo</Text>
          <Image
            source={require("@/assets/images/profile_photo.png")}
            className="w-10 h-10 rounded-full"
          />
        </View>

        {/* Histórico semanal */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-purple-600 mb-2">
            Historico semanal
          </Text>
        </View>

        {/* Tempo sem dormir */}
        <View className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-lg font-bold text-purple-600 mb-2">
            Tempo sem dormir
          </Text>
          <Text className="text-gray-500">--:--</Text>
        </View>

        {/* Minhas últimas sonecas */}
        <View className="mb-24 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-lg   font-bold text-purple-600 mb-2">
            Minhas ultimas sonecas
          </Text>
          <Text className="text-gray-500">Sem registros ainda.</Text>
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}
