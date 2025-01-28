import axios from "axios";
import { getEnvVars } from "../../shared";

const { VITE_API_URL } = getEnvVars();

const calendarApp = axios.create({
  baseURL: VITE_API_URL,
});

// Interceptores: a la hora de hacer un request, util para refresh tokens
calendarApp.interceptors.request.use((config) => {
  // console.log(localStorage.getItem("token"))
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null}`;
  }
  return config;
});

export default calendarApp;
