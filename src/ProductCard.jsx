import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
                background: "white",
                padding: "12px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "0.2s",
            }}
        >
            {/* PRODUCT IMAGE */}
            <img
                src={product.image}
                alt={product.name}
                style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "10px",
                }}
            />

            {/* NAME */}
            <h4 style={{ margin: "10px 0 5px" }}>
                {product.name}
            </h4>

            {/* RATING */}
            <p style={{ margin: "0", color: "#f39c12" }}>
                ⭐ {product.rating}
            </p>

            {/* DISCOUNT */}
            <p style={{ margin: "5px 0", color: "red" }}>
                🔥 {product.discount}% OFF
            </p>

            {/* PRICE */}
            <p style={{ fontWeight: "bold" }}>
                UGX {product.price.toLocaleString()}
            </p>

            {/* BUTTON */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // prevents opening product page
                    addToCart(product);
                }}
                style={{
                    background: "#ff9900",
                    border: "none",
                    padding: "8px",
                    width: "100%",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}