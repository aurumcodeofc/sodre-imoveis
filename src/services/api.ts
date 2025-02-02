import axios from "axios"

const api = axios.create({
    baseURL:"https://sodre-imoveis-production.up.railway.app"
});

export default api;