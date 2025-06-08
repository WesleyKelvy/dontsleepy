import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import BottomNavbar from "@/components/ui/NavBar";
import { SearchCard } from "../../components/ui/searchCard";
import { Header } from "../../components/ui/header";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-24 pb-24 ">
        {/* Header */}
        <Header
          image={require("@/assets/images/profile_photo.png")}
          name="John Doe"
          points="200"
        />

        <ScrollView className="rounded-xl">
          {/* Cupom 1 */}
          <SearchCard
            image={require("@/assets/images/ifood-banner.png")}
            points="50"
            text="  20% de desconto no seu pedido ifood"
          />

          {/* Cupom 2 */}
          <SearchCard
            image={require("@/assets/images/unifap-banner.png")}
            text="20% de desconto na UNIFAP"
            points="100 pontos"
          />

          {/* Cupom 3 */}
          <SearchCard
            image={require("@/assets/images/steam-banner.png")}
            text="10% off em lojas geek e games"
            points="80 pontos"
          />

          {/* Cupom 2 */}
          <SearchCard
            image={require("@/assets/images/unifap-banner.png")}
            text="20% de desconto na UNIFAP"
            points="100 pontos"
          />

          {/* Cupom 3 */}
          <SearchCard
            image={require("@/assets/images/steam-banner.png")}
            text="10% off em lojas geek e games"
            points="80 pontos"
          />{/* Cupom 2 */}
          <SearchCard
            image={require("@/assets/images/unifap-banner.png")}
            text="20% de desconto na UNIFAP"
            points="100 pontos"
          />

          {/* Cupom 3 */}
          <SearchCard
            image={require("@/assets/images/steam-banner.png")}
            text="10% off em lojas geek e games"
            points="80 pontos"
          />{/* Cupom 2 */}
          <SearchCard
            image={require("@/assets/images/unifap-banner.png")}
            text="20% de desconto na UNIFAP"
            points="100 pontos"
          />

          {/* Cupom 3 */}
          <SearchCard
            image={require("@/assets/images/steam-banner.png")}
            text="10% off em lojas geek e games"
            points="80 pontos"
          />
        </ScrollView>
      </View>
      <BottomNavbar />
    </SafeAreaView>
  );
}
