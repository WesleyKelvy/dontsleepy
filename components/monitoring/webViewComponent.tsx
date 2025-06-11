import { WebView } from "react-native-webview";

export default function WebViewComponent() {
  return (
    <WebView
      style={{ display: "flex" }}
      source={{ uri: "https://face-detection-app-pi.netlify.app/" }}
    />
  );
}
