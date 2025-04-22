import SignHeader from "@/components/signUp/signHeader";
import { useCadastroContext } from "@/contexts/signUpContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import { z } from "zod";
import Button from "../../components/ui/Button";

const step1Schema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type Step1FormData = z.infer<typeof step1Schema>;

export default function SignUpStepOne() {
  const { updateFormData, formData, setCurrentStep } = useCadastroContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: formData.email || "",
      senha: formData.senha || "",
    },
  });

  const onSubmit = (data: Step1FormData) => {
    updateFormData(data);
    setCurrentStep(2);
    router.push("./signUpStepTwo");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 mt-16 p-6 w-full">
          <SignHeader />

          <View className="mt-8">
            <Text className="text-lg font-medium mb-2">Informe seu e-mail</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="johndoe@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 mb-4">{errors.email.message}</Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Informe sua senha
            </Text>
            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.senha ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="*******"
                  secureTextEntry
                />
              )}
            />
            {errors.senha && (
              <Text className="text-red-500 mb-4">{errors.senha.message}</Text>
            )}

            <Button
              className="mt-8"
              variant="default"
              size="default"
              onPress={handleSubmit(onSubmit)}
              title="Avançar"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
