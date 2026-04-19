const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || "dev_secret_change";

app.use(cors({
  origin: "https://contable.mexe.com.ar",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json());

/* =========================
   🧠 MOCK DB (REEMPLAZABLE)
========================= */

const users = [
  {
    id: "1",
    email: "admin@montenegro.com",
    password: "1234",
    empresaId: "emp1",
    rol: "admin"
  }
];

const empresas = [
  {
    id: "emp1",
    nombre: "Montenegro Consultores",
    cuit: "30-99999999-9"
  }
];

const contabilidad = {
  emp1: {
    iva: 150000,
    iibb: 60000,
    sueldos: 220000,
    resultado: 400000
  }
};

/* =========================
   🔐 AUTH
========================= */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      empresaId: user.empresaId,
      rol: user.rol
    },
    SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

/* =========================
   🧠 MIDDLEWARE AUTH
========================= */

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

/* =========================
   📊 DASHBOARD MULTIEMPRESA
========================= */

app.get("/dashboard", auth, (req, res) => {
  const empresaId = req.user.empresaId;

  const data = contabilidad[empresaId];

  res.json({
    empresa: empresas.find(e => e.id === empresaId),
    datos: data
  });
});

/* =========================
   🧪 HEALTH
========================= */

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* ========================= */

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});