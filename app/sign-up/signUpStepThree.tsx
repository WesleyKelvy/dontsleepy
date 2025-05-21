import SignHeader from "@/components/signUp/signHeader";
import { useCadastroContext } from "@/contexts/signUpContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { z } from "zod";
import Button from "../../components/ui/Button";

const step3Schema = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido."),
  state: z.string().min(2, "Estado inválido"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caractéres"),
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

const BrazilianStates = [
  {
    id: 11,
    sigla: "RO",
    nome: "Rondônia",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 12,
    sigla: "AC",
    nome: "Acre",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 13,
    sigla: "AM",
    nome: "Amazonas",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 14,
    sigla: "RR",
    nome: "Roraima",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 15,
    sigla: "PA",
    nome: "Pará",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 16,
    sigla: "AP",
    nome: "Amapá",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 17,
    sigla: "TO",
    nome: "Tocantins",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
  },
  {
    id: 21,
    sigla: "MA",
    nome: "Maranhão",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 22,
    sigla: "PI",
    nome: "Piauí",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 23,
    sigla: "CE",
    nome: "Ceará",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 24,
    sigla: "RN",
    nome: "Rio Grande do Norte",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 25,
    sigla: "PB",
    nome: "Paraíba",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 26,
    sigla: "PE",
    nome: "Pernambuco",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 27,
    sigla: "AL",
    nome: "Alagoas",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 28,
    sigla: "SE",
    nome: "Sergipe",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 29,
    sigla: "BA",
    nome: "Bahia",
    regiao: { id: 2, sigla: "NE", nome: "Nordeste" },
  },
  {
    id: 31,
    sigla: "MG",
    nome: "Minas Gerais",
    regiao: { id: 3, sigla: "SE", nome: "Sudeste" },
  },
  {
    id: 32,
    sigla: "ES",
    nome: "Espírito Santo",
    regiao: { id: 3, sigla: "SE", nome: "Sudeste" },
  },
  {
    id: 33,
    sigla: "RJ",
    nome: "Rio de Janeiro",
    regiao: { id: 3, sigla: "SE", nome: "Sudeste" },
  },
  {
    id: 35,
    sigla: "SP",
    nome: "São Paulo",
    regiao: { id: 3, sigla: "SE", nome: "Sudeste" },
  },
  {
    id: 41,
    sigla: "PR",
    nome: "Paraná",
    regiao: { id: 4, sigla: "S", nome: "Sul" },
  },
  {
    id: 42,
    sigla: "SC",
    nome: "Santa Catarina",
    regiao: { id: 4, sigla: "S", nome: "Sul" },
  },
  {
    id: 43,
    sigla: "RS",
    nome: "Rio Grande do Sul",
    regiao: { id: 4, sigla: "S", nome: "Sul" },
  },
  {
    id: 50,
    sigla: "MS",
    nome: "Mato Grosso do Sul",
    regiao: { id: 5, sigla: "CO", nome: "Centro-Oeste" },
  },
  {
    id: 51,
    sigla: "MT",
    nome: "Mato Grosso",
    regiao: { id: 5, sigla: "CO", nome: "Centro-Oeste" },
  },
  {
    id: 52,
    sigla: "GO",
    nome: "Goiás",
    regiao: { id: 5, sigla: "CO", nome: "Centro-Oeste" },
  },
  {
    id: 53,
    sigla: "DF",
    nome: "Distrito Federal",
    regiao: { id: 5, sigla: "CO", nome: "Centro-Oeste" },
  },
];

type IBGECityResponses = {
  id: number;
  nome: string;
};

export default function CadastroStep3() {
  const { updateFormData, formData, setCurrentStep } = useCadastroContext();
  const [cities, setCities] = useState<IBGECityResponses[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      cep: formData.cep || "",
      state: formData.state || "",
      city: formData.cityName || "",
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

   const navigateToSignUp = () => {
      router.push("/(tabs)");
    };
  

  const onSubmit = (data: Step3FormData) => {
    updateFormData(data);
    // setCurrentStep(4);

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
                  }}
                  placeholder="63090-001"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.cep && (
              <Text className="text-red-500 mb-2">{errors.cep.message}</Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Informe seu estado
            </Text>
            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, value } }) => (
                <View
                  className={`border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-lg mb-1`}
                >
                  <Picker
                    mode="dropdown"
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                      // fetching cities of state
                      if (itemValue) {
                        console.log("itemValue: ", itemValue);
                        fetch(
                          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${itemValue}/municipios`
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            console.log("data: ", data);
                            setCities(data);
                          })
                          .catch((error) => console.error(error));
                      } else {
                        setCities([]);
                      }
                    }}
                  >
                    <Picker.Item
                      label="Selecione o estado"
                      value=""
                      color="#737373"
                      style={{ fontSize: 14 }}
                    />
                    {BrazilianStates.map((state) => (
                      <Picker.Item
                        key={state.id}
                        label={state.nome}
                        value={state.sigla}
                        color="#000000"
                        style={{ fontSize: 14 }}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.state && (
              <Text className="text-red-500 mb-2">{errors.state.message}</Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Informe sua cidade
            </Text>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <View
                  className={`border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-lg mb-1`}
                >
                  <Picker
                    enabled={cities.length !== 0 ? true : false}
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Picker.Item
                      label="Selecione a cidade"
                      value=""
                      color="#737373"
                      style={{ fontSize: 14 }}
                    />
                    {cities.map((city) => (
                      <Picker.Item
                        key={city.id}
                        label={city.nome}
                        value={city.nome}
                        color="#000000"
                        style={{ fontSize: 14 }}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.city && (
              <Text className="text-red-500 mb-2">{errors.city.message}</Text>
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
