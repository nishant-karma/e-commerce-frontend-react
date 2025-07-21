import React, { useEffect, useState } from "react";
import { getMyProducts } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { BASE_IMAGE_URL } from "../config";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return; // Prevent API call if not logged in

        const fetchData = async () => {
            try {
                const res = await getMyProducts();
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch my products:", err);
                setError("Something went wrong while fetching your products.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (!user) return <p>You need to be logged in to view this page.</p>;
    if (loading) return <p>Loading your products...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>My Products</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product?.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img
                                    src={`${BASE_IMAGE_URL}/${product?.imageName}`}
                                    className="card-img-top"
                                    alt={product?.productName || "Product Image"}
                                    onError={(e) => (e.target.src = "/fallback.png")} // fallback if image fails
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product?.productName}</h5>
                                    <p className="card-text">{product?.productDescription}</p>
                                    <p><strong>Type:</strong> {product?.productType}</p>
                                    <p><strong>Price:</strong> Rs. {product?.productPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You haven’t posted any products yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyProducts;
