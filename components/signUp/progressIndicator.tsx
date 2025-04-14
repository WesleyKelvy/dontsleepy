import React from "react";
import { View } from "react-native";
import { useCadastroContext } from "../../contexts/signUpContext";

const ProgressIndicator: React.FC = () => {
  const { currentStep, totalSteps } = useCadastroContext();

  return (
    <View className="flex-row w-full my-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;

        return (
          <View
            key={`step-${stepNumber}`}
            className={`h-1 flex-1 ${
              isActive ? "bg-purple-600" : "bg-gray-200"
            } ${index > 0 ? "ml-1" : ""}`}
          />
        );
      })}
    </View>
  );
};

export default ProgressIndicator;
