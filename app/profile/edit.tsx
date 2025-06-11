import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import api from "@/utils/api";
import { getToken } from "@/utils/auth";
import { useRouter } from "expo-router";

export default function EditProfileScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    cep: "",
    estado: "",
    cidade: "",
    uf: "",
    bairro: "",
    rua: "",
    numero: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  
  // Date picker states
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setMsg(null);
      try {
        const token = await getToken();
        const resp = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = resp.data;
        
        // Parse birthDate to Date object for the picker
        let birthDateObj = null;
        if (user.birthDate) {
          birthDateObj = new Date(user.birthDate);
          setSelectedDate(birthDateObj);
        }
        
        setForm({
          name: user.name || "",
          email: user.email || "",
          birthDate: user.birthDate ? user.birthDate.slice(0, 10) : "",
          cep: user.cep || "",
          estado: user.estado || user.uf || "",
          cidade: user.cidade || "",
          uf: user.uf || user.estado || "",
          bairro: user.bairro || "",
          rua: user.rua || "",
          numero: user.numero || "",
        });
      } catch (e: any) {
        setMsg("Erro ao carregar dados do perfil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    // it only changes if the user sends a set date event
    if (event.type === "set" && selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      handleChange("birthDate", formattedDate);
    }
    // otherwise it will get off the screen
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const token = await getToken();
      const payload = {
        name: form.name,
        birthDate: form.birthDate,
        cep: form.cep,
        estado: form.estado,
        cidade: form.cidade,
        uf: form.uf,
        bairro: form.bairro,
        rua: form.rua,
        numero: form.numero,
      };
      await api.patch("/users/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Dados atualizados com sucesso!");
      setTimeout(() => {
        router.replace("/profile");
      }, 1200);
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Erro ao atualizar dados.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="px-6 pt-24 flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Avatar e nome */}
          <View className="items-center mb-6">
            <Image
              source={require("@/assets/images/profile_photo.png")}
              className="w-28 h-28 rounded-full mb-2"
              resizeMode="cover"
            />
            <Text className="text-lg font-bold text-purple-600">{form.name}</Text>
            <Text className="text-sm text-gray-400">{form.cidade}</Text>
          </View>
          
          {/* Mensagem de erro/sucesso */}
          {msg && (
            <Text
              className={`text-center mb-2 ${
                msg.includes("sucesso") ? "text-green-600" : "text-red-500"
              }`}
            >
              {msg}
            </Text>
          )}
          
          {loading ? (
            <Text className="text-center text-gray-400 mb-4">Carregando...</Text>
          ) : (
            <View className="border-t border-gray-200 pt-4 mb-4">
              <Text className="text-purple-600 text-base font-bold mb-2">
                Editar informações pessoais
              </Text>
              
              <Text className="text-sm text-gray-600 mb-1">Nome</Text>
              <TextInput
                value={form.name}
                onChangeText={(v) => handleChange("name", v)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                editable
                autoCapitalize="words"
                placeholder="Digite seu nome"
              />
              
              <Text className="text-sm text-gray-600 mb-1">Email</Text>
              <TextInput
                value={form.email}
                editable={false}
                className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 mb-4 text-gray-400"
                keyboardType="email-address"
              />
              
              <Text className="text-sm text-gray-600 mb-1">Data de nascimento</Text>
              <TouchableOpacity onPress={toggleDatePicker}>
                <TextInput
                  value={selectedDate ? selectedDate.toLocaleDateString("pt-BR") : ""}
                  className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-1"
                  placeholder="Toque para selecionar a data"
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={selectedDate ?? new Date()}
                  mode="date"
                  onChange={onDateChange}
                  maximumDate={new Date()} // Prevent future dates
                  minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
                />
              )}
              
              <Text className="text-sm text-gray-600 mb-1 mt-4">CEP</Text>
              <TextInput
                value={form.cep}
                onChangeText={(v) => handleChange("cep", v)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                keyboardType="numeric"
                maxLength={9}
                placeholder="Digite o CEP"
                editable
              />
              
              <Text className="text-sm text-gray-600 mb-1">Estado (UF)</Text>
              <TextInput
                value={form.estado}
                onChangeText={(v) => handleChange("estado", v.toUpperCase())}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                maxLength={2}
                placeholder="Ex: SP"
                autoCapitalize="characters"
                editable
              />
              
              <Text className="text-sm text-gray-600 mb-1">Cidade</Text>
              <TextInput
                value={form.cidade}
                onChangeText={(v) => handleChange("cidade", v)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                placeholder="Digite a cidade"
                autoCapitalize="words"
                editable
              />
              
              <Text className="text-sm text-gray-600 mb-1">Bairro</Text>
              <TextInput
                value={form.bairro}
                onChangeText={(v) => handleChange("bairro", v)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                placeholder="Digite o bairro"
                autoCapitalize="words"
                editable
              />
              
              <Text className="text-sm text-gray-600 mb-1">Rua</Text>
              <TextInput
                value={form.rua}
                onChangeText={(v) => handleChange("rua", v)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                placeholder="Digite o nome da rua"
                autoCapitalize="words"
                editable
              />
              
              <Text className="text-sm text-gray-600 mb-1">Número</Text>
              <TextInput
                value={form.numero}
                onChangeText={(v) => handleChange("numero", v)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
                keyboardType="numeric"
                placeholder="Digite o número"
                editable
              />
            </View>
          )}
          
          <TouchableOpacity
            className="bg-purple-600 rounded-lg py-3 px-4"
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={saving || loading}
            style={{ opacity: saving || loading ? 0.7 : 1 }}
          >
            <Text className="text-white text-center font-bold text-base">
              {saving ? "Salvando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}