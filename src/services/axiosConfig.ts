import axios from "axios";
import api from "./api";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post("https://sodre-imoveis-production.up.railway.app", { refreshToken });

        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Erro ao renovar token", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
