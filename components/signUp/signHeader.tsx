import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressIndicator from "./progressIndicator";

const SignHeader: React.FC = () => {
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="w-full flex-col gap-4">
      <View className="mt-2 flex-row mb-2 items-center gap-2">
        <TouchableOpacity onPress={handleBack}>
          <Image source={require("@/assets/png-icons/turn-back-icon.png")} />
        </TouchableOpacity>
        <Text className="text-purple-600 text-4xl font-bold">Cadastro</Text>
      </View>
      <ProgressIndicator />
    </View>
  );
};

export default SignHeader;
