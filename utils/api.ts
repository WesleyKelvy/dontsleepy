import axios from "axios";
import { getBaseUrl } from "./base-url";

const api = axios.create({
  baseURL: getBaseUrl(), // Altere para a URL do seu backend se necessário
  // baseURL: "https://dont-sleepy-back.fly.dev",
});

export default api;
