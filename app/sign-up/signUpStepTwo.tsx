import SignHeader from "@/components/signUp/signHeader";
import { useCadastroContext } from "@/contexts/signUpContext";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import Button from "../../components/ui/Button";

const step2Schema = z.object({
  name: z.string().min(3, "Digite seu nome"),
  birthdate: z.string().min(2, "Data inválida (DD/MM/AAAA)"),
  // .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/AAAA)"),
});

type Step2FormData = z.infer<typeof step2Schema>;

export default function CadastroStep2() {
  const { updateFormData, formData, setCurrentStep } = useCadastroContext();
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    // it only changes if the user send a set date even
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString("pt-BR");
      setValue("birthdate", formattedDate);
    }
    // otherwise it will get off the screen
    setShow(false);
  };

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const {
    control,
    setValue, // needed to update the birthdate on onChange func.
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: formData.name || "",
      birthdate: formData.birthdate || "",
    },
  });

  const onSubmit = (data: Step2FormData) => {
    updateFormData(data);
    setCurrentStep(2);
    router.push("./signUpStepThree");
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
            <Text className="text-lg font-medium mb-2">Informe seu name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 mb-1`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Toque aqui para digitar"
                  autoCapitalize="words"
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 mb-4">{errors.name.message}</Text>
            )}

            <Text className="text-lg font-medium mb-2 mt-4">
              Informe sua data de nascimento
            </Text>

            <TextInput
              onPress={toggleDatePicker}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg p-4 mb-1`}
              value={date ? `${date.toLocaleDateString("pt-BR")}` : ""}
              placeholder="Toque para selecionar a data"
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date ?? new Date()}
                mode="date"
                onChange={onChange}
              />
            )}
            {errors.birthdate && (
              <Text className="text-red-500 mb-4">
                {errors.birthdate.message}
              </Text>
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
