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
import api from "@/utils/api";

const step3Schema = z.object({
  cep: z.string().regex(/^[0-9]{5}-[0-9]{3}$/, "CEP inválido."),
  estado: z.string().min(2, "Estado inválido"),
  cidade: z.string().min(2, "Cidade deve ter no mínimo 2 caractéres"),
  bairro: z.string().min(2, "Bairro obrigatório"),
  rua: z.string().min(2, "Logradouro obrigatório"),
  numero: z.string().min(1, "Número obrigatório"),
});

type Step3FormData = z.infer<typeof step3Schema>;

const createUser = async (userData: any) => {
  // Ajuste os campos conforme o backend espera
  // Converte birthdate para ISO (YYYY-MM-DDT00:00:00.000Z)
  let birthDateISO = userData.birthdate;
  if (birthDateISO && birthDateISO.includes("/")) {
    const [day, month, year] = birthDateISO.split("/");
    birthDateISO = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  // Garante formato ISO completo
  if (birthDateISO && birthDateISO.length === 10) {
    birthDateISO = `${birthDateISO}T00:00:00.000Z`;
  }
  // Log para debug do payload
  console.log("Payload enviado para o backend:", {
    email: userData.email,
    name: userData.name,
    password: userData.senha,
    birthDate: birthDateISO,
    cep: userData.cep,
    cidade: userData.cidade || userData.cityName,
    uf: userData.estado || userData.state,
    estado: userData.estado || userData.state, // backend espera 'estado' também
    bairro: userData.bairro || "",
    rua: userData.rua || "",
    numero: userData.numero || "",
  });
  const payload = {
    email: userData.email,
    name: userData.name,
    password: userData.senha, // backend espera 'password'
    birthDate: birthDateISO,
    cep: userData.cep,
    cidade: userData.cidade || userData.cityName,
    uf: userData.estado || userData.state, // backend espera 'uf'
    estado: userData.estado || userData.state, // backend espera 'estado' também
    bairro: userData.bairro || "",
    rua: userData.rua || "",
    numero: userData.numero || "",
  };
  const response = await api.post("/users/create", payload);
  return response.data;
};

export default function CadastroStep3() {
  const { updateFormData, formData, setCurrentStep } = useCadastroContext();
  const [cepLoading, setCepLoading] = React.useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      cep: formData.cep || "",
      estado: formData.state || "",
      cidade: formData.cityName || "",
      bairro: formData.bairro || "",
      rua: formData.rua || "",
      numero: formData.numero || "",
    },
  });

  // Função para buscar dados do CEP
  const buscarCep = async (cep: string) => {
    setCepLoading(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`
      );
      const data = await response.json();
      if (!data.erro) {
        setValue("estado", data.uf || "");
        setValue("cidade", data.localidade || "");
        setValue("bairro", data.bairro || "");
        setValue("rua", data.logradouro || "");
      }
    } catch (e) {
      // erro ao buscar cep
    } finally {
      setCepLoading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    },
    onError: (error: any) => {
      let msg = "Ocorreu um erro ao realizar o cadastro.";
      if (error?.response?.data?.message) {
        msg += `\n${JSON.stringify(error.response.data.message)}`;
      } else if (error?.message) {
        msg += `\n${error.message}`;
      }
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", msg);
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
          <View className="mt-8">
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
                    if (text.length === 9) buscarCep(text);
                  }}
                  placeholder="63090-001"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.cep && (
              <Text className="text-red-500 mb-4">{errors.cep.message}</Text>
            )}
            {/* Estado */}
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
                  onChangeText={(text) => onChange(text.toUpperCase())}
                  placeholder="SP"
                  maxLength={2}
                  autoCapitalize="characters"
                />
              )}
            />
            {errors.estado && (
              <Text className="text-red-500 mb-4">{errors.estado.message}</Text>
            )}
            {/* Cidade */}
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
                  placeholder="São Paulo"
                />
              )}
            />
            {errors.cidade && (
              <Text className="text-red-500 mb-4">{errors.cidade.message}</Text>
            )}
            {/* Bairro */}
            <Text className="text-lg font-medium mb-2 mt-4">
              Informe seu bairro
            </Text>
            <Controller
              control={control}
              name="bairro"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.bairro ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Centro"
                />
              )}
            />
            {errors.bairro && (
              <Text className="text-red-500 mb-4">{errors.bairro.message}</Text>
            )}
            {/* Rua */}
            <Text className="text-lg font-medium mb-2 mt-4">
              Informe seu logradouro
            </Text>
            <Controller
              control={control}
              name="rua"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.rua ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Rua Exemplo"
                />
              )}
            />
            {errors.rua && (
              <Text className="text-red-500 mb-4">{errors.rua.message}</Text>
            )}
            {/* Número */}
            <Text className="text-lg font-medium mb-2 mt-4">
              Informe o número
            </Text>
            <Controller
              control={control}
              name="numero"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.numero ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="123"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.numero && (
              <Text className="text-red-500 mb-4">{errors.numero.message}</Text>
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
