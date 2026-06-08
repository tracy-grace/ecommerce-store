import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
            }}
        >
            <img
                src={product.image}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h4>{product.name}</h4>

            <p>UGX {product.price.toLocaleString()}</p>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}