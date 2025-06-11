import { Feather } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { Alert, Linking, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavbar() {
  const handleMonitoringPress = async () => {
    const url = "https://face-detection-app-pi.netlify.app/";
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open the URL");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while trying to open the URL");
    }
  };

  return (
    <SafeAreaView className="flex-row justify-around items-center bg-white py-3 
                     px-4 border-t border-gray-200">
      <TouchableOpacity
        onPress={() => router.push("/home")}
        className="flex-1 items-center"
      >
        <Feather name="home" size={24} color="#6B7280" />
        <Text className="text-xs text-gray-500 mt-1">Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/search")}
        className="flex-1 items-center"
      >
        <Feather name="search" size={24} color="#6B7280" />
        <Text className="text-xs text-gray-500 mt-1">Buscar</Text>
      </TouchableOpacity>

      {/*  
      <TouchableOpacity
        onPress={() => {}}
        className="bg-purple-600 p-4 rounded-full -mt-10 shadow-md"
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
      */}

      <TouchableOpacity
        onPress={handleMonitoringPress}
        className="flex-1 items-center"
      >
        <FontAwesome5 name="eye" size={24} color="#6B7280" />
        <Text className="text-xs text-gray-500 mt-1">Monitoramento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/profile")}
        className="flex-1 items-center"
      >
        <Feather name="user" size={24} color="#6B7280" />
        <Text className="text-xs text-gray-500 mt-1">Perfil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}