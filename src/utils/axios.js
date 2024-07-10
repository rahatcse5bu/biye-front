import axios from "axios";
import { getToken } from "./cookies";
import { baseUrl } from "./url";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
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

// Add a response interceptor to track errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }

    // Optionally, track the error using a tracking service or log it
    // e.g., Sentry, LogRocket, etc.
    // trackError(error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
