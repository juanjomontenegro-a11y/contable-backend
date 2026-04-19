const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// 🔥 1. CORS SIEMPRE PRIMERO
app.use(cors({
  origin: "https://contable.mexe.com.ar",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// 🔥 2. preflight explícito
app.options("*", cors());

// 🔥 3. JSON parser después de CORS
app.use(express.json());

const SECRET = "1234";

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Backend funcionando correctamente"
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, SECRET);

  res.json({ token });
});

// DASHBOARD
app.get("/dashboard/:id", (req, res) => {
  res.json({
    iva: 150000,
    iibb: 60000,
    sueldos: 220000,
    resultado: 400000
  });
});

// SERVER
app.listen(3000, () => console.log("Server running"));