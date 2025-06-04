import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { getToken } from "@/utils/auth";

export default function EditProfileScreen() {
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
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Erro ao atualizar dados.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
            />
            <Text className="text-sm text-gray-600 mb-1">Email</Text>
            <TextInput
              value={form.email}
              editable={false}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4 text-gray-400"
              keyboardType="email-address"
            />
            <Text className="text-sm text-gray-600 mb-1">
              Data de nascimento
            </Text>
            <TextInput
              value={form.birthDate}
              onChangeText={(v) => handleChange("birthDate", v)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              placeholder="YYYY-MM-DD"
              editable
            />
            <Text className="text-sm text-gray-600 mb-1">CEP</Text>
            <TextInput
              value={form.cep}
              onChangeText={(v) => handleChange("cep", v)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              editable
            />
            <Text className="text-sm text-gray-600 mb-1">Estado (UF)</Text>
            <TextInput
              value={form.estado}
              onChangeText={(v) => handleChange("estado", v.toUpperCase())}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              maxLength={2}
              editable
            />
            <Text className="text-sm text-gray-600 mb-1">Cidade</Text>
            <TextInput
              value={form.cidade}
              onChangeText={(v) => handleChange("cidade", v)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              editable
            />
            <Text className="text-sm text-gray-600 mb-1">Bairro</Text>
            <TextInput
              value={form.bairro}
              onChangeText={(v) => handleChange("bairro", v)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              editable
            />
            <Text className="text-sm text-gray-600 mb-1">Rua</Text>
            <TextInput
              value={form.rua}
              onChangeText={(v) => handleChange("rua", v)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              editable
            />
            <Text className="text-sm text-gray-600 mb-1">Número</Text>
            <TextInput
              value={form.numero}
              onChangeText={(v) => handleChange("numero", v)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4"
              keyboardType="numeric"
              editable
            />
          </View>
        )}
        <TouchableOpacity
          className="bg-purple-600 rounded-lg py-3 px-4"
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={saving}
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          <Text className="text-white text-center font-bold text-base">
            {saving ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
