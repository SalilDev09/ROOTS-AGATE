import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchProducts } from "./api";
import ProductsList from "./components/ProductsList"; // Modular component
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="App">
      {/* Animated header */}
      <motion.header
        className="App-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo: spinning, floating, scaling */}
        <motion.img
          src="/logo192.png"
          className="App-logo"
          alt="logo"
          animate={{
            rotate: [0, 360],
            y: [0, -15, 0, 15, 0],
            scale: [1, 1.2, 1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
          🌿 Blockchain + AI Ayurveda Traceability
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.7, 1, 0.7], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Welcome to our SIH Hackathon project 🚀
        </motion.p>

        {/* Animated Button */}
        <motion.button
          className="animated-btn"
          whileHover={{
            scale: 1.1,
            backgroundColor: "#61dafb",
            color: "#000",
            boxShadow: "0 0 20px rgba(97, 218, 251, 0.9)",
          }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -5, 0, 5, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Get Started
        </motion.button>
      </motion.header>

      {/* Products List Component */}
      <motion.main
        style={{ marginTop: "40px", textAlign: "center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ProductsList products={products} />
      </motion.main>
    </div>
  );
}

export default App;
