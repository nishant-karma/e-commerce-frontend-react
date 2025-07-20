import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar"; // assuming you move SearchBar.jsx to components
import { getProducts, searchProducts } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  const handleSearch = () => {
    searchProducts(filters)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">All Products</h1>
      <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      <ProductList products={products} />
    </div>
  );
};

export default Home;
