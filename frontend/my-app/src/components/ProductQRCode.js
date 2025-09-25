// src/components/ProductQRCode.js
import React from "react";

const ProductQRCode = ({ qr, link }) => {
  if (!qr) return null;
  return (
    <div style={{ marginTop: "10px" }}>
      <h4>QR Code:</h4>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={qr} alt="QR code" width="150" />
      </a>
    </div>
  );
};

export default ProductQRCode;
