import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
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

const recoverPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type FormData = z.infer<typeof recoverPasswordSchema>;

export default function SignUpStepOne() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("./newPassword");
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
        <View className="flex-1 mt-16 p-6 w-full">
          <View className="mt-2 flex-row mb-6 items-center gap-2">
            <TouchableOpacity onPress={handleBack}>
              <Image
                source={require("@/assets/png-icons/turn-back-icon.png")}
              />
            </TouchableOpacity>
            <Text className="text-purple-600 text-4xl font-bold">Recuperar senha</Text>
          </View>

          <View className="mt-4">
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
