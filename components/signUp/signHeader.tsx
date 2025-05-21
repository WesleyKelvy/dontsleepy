import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ProgressIndicator from "./progressIndicator";
import { useCadastroContext } from "../../contexts/signUpContext";

const SignHeader: React.FC = () => {
  const { setCurrentStep, currentStep } = useCadastroContext();

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
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
