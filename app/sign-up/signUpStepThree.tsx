import SignHeader from "@/components/signUp/signHeader";
import { useCadastroContext } from "@/contexts/signUpContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { z } from "zod";
import Button from "../../components/ui/Button";

const step3Schema = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido."),
  estado: z.string().min(2, "Estado inválido"),
  cidade: z.string().min(2, "Cidade deve ter no mínimo 2 caractéres"),
});

type Step3FormData = z.infer<typeof step3Schema>;

const createUser = async (userData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Usuário criado:", userData);
      resolve({ success: true, userId: "123456" });
    }, 1000);
  });
};

export default function CadastroStep3() {
  const { updateFormData, formData, setCurrentStep } = useCadastroContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      cep: formData.cep || "",
      estado: formData.state || "",
      cidade: formData.cityName || "",
    },
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    },
    onError: () => {
      Alert.alert("Erro", "Ocorreu um erro ao realizar o cadastro.");
    },
  });

  const onSubmit = (data: Step3FormData) => {
    updateFormData(data);
    setCurrentStep(4);

    // Preparing data for request
    const completeData = {
      ...formData,
      ...data,
    };

    mutation.mutate(completeData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 p-6 mt-16">
          <SignHeader />

          {/* Form */}
          <View className="mt-4">
            <Text className="text-lg font-medium mb-2">Informe seu CEP</Text>
            <Controller
              control={control}
              name="cep"
              render={({ field: { onChange, value } }) => (
                <MaskedTextInput
                  mask="99999-999"
                  style={[styles.input, errors.cep ? styles.inputError : null]}
                  value={value}
                  onChangeText={(text, rawText) => {
                    onChange(text);
                  }}
                  placeholder="63090-001"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.cep && (
              <Text className="text-red-500 mb-4">{errors.cep.message}</Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Informe seu estado
            </Text>
            <Controller
              control={control}
              name="estado"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.estado ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="São Paulo"
                />
              )}
            />
            {errors.estado && (
              <Text className="text-red-500 mb-4">{errors.estado.message}</Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Informe sua cidade
            </Text>
            <Controller
              control={control}
              name="cidade"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.cidade ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="São Bernado"
                />
              )}
            />
            {errors.cidade && (
              <Text className="text-red-500 mb-4">{errors.cidade.message}</Text>
            )}

            <Button
              isLoading={mutation.isPending}
              className="mt-8"
              variant="default"
              size="default"
              onPress={handleSubmit(onSubmit)}
              title="Cadastrar-me"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300 equivalent
    borderRadius: 8, // rounded-lg equivalent
    padding: 16, // p-4 equivalent
    marginBottom: 4, // mb-1 equivalent
  },
  inputError: {
    borderColor: "#EF4444", // red-500 equivalent
  },
});
