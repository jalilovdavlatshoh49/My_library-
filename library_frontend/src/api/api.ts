import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ SET YOUR API URL!
const API_URL = "http://192.168.1.5:5000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;