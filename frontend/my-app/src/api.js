export const API_URL = "http://localhost:5000/products";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Add supply chain event
export const addEvent = async (productId, event) => {
  try {
    const response = await fetch(`${API_URL}/${productId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding event:", error);
  }
};

// Get product passport
export const fetchPassport = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}/passport`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching passport:", error);
  }
};

// Verify blockchain
export const verifyChain = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}/verify`);
    return await response.json();
  } catch (error) {
    console.error("Error verifying chain:", error);
  }
};

// Get QR code
export const fetchQRCode = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}/qrcode`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching QR code:", error);
  }
};
