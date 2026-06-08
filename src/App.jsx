import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 3500000,
      category: "Phones",
      image:
        "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      price: 8500000,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Sony Headphones",
      price: 450000,
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 600000,
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const categories = ["All", "Phones", "Laptops", "Audio", "Wearables"];

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || p.category === category;

    return matchSearch && matchCategory;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);

    if (item.quantity === 1) {
      setCart(cart.filter((i) => i.id !== id));
    } else {
      setCart(
        cart.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f4f4" }}>
      {/* TOP BAR (Amazon style) */}
      <header
        style={{
          background: "#131921",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#ff9900" }}>MyStore</h2>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "40%",
            padding: "8px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <div>
          🛒 {cart.length} items | UGX{" "}
          {total.toLocaleString()}
        </div>
      </header>

      {/* BODY */}
      <div style={{ display: "flex" }}>
        {/* SIDEBAR (Jumia style) */}
        <aside
          style={{
            width: "200px",
            background: "white",
            padding: "15px",
            height: "100vh",
          }}
        >
          <h3>Categories</h3>

          {categories.map((c) => (
            <p
              key={c}
              onClick={() => setCategory(c)}
              style={{
                cursor: "pointer",
                fontWeight:
                  category === c ? "bold" : "normal",
                color:
                  category === c ? "#ff9900" : "#333",
              }}
            >
              {c}
            </p>
          ))}
        </aside>

        {/* PRODUCTS */}
        <main style={{ flex: 2, padding: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                addToCart={addToCart}
              />
            ))}
          </div>
        </main>

        {/* CART (sidebar like Jumia/Amazon) */}
        <aside
          style={{
            width: "300px",
            background: "white",
            padding: "15px",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <h3>Cart</h3>

          {cart.length === 0 ? (
            <p>No items yet</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>{item.name}</p>
                <p>
                  {item.quantity} × UGX{" "}
                  {item.price.toLocaleString()}
                </p>

                <button
                  onClick={() => addToCart(item)}
                >
                  +
                </button>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  -
                </button>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  );
}