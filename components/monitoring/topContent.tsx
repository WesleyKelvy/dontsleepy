import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function TopContent() {
  const router = useRouter();

  return (
    <View className="flex-row items-center px-4 pb-3 pt-24  bg-white rounded-b-3xl">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-3xl text-purple-600 font-bold ml-2">
        Monitoramento
      </Text>
    </View>
  );
}
