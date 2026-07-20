import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "http://192.168.1.13:3000",
  withCredentials: true,
});

export default api;
