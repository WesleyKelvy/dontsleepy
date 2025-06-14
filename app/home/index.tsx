import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavbar from "@/components/ui/NavBar";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { getToken } from "@/utils/auth";
import { useRouter } from "expo-router";
import { Sonecas } from "@/types/sonecas";
import { format, formatDistanceStrict, subDays, subHours } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export default function HomeScreen() {
  const [tempoSemDormir, setTempoSemDormir] = useState<string | null>(null);
  const [ultimasSonecas, setUltimasSonecas] = useState<Sonecas[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErro(null);
      try {
        let token = await getToken();
        if (!token) {
          await new Promise((res) => setTimeout(res, 500));
          token = await getToken();
        }
        if (!token) {
          setErro("Usuário não autenticado. Faça login novamente.");
          setLoading(false);
          return;
        }
        // Tempo sem dormir
        const tempoResp = await api.get("/sleep/time-since-last", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTempoSemDormir(tempoResp.data?.tempo || null);
        // Últimas sonecas do mês
        const sonecasResp = await api.get("/sleep/last-month", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUltimasSonecas(
          Array.isArray(sonecasResp.data) ? sonecasResp.data : []
        );
      } catch (e: any) {
        // Log detalhado para debug
        console.error("Erro ao buscar dados do sono:", e, e?.response?.data);
        setErro(
          e?.response?.data?.message ||
            "Erro ao buscar dados do sono. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    // fetchData();

    setUltimasSonecas([
      { id: 1, startAt: subHours(new Date(), 4), endAt: new Date() },
    ]);

    setTempoSemDormir(
      formatDistanceStrict(new Date(), subHours(new Date(), 20), {
        locale: ptBR,
      })
    );
  }, []);

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-24">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-purple-600">
            Bem vindo(a)
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className=""
          >
            <Image
              source={require("@/assets/images/profile_photo.png")}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Tempo sem dormir */}
        <View className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-lg font-bold text-purple-600 mb-2">
            Tempo sem dormir
          </Text>
          {loading ? (
            <Text className="text-gray-400">Carregando...</Text>
          ) : erro && tempoSemDormir === null ? (
            <Text className="text-red-500">{erro}</Text>
          ) : tempoSemDormir ? (
            <Text className="text-gray-800 text-2xl font-bold">
              {tempoSemDormir}
            </Text>
          ) : (
            <Text className="text-gray-500">Sem dados disponíveis.</Text>
          )}
        </View>

        {/* Minhas últimas sonecas */}
        <View className="mb-24 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-lg font-bold text-purple-600 mb-2">
            Minhas últimas sonecas
          </Text>
          {loading ? (
            <Text className="text-gray-400">Carregando...</Text>
          ) : erro && ultimasSonecas.length === 0 ? (
            // Se erro e array vazio, mostra mensagem amigável
            <Text className="text-gray-500">Sem registros ainda.</Text>
          ) : erro ? (
            <Text className="text-red-500">{erro}</Text>
          ) : ultimasSonecas.length === 0 ? (
            <Text className="text-gray-500">Sem registros ainda.</Text>
          ) : (
            ultimasSonecas.map((soneca, idx) => (
              <View
                key={soneca.id || idx}
                className="mb-2 p-2 bg-gray-50 rounded-lg border border-gray-100"
              >
                <Text className="text-gray-700">
                  Dia:{" "}
                  <Text className="font-bold">
                    {soneca.startAt.toLocaleDateString("pt-BR")}
                  </Text>
                </Text>
                <Text className="text-gray-700">
                  Início:{" "}
                  <Text className="font-bold">
                    {format(soneca.startAt, "HH:mm")}
                  </Text>
                </Text>
                <Text className="text-gray-700">
                  Fim:{" "}
                  <Text className="font-bold">
                    {format(soneca.endAt, "HH:mm")}
                  </Text>
                </Text>
                <Text className="text-gray-700">
                  Duração:{" "}
                  <Text className="font-bold">
                    {formatDistanceStrict(soneca.endAt, soneca.startAt, {
                      locale: ptBR,
                    })}
                  </Text>
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
}
