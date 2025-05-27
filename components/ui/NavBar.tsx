import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function BottomNavbar() {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 h-20
     bg-white border-t border-gray-200 flex-row 
       justify-around items-center"
    >
      <TouchableOpacity onPress={() => router.push("/home")}>
        <View className="items-center">
          <Feather name="home" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-500">Início</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/search")}>
        <View className="items-center">
          <Feather name="search" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-500">Buscar</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {}}
        className="bg-purple-600 p-4 rounded-full -mt-10 shadow-md"
      >
        <Ionicons name="apps-outline" size={28} color="white" />
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => router.push("/monitoring")}>
        <View className="items-center">
          <FontAwesome5 name="low-vision" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-500">Monitoramento</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/profile")}>
        <View className="items-center">
          <Feather name="user" size={24} color="#6B7280" />
          <Text className="text-xs text-gray-500">Perfil</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// import Svg, { Circle, Rect } from "react-native-svg";
// import {

// } from "@/assets/png-icons/test.svg";

// const NavBar = (props: any) => {
//   return <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}></Svg>;
// };
