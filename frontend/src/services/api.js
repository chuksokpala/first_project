import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const rawUser = localStorage.getItem("auth_user");
  if (rawUser) {
    const user = JSON.parse(rawUser);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default api;
