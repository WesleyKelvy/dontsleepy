import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import BottomNavbar from "@/components/ui/NavBar";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-24">
        {/* Avatar e nome */}
        <View className="items-center mb-6">
          <Image
            source={require("@/assets/images/profile_photo.png")}
            className="w-28 h-28 rounded-full mb-2"
            resizeMode="cover"
          />
          <Text className="text-lg font-bold text-purple-600">John Doe</Text>
          <Text className="text-sm text-gray-400">New York</Text>
        </View>

        {/* Informações Pessoais */}
        <View className="border-t border-gray-200 pt-4 mb-4">
          <Text className="text-purple-600 text-base font-bold mb-2">
            Informações pessoais
          </Text>

          <Text className="text-sm text-gray-600 mb-1">Nome</Text>
          <TextInput
            value="Jhon Doe"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
          />

          <Text className="text-sm text-gray-600 mb-1">Email</Text>
          <TextInput
            value="jhondoe@gmail.com"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
            keyboardType="email-address"
          />

          <Text className="text-sm text-gray-600 mb-1">Data de nascimento</Text>
          <TextInput
            value="09/04/2024"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
          />
        </View>

        {/* Endereço */}
        <View className="border-t border-gray-200 pt-4 mb-24">
          <Text className="text-purple-600 text-base font-bold mb-2">
            Endereço
          </Text>

          <Text className="text-sm text-gray-600 mb-1">CEP</Text>
          <TextInput
            value="63000-80"
            placeholder="Digite o CEP"
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}
