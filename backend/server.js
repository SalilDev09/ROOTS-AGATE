// backend/server.js
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* ------------------------------
   Helpers
------------------------------- */
// SHA256 hash
function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Block factory
function createBlock(index, previousHash, data) {
  const timestamp = new Date().toISOString();
  const raw = JSON.stringify({ index, previousHash, timestamp, data });
  const hash = sha256(raw);
  return { index, previousHash, timestamp, data, hash };
}

/* ------------------------------
   In-memory stores
------------------------------- */
let products = [];   // [{ id, name, description }]
let chains = {};     // { productId: [blocks...] }

/* ------------------------------
   Routes
------------------------------- */

// Create a new product + genesis block
app.post("/products", (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });

  const id = products.length + 1;
  const product = {
    id,
    name,
    description: description || "",
    createdAt: new Date().toISOString(),
  };
  products.push(product);

  // Genesis block
  const genesisData = {
    type: "GENESIS",
    actor: "SYSTEM",
    note: "Product created",
    productMeta: { id, name, description },
  };
  const genesis = createBlock(0, "0", genesisData);
  chains[id] = [genesis];

  res.status(201).json({ product, genesis });
});

// List all products
app.get("/products", (req, res) => res.json(products));

// Add supply chain event
app.post("/products/:id/events", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "product not found" });

  const { stage, actor, lat, lng, note, metadata } = req.body;
  if (!stage || !actor) return res.status(400).json({ error: "stage and actor required" });

  const chain = chains[id];
  const previous = chain[chain.length - 1];
  const index = chain.length;
  const data = {
    type: "EVENT",
    stage,
    actor,
    location: lat && lng ? { lat, lng } : null,
    note: note || "",
    metadata: metadata || {},
  };

  const block = createBlock(index, previous.hash, data);
  chain.push(block);

  res.status(201).json(block);
});

// Get product passport (all blocks)
app.get("/products/:id/passport", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "product not found" });

  res.json({ product, chain: chains[id] });
});

// Verify blockchain
app.get("/products/:id/verify", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const chain = chains[id];
  if (!chain) return res.status(404).json({ valid: false, reason: "no chain" });

  for (let i = 1; i < chain.length; i++) {
    const prev = chain[i - 1];
    const curr = chain[i];

    const rawPrev = JSON.stringify({
      index: prev.index,
      previousHash: prev.previousHash,
      timestamp: prev.timestamp,
      data: prev.data,
    });
    if (sha256(rawPrev) !== prev.hash) {
      return res.json({ valid: false, reason: `block ${i - 1} tampered` });
    }

    if (curr.previousHash !== prev.hash) {
      return res.json({ valid: false, reason: `broken at ${i}` });
    }

    const rawCurr = JSON.stringify({
      index: curr.index,
      previousHash: curr.previousHash,
      timestamp: curr.timestamp,
      data: curr.data,
    });
    if (sha256(rawCurr) !== curr.hash) {
      return res.json({ valid: false, reason: `block ${i} hash mismatch` });
    }
  }

  res.json({ valid: true, reason: "chain intact" });
});

// Generate QR code for product passport
app.get("/products/:id/qrcode", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!chains[id]) return res.status(404).json({ error: "product not found" });

  const rootHash = chains[id][0].hash;
  const payload = JSON.stringify({ productId: id, rootHash });

  try {
    const dataUrl = await QRCode.toDataURL(payload);
    res.json({
      dataUrl,
      payload: JSON.parse(payload),
      link: `/products/${id}/passport`,
    });
  } catch (err) {
    res.status(500).json({ error: "QR failed", details: err.message });
  }
});

// Health check
app.get("/", (req, res) => res.send("🚀 Traceability blockchain backend running"));

/* ------------------------------
   Start server
------------------------------- */
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
