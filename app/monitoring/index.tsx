import { View } from "react-native";
import TopContent from "../../components/monitoring/topContent";
import WebViewComponent from "../../components/monitoring/webViewComponent";

export default function MonitoringScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Top Bar */}
      <TopContent />
      {/* Content */}
      <WebViewComponent />
    </View>
  );
}
