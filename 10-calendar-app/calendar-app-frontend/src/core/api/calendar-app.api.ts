import axios from "axios";
import { getEnvVars } from "../../shared";

const { VITE_API_URL } = getEnvVars();

const calendarApp = axios.create({
    baseURL: VITE_API_URL,
});

// Interceptores:

export const calendarApi = {
    calendarApp,   
}