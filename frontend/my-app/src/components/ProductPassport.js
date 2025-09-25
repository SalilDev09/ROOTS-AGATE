// src/components/ProductPassport.js
import React, { useEffect, useState } from "react";
import { fetchPassport, fetchQRCode, verifyChain } from "../api";
import ProductEvents from "./ProductEvents";
import ProductQRCode from "./ProductQRCode";

const ProductPassport = ({ productId }) => {
  const [passport, setPassport] = useState(null);
  const [qr, setQr] = useState(null);
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      const pass = await fetchPassport(productId);
      setPassport(pass);

      const qrCode = await fetchQRCode(productId);
      setQr(qrCode?.dataUrl);

      const verification = await verifyChain(productId);
      setVerified(verification.valid ? "✅ Chain intact" : `❌ ${verification.reason}`);
    };
    loadDetails();
  }, [productId]);

  if (!passport) return <p>Loading details...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "15px" }}>
      <h3>{passport.product.name} - Details</h3>
      <ProductEvents chain={passport.chain} />
      <ProductQRCode qr={qr} link={`/products/${productId}/passport`} />
      <p><strong>Blockchain Verification:</strong> {verified}</p>
    </div>
  );
};

export default ProductPassport;
