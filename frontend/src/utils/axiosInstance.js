import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // First check for the admin token
    let token = localStorage.getItem("adminToken");
    // If no admin token, check for teacher token
    if (!token) {
      token = localStorage.getItem("teacherToken");
    }
    
    // If a token is found, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
