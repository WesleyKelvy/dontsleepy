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
          <Stack.Screen name="signUpStepOne" options={{ headerShown: false }} />
          <Stack.Screen name="signUpStepTwo" options={{ headerShown: false }} />
          <Stack.Screen
            name="signUpStepThree"
            options={{ headerShown: false }}
          />
      </Stack>
    </SignUpProvider>
  );
}
