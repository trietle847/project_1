import axios from "axios";

const createAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Thay đổi tùy theo server "http://localhost:3000"
  headers: {
    "Content-Type": "application/json",
  },
});

createAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default createAPI;
