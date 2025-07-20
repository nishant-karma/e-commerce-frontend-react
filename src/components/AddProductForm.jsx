import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { addProduct } from "../services/api";
import { useNavigate } from "react-router-dom";




function AddProductForm() {

    const { user } = useAuth();
    const isAdmin = user?.roles?.some(role => role.authority === "ADMIN");
    console.log("User info:", user);



    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        productType: "BEAUTY",
        productPrice: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const navigate = useNavigate();


    if (!user || !isAdmin) {
        return <p className="text-red-500 text-center mt-4">You are not authorized to add products.</p>;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { productName, productDescription, productType, productPrice, image } = formData;

        // Construct productDTO JSON string
        const productDTO = JSON.stringify({
            productName,
            productDescription,
            productType,
            productPrice,
        });

        const formPayload = new FormData();
        formPayload.append("productDTO", productDTO);
        formPayload.append("imageFile", image);

        try {
            const res = await addProduct(formPayload);
            console.log("Product added:", res.data);
            alert("Product added successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Failed to add product");
        }
    };


    return (
        <div className="container mt-4">
            <h3 className="mb-3">Add Product</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                        className="form-select"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                    >
                        <option value="BEAUTY">BEAUTY</option>
                        <option value="CLOTHING">CLOTHING</option>
                        <option value="ELECTRONICS">ELECTRONICS</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Price (Rs)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="productPrice"
                        value={formData.productPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProductForm;
