import axios, { AxiosResponse } from "axios";

const AxiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request Interceptor
AxiosInterceptor.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("userToken");
    
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
AxiosInterceptor.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login.");
        window.location.href = "/"; 
      } else if (error.response.status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default AxiosInterceptor;
