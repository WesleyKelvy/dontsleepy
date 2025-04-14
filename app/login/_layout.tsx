import { Stack } from "expo-router";
import React from "react";
import { SignUpProvider } from "@/contexts/signUpContext";

export default function SignLayout() {
  return (
    <SignUpProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
      </Stack>
    </SignUpProvider>
  );
}
