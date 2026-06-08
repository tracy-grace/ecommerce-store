import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "iPhone 14",
      price: 3500000,
      image:
        "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 8500000,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Sony Headphones",
      price: 450000,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 600000,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          background: "#222",
          color: "white",
        }}
      >
        <h2>My Store</h2>

        <div>
          Cart: {totalItems} | UGX{" "}
          {totalPrice.toLocaleString()}
        </div>
      </header>

      {/* BODY */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* PRODUCTS */}
        <div style={{ flex: 2 }}>
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* CART */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
          <h2>Cart</h2>

          <button onClick={clearCart}>
            Clear Cart
          </button>

          <h3>
            Total: UGX{" "}
            {totalPrice.toLocaleString()}
          </h3>

          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cart.map((item) => (
              <div key={item.id}>
                <p>
                  {item.name} × {item.quantity}
                </p>

                <button
                  onClick={() =>
                    addToCart(item)
                  }
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
        </div>
      </div>
    </div>
  );
}

export default App;