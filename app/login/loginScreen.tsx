import { router } from "expo-router";
// import { useQuery } from '@tanstack/react-query';
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/ui/Button";
import api from "@/utils/api";
// @ts-ignore
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const { isLoading, error } = useQuery({
  //   queryKey: ['authStatus'],
  //   queryFn: async () => {
  //     // Verificar status de autenticação ou outras operações
  //     return { isAuthenticated: false };
  //   },
  //   enabled: false, // Desativado por padrão, ative conforme necessário
  // });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      // Salve o token JWT conforme necessário (ex: AsyncStorage, Context, etc)
      // Exemplo: await AsyncStorage.setItem('token', response.data.token);
      console.log("Login bem-sucedido!", response.data);
      router.push("/(tabs)");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        Toast.show({
          type: "error",
          text1: "Email ou senha incorretos",
          position: "top",
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao fazer login",
          text2: "Tente novamente mais tarde.",
          position: "top",
          visibilityTime: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push("/sign-up/signUpStepOne");
  };

  const navigateRecoverPassword = () => {
    router.push("/recover-password/recoverPassword");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 p-6 justify-between">
          <View className="items-center mt-10 mb-6">
            <View className="bg-gray-200 rounded-lg w-full h-32 items-center justify-center">
              <Text className="text-3xl font-bold">LOGO</Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-purple-600 text-lg font-medium mb-2">
              Fazer login
            </Text>

            <View className="mb-4">
              <Text className="text-gray-500 mb-1">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-2">
              <Text className="text-gray-500 mb-1">Senha</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="mb-6"
              onPress={navigateRecoverPassword}
            >
              <Text className="text-purple-600">Esqueceu a senha?</Text>
            </TouchableOpacity>

            <Button
              variant="default"
              size="default"
              onPress={handleLogin}
              title="Entrar"
              isLoading={isLoading}
            />
          </View>

          <View className="items-center mb-6">
            <Text className="text-purple-600 mb-3">Não possui conta?</Text>

            <Button
              variant="outline"
              size="sm"
              onPress={navigateToSignUp}
              title="Cadastre-se"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
