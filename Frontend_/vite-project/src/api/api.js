import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5555",
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => api.post("/api/auth/login", data),
  register: (data) => api.post("/api/auth/register", data)
};

export const bookAPI = {
  getAll: () => api.get("/api/book/getAll"),
  buy: (id) => api.post(`/api/book/buy/${id}`),
  sell: (data) => api.post("/api/book/sell", data),
  inventory: () => api.get("/api/book/inventory/getAll"),
  allSold: () => api.get("/api/book/allSoldBooks")
};

export default api;
