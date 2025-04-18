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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { isLoading, error } = useQuery({
  //   queryKey: ['authStatus'],
  //   queryFn: async () => {
  //     // Verificar status de autenticação ou outras operações
  //     return { isAuthenticated: false };
  //   },
  //   enabled: false, // Desativado por padrão, ative conforme necessário
  // });

  const handleLogin = () => {
    console.log("Login com:", email, password);
    // Se login sucesso: navigation.navigate('Home');
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
