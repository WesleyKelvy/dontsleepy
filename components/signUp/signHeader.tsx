import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressIndicator from "./progressIndicator";

const SignHeader: React.FC = () => {
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="w-full">
      <View style={styles.container} >
        <TouchableOpacity onPress={handleBack} >
          <Text className="text-purple-600 text-3xl">&lt;</Text>
        </TouchableOpacity>
        <Text className="text-purple-600 text-3xl font-medium">Cadastro</Text>
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
    // width: ,
    gap: 8
  },
});
