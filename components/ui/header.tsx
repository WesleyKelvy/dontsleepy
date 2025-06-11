import api from "@/utils/api";
import { getToken } from "@/utils/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface headerProps {
  name: string;
  points: string;
  image: ImageSourcePropType;
  className?: string;
}

export const Header = ({ name, image, className }: headerProps) => {
  const [loading, setIsLoading] = useState(false);
  const [points, setPoints] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      try {
        const token = await getToken();
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPoints(response.data.points);
      } catch (e: unknown) {
        console.log(e);
      } finally {
        return;
      }
    };
    fetchProfile();
  }, []);

  return (
    <View className={`flex-row justify-between items-center mb-6 ${className}`}>
      <View>
        <Text className="text-purple-600 font-bold text-2xl">{name}</Text>
        <View className="flex-row items-center">
          <Image
            source={require("@/assets/png-icons/wallet_icon.png")}
            className="w-4 h-4 mr-1"
          />
          <Text className="text-md text-gray-500">{points} pontos</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push("/profile")} className="">
        <Image source={image} className="w-12 h-12 rounded-full" />
      </TouchableOpacity>
    </View>
  );
};
