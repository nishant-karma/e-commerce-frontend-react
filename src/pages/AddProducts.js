import { useState } from "react";
import { addProduct } from "../services/api";

import { useNavigate } from "react-router-dom";

function AddProducts(){

    const [formData, setFormData] = useState({
        productName:"",
        productDescription:"",
        productType:"",
        productPrice:"",
    });

    const navigate = useNavigate();

     const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Validate
    if (!formData.productName || !formData.productPrice || !formData.productType) {
      alert("Please fill all required fields.");
      return;
    }

    // Convert price to number
    const payload = {
      ...formData,
      productPrice: Number(formData.productPrice),
    };

    addProduct(payload)
      .then(() => {

        alert("Product added successfully!");
        navigate("/"); // ✅ redirect to Home
      })
      .catch(err => {
        console.error("Error adding product:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="productDescription"
          placeholder="Description"
          value={formData.productDescription}
          onChange={handleChange}
        /><br />

        <input
          type="number"
          name="productPrice"
          placeholder="Price"
          value={formData.productPrice}
          onChange={handleChange}
        /><br />

        <select
          name="productType"
          value={formData.productType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="ELECTRONICS">ElECTRONICS</option>
          <option value="CLOTHING">CLOTHING</option>
          <option value="BEAUTY">BEAUTY</option>
        </select><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );

}

export default AddProducts;