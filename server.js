const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "1234";

app.post("/login",(req,res)=>{
  const { email } = req.body;

  const token = jwt.sign({ email }, SECRET);

  res.json({ token });
});

app.get("/dashboard/:id",(req,res)=>{
  res.json({
    iva: 150000,
    iibb: 60000,
    sueldos: 220000,
    resultado: 400000
  });
});

app.listen(3000, () => console.log("Server running"));