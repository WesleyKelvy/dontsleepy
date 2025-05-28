import { View, Text, Image, ImageSourcePropType } from "react-native";

interface headerProps {
  name: string;
  points: string;
  image: ImageSourcePropType;
}

export const Header = ({ name, points, image }: headerProps) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
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
      <Image source={image} className="w-12 h-12 rounded-full" />
    </View>
  );
};
