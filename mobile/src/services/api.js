import axios from "axios";
import { getToken } from "../utils/token";

const API = axios.create({
  baseURL: "http://192.168.253.26:3000/api/v1",
});

// add the token before every api request to backend server
API.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
