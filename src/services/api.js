import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/",
});

// Add a request interceptor to modify the request body
axiosInstance.interceptors.request.use(
  (config) => {
    const predefinedBody = {
      email: localStorage.getItem("email"),
    };

    // Ensure we only modify request body for methods that support a body
    if (["post", "put", "patch"].includes(config.method?.toLowerCase())) {
      config.data = {
        ...predefinedBody, // Include predefined fields
        ...config.data, // Preserve user-defined data
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
