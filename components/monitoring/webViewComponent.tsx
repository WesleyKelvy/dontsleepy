import { WebView } from "react-native-webview";

export default function WebViewComponent() {
  return (
    <WebView
      style={{ display: "flex" }}
      source={{ uri: "https://jsso0.github.io/face-detection-app/" }}
    />
  );
}
