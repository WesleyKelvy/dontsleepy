import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import BottomNavbar from "@/components/ui/NavBar";
import { SearchCard } from "../../components/ui/searchCard";
import { Header } from "../../components/ui/header";

export default function SearchScreen() {
  return (
    <SafeAreaView className=" pt-24 flex-1 bg-white w-full">
      {/* Header */}
      <Header
        image={require("@/assets/images/profile_photo.png")}
        name="Cupons e parcerias"
        points="200"
        className="px-6"
      />

      <ScrollView className="rounded-xl px-6">
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
        />
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}
