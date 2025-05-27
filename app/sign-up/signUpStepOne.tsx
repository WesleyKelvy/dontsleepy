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
  View,
} from "react-native";
import { z } from "zod";
import Button from "../../components/ui/Button";

const step1Schema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    passwordConfimation: z
      .string()
      .min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.passwordConfimation, {
    message: "As senhas não coincidem",
    path: ["passwordConfimation"],
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
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="*******"
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 mb-4">
                {errors.password.message}
              </Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Confirme sua senha
            </Text>
            <Controller
              control={control}
              name="passwordConfimation"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.passwordConfimation
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="*******"
                  secureTextEntry
                />
              )}
            />
            {errors.passwordConfimation && (
              <Text className="text-red-500 mb-4">
                {errors.passwordConfimation.message}
              </Text>
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
