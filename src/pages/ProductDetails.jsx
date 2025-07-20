import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { getProductById } from "../services/api";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Failed to fetch product", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <h2>{product.productName}</h2>
            <img src={`http://localhost:7070/api/image/${product.imageName}`} className="img-fluid" alt={product.name} />
            <p>{product.productDescription}</p>
            <p><strong>Type:</strong> {product.productType}</p>
            <p><strong>Price:</strong> ${product.productPrice}</p>
        </div>
    );
};

export default ProductDetails;
