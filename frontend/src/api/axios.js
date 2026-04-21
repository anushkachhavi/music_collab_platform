import axios from "axios";

const API = axios.create({
  baseURL: "https://music-collab-platform-08yw.onrender.com/api", // FIXED PORT
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;