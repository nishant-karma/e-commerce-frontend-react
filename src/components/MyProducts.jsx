import React, { useEffect, useState } from "react";
import { getMyProducts } from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMyProducts();
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch my products:", err);
            }
        };

        fetchData();
    }, []);

    if (!user) return <p>You need to be logged in to view this page.</p>;

    return (
        <div className="container mt-4">
            <h2>My Products</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img
                                src={`http://localhost:7070/api/image/${product.imageName}`}
                                className="card-img-top"
                                alt={product.productName}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">{product.productDescription}</p>
                                <p><strong>Type:</strong> {product.productType}</p>
                                <p><strong>Price:</strong> Rs. {product.productPrice}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <p>You haven’t posted any products yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyProducts;
