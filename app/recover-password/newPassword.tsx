import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import Button from "../../components/ui/Button";

const newPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    passwordConfimation: z
      .string()
      .min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.passwordConfimation, {
    message: "As senhas não coincidem",
    path: ["passwordConfimation"],
  });

type Step3FormData = z.infer<typeof newPasswordSchema>;

const createUser = async (passwordData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Senha alterada:", passwordData);
      resolve({ success: true, userId: "123456" });
    }, 1000);
  });
};

export default function CadastroStep3() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {},
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      Alert.alert("Sucesso", "Senha alterada com sucesso!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    },
    onError: () => {
      Alert.alert("Erro", "Ocorreu um erro ao alterar a senha.");
    },
  });

  const onSubmit = (data: Step3FormData) => {

    mutation.mutate(data);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 p-6 mt-16">
          <View className="mt-2 flex-row mb-6 items-center gap-2">
            <TouchableOpacity onPress={handleBack}>
              <Image
                source={require("@/assets/png-icons/turn-back-icon.png")}
              />
            </TouchableOpacity>
            <Text className="text-purple-600 text-4xl font-bold">
              Recuperar senha
            </Text>
          </View>

          {/* Form */}
          <Text className="text-lg font-medium mb-2 mt-4">Nova senha</Text>
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
                placeholder="********"
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 mb-4">{errors.password.message}</Text>
          )}

          <Text className="text-lg font-medium mb-2 mt-4">Confirmar senha</Text>
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
                placeholder="********"
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
            isLoading={mutation.isPending}
            className="mt-8"
            variant="default"
            size="default"
            onPress={handleSubmit(onSubmit)}
            title="Confirmar"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
