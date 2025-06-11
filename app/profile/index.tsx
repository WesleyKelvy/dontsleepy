import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavbar from "@/components/ui/NavBar";
import { removeToken } from "@/utils/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { getToken } from "@/utils/auth";

export default function ProfileScreen() {
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

  const handleLogout = async () => {
    await removeToken();
    router.replace("/login/loginScreen");
  };

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="px-6 pt-24"
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

        {/* Mensagem de erro */}
        {msg && <Text className="text-center mb-2 text-red-500">{msg}</Text>}
        {loading ? (
          <Text className="text-center text-gray-400 mb-4">Carregando...</Text>
        ) : (
          <View className="border-t border-gray-200 pt-4 mb-4">
            <Text className="text-purple-600 text-base font-bold mb-2">
              Informações pessoais
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Nome</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Email</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4 text-gray-400">
              {form.email}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              Data de nascimento
            </Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.birthDate}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">CEP</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.cep}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Estado (UF)</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.estado}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Cidade</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.cidade}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Bairro</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.bairro}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Rua</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.rua}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Número</Text>
            <Text className="border border-gray-100 bg-gray-100 rounded-lg px-4 py-3 mb-4">
              {form.numero}
            </Text>
          </View>
        )}
      </ScrollView>
      {/* Botão de logout */}
      <View className="items-center border-t pt-3 pb-3 border-t-gray-400 ">
        <TouchableOpacity
          className="mb-6 bg-purple-600 rounded-lg py-3 px-4"
          onPress={handleEdit}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold text-base">
            Editar meus dados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-base text-red-500 underline font-bold">
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>
      <BottomNavbar />
    </SafeAreaView>
  );
}
