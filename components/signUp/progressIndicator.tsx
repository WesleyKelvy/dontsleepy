import React from "react";
import { View, StyleSheet } from "react-native";
import { useCadastroContext } from "../../contexts/signUpContext";

const ProgressIndicator: React.FC = () => {
  const { currentStep, totalSteps } = useCadastroContext();

  const getProgressPercentage = (): number => {
    if (!currentStep) return 0;
    return (currentStep + 1) / totalSteps;
  };

  return (
    <View className="w-full flex-row relative">
      <View className={`h-1 w-full rounded-full absolute bg-[#E3E5E5]`}></View>

      <View
        style={{
          width: `${getProgressPercentage() * 100}%`,
          height: 4,
          borderRadius: 100,
          backgroundColor: "#9333ea",
        }}
      ></View>
    </View>
  );
};

export default ProgressIndicator;
