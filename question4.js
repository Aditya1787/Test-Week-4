const express = require("express");
const app = express();

app.use(express.json());

let currentUser = null;


app.post("/login", (req, res) => {
  const { role } = req.body;

  if (role !== "admin" && role !== "client") {
    return res.status(400).json({ message: "Invalid role" });
  }

  currentUser = role;
  res.json({ message: `${role} LoggedIn` });
});


app.get("/dashboard", (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: `Welcome ${currentUser}` });
});


app.get("/logout", (req, res) => {
  currentUser = null;
  res.json({ message: "Logged out successfully" });
});

app.listen(3000, () => console.log("Server running"));