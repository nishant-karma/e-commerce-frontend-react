
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Response data is not an array", res.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setProducts([]);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-4">All Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
