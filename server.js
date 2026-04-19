const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());

// 🔧 CORS CONFIGURADO (ESTO ARREGLA TU ERROR)
app.use(cors({
  origin: "https://contable.mexe.com.ar",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

// 🔧 importante para preflight (OPTIONS)
app.options("*", cors());

const SECRET = "1234";

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