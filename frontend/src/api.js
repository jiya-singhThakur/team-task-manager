import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-2133.up.railway.app/api",
});

// Attach token to every request automatically
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
