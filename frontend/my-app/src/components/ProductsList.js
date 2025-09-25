import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPassport, fetchQRCode, verifyChain } from "../api"; // adjust path if needed

const ProductsList = ({ products }) => {
  if (!products || products.length === 0) return <p>Loading products...</p>;

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "left" }}>
      <h2>Our Ayurveda Products:</h2>
      <ul>
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </ul>
    </div>
  );
};

const ProductItem = ({ product }) => {
  const [passport, setPassport] = useState(null);
  const [qr, setQr] = useState(null);
  const [verified, setVerified] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDetails = async () => {
    setLoading(true);
    const pass = await fetchPassport(product.id);
    setPassport(pass);

    const qrCode = await fetchQRCode(product.id);
    setQr(qrCode.dataUrl);

    const verification = await verifyChain(product.id);
    setVerified(verification.valid ? "✅ Chain intact" : `❌ ${verification.reason}`);
    setLoading(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, backgroundColor: "#f0f0f0" }}
      style={{
        marginBottom: "20px",
        padding: "10px",
        borderRadius: "8px",
        listStyle: "none",
        border: "1px solid #ddd",
      }}
    >
      <strong>{product.name}</strong>: {product.description}
      <br />
      <motion.button
        onClick={loadDetails}
        disabled={loading}
        whileHover={{ scale: 1.05, backgroundColor: "#61dafb", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        style={{ marginTop: "8px" }}
      >
        {loading ? "Loading..." : "Load Details"}
      </motion.button>

      <AnimatePresence>
        {passport && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden", marginTop: "10px", paddingLeft: "10px" }}
          >
            <h4>Supply Chain Events:</h4>
            <ul>
              {passport.chain.map((block, idx) => (
                <li key={idx}>
                  {block.data.type}: {block.data.stage || block.data.note} by {block.data.actor}
                </li>
              ))}
            </ul>

            {qr && (
              <div style={{ marginTop: "10px" }}>
                <h4>QR Code:</h4>
                <img src={qr} alt="QR code" width="150" />
              </div>
            )}

            {verified && (
              <div style={{ marginTop: "10px" }}>
                <strong>Blockchain Verification:</strong> {verified}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default ProductsList;
