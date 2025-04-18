import { SignUpProvider } from "@/contexts/signUpContext";
import { Stack } from "expo-router";
import React from "react";

export default function SignUpLayout() {
  return (
    <SignUpProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="recoverPassword" options={{ headerShown: false }} />
        <Stack.Screen name="newPassword" options={{ headerShown: false }} />
      </Stack>
    </SignUpProvider>
  );
}
