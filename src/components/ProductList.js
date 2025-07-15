import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

function ProductList(){
    const [products, setProducts] = useState([]);
      useEffect(() => {
    getProducts()
      .then(res => {
        console.log("API response:", res.data);
        setProducts(res.data); // ✅ Use res.data directly
      })
      .catch(err => {
        console.error("API error:", err);
        setProducts([]); // fallback
      });
  }, []);

    return (
    <div>
      <h3>Products</h3>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map(p => (
            <li key={p.id}>
              <strong>{p.productName}</strong> — {p.productType} — Rs. {p.productPrice}
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
}

export default ProductList;