import axios from "axios";
import { getToken } from "./cookies";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url.com", // Replace with your API base URL
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()?.token; // Replace with your token storage logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
