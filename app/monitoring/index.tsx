import { View } from "react-native";
import TopContent from "../../components/monitoring/topContent";
import WebViewComponent from "../../components/monitoring/webViewComponent";
import DrowsinessDetectionScreen from "../../components/drowsiness/DrowsinessDetectionScreen";

export default function MonitoringScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Top Bar */}
      <TopContent />
      {/* Content */}
      {/* <WebViewComponent /> */}
      {/* <DrowsinessDetectionScreen /> */}
    </View>
  );
}
