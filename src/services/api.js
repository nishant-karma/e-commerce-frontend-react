import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:7070/api",

});

API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Log every successful response
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log error response
    if (error.response) {
      console.error("❌ API Error Response:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        data: error.response.data
      });
    } else {
      console.error("❌ API Error (no response):", error.message);
    }

    return Promise.reject(error); // Still reject so your app handles errors
  }
);


export const initiateSignup = (user) => API.post("/signup", user);
export const verifyOtp = (data) => API.post("/verify", data);

export const loginUser = (credentials) => API.post("/login", credentials);


export const getProducts = () => API.get("/product/all");
export const addProduct = (formData) =>
  API.post("/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMyProducts = () => API.get("/product/myproducts");
export const searchProducts = (params) =>
  API.get("/product/products/search", { params });

export const getProductById = (id) => API.get(`/product/${id}`);



export default API;