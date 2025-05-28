import { View, Text, Image, ImageSourcePropType } from "react-native";

interface searchCardsProps {
  image: ImageSourcePropType;
  text: string;
  points: string;
}

export const SearchCard = ({ image, points, text }: searchCardsProps) => {
  return (
    <View className="mb-6">
      <Image
        source={image}
        className="w-full h-60 rounded-xl mb-2"
        resizeMode="cover"
      />
      <Text className="text-purple-600 font-semibold">
        {text}
        {/* 20% de desconto no seu pedido ifood */}
      </Text>
      <Text className="text-sm text-gray-400">{points} pontos</Text>
    </View>
  );
};
