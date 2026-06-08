function ProductCard({ product, addToCart }) {
    return (
        <div
            style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
            }}
        >
            <img
                src={product.image}
                alt={product.name}
                style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}
            />

            <h3>{product.name}</h3>

            <p>UGX {product.price.toLocaleString()}</p>

            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;