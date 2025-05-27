import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import BottomNavbar from "@/components/ui/NavBar";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-24">
        {/* Header com nome, pontos e avatar */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-purple-600 font-bold text-2xl">Jhon Doe</Text>
            <View className="flex-row items-center">
              <Image
                source={require("@/assets/png-icons/wallet_icon.png")} 
                className="w-4 h-4 mr-1"
              />
              <Text className="text-md text-gray-500">200 pontos</Text>
            </View>
          </View>
          <Image
            source={require("@/assets/images/profile_photo.png")}
            className="w-12 h-12 rounded-full"
          />
        </View>

        {/* Cupom 1 */}
        <View className="mb-6">
          <Image
            source={require("@/assets/images/ifood-banner.png")}
            className="w-full h-40 rounded-xl mb-2"
            resizeMode="cover"
          />
          <Text className="text-purple-600 font-semibold">
            20% de desconto no seu pedido ifood
          </Text>
          <Text className="text-sm text-gray-400">50 pontos</Text>
        </View>

        {/* Cupom 2 */}
        <View className="mb-6">
          <Image
            source={require("@/assets/images/unifap-banner.png")}
            className="w-full h-40 rounded-xl mb-2"
            resizeMode="cover"
          />
          <Text className="text-purple-600 font-semibold">
            20% de desconto na UNIFAP
          </Text>
          <Text className="text-sm text-gray-400">100 pontos</Text>
        </View>

        {/* Cupom 3 */}
        <View className="mb-24">
          <Image
            source={require("@/assets/images/steam-banner.png")}
            className="w-full h-40 rounded-xl mb-2"
            resizeMode="cover"
          />
          <Text className="text-purple-600 font-semibold">
            10% off em lojas geek e games
          </Text>
          <Text className="text-sm text-gray-400">80 pontos</Text>
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}
