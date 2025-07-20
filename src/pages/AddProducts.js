import { useState } from "react";
import { addProduct } from "../services/api";

import { useNavigate } from "react-router-dom";

function AddProducts() {

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productType: "",
    productPrice: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.productPrice || !formData.productType || !imageFile) {
      alert("Please fill all required fields and select an image");
      return;
    }

    // Convert price to number
    const payload = {
      ...formData,
      productPrice: Number(formData.productPrice),
    };

    const form = new FormData();
    form.append("productDTO", JSON.stringify(payload));
    form.append("imageFile", imageFile);


    try {
      await addProduct(form);
      alert('Product added!');
      navigate("/");
    }
    catch (err) {
      console.error("uplad failed:", err);
      alert("Faliled to add product");


    }
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

        <input type="file" accept="image/*" onChange={handleImageChange} /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );

}

export default AddProducts;