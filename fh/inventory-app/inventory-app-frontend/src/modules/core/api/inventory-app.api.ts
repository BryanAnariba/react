import axios from "axios";
import { getEnvVars } from "../helpers";

const { VITE_API_URL } = getEnvVars();

const inventoryApp = axios.create({
  baseURL: VITE_API_URL,
});

inventoryApp.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null}`
  }
  return config;
});

export default inventoryApp;