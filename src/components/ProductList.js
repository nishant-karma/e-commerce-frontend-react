import { useState, useEffect } from "react";
import { getProducts } from "../services/api";

import React from 'react';

function ProductList({ products }) {
  if (!Array.isArray(products)) return <p>Loading or no products available...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow">
             <img
  src={`http://localhost:7070/api/image/${product.imageName}`}
  className="card-img-top"
  alt={product.productName}
  style={{ height: '200px', objectFit: 'cover' }}
  onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
/>

              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <p className="card-text fw-bold">Price: Rs. {product.productPrice}</p>
                <span className="badge bg-primary">{product.productType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
