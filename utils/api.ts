import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.109:3000", // Altere para a URL do seu backend se necessário
});

export default api;
