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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginBlockStart: 8,
    flex: 0,
    flexDirection: "row",
    marginBlockEnd: 8,
    alignItems: "center",
    gap: 8,
  },
});
