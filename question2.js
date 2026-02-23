const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Validation Middleware
function validateUser(req, res, next) {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and Age are required" });
  }

  next();
}

// POST API with validation
app.post("/users", validateUser, (req, res) => {
  users.push(req.body);
  res.json({ message: "User added successfully", data: req.body });
});

app.listen(3000, () => console.log("Server started"));