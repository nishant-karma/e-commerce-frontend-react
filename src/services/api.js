import axios  from "axios";

const API = axios.create({
    baseURL:"http://localhost:7070/api",

});

export const getProducts = ()=> API.get("/product/all");
export const addProduct = (productData) =>
  API.post("/product/add", JSON.stringify(productData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
export default API;