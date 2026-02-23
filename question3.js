const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

// Visit Route
app.get("/visit", (req, res) => {
  let visitCount = req.cookies.visitCount;

  if (!visitCount) {
    visitCount = 1;
  } else {
    visitCount = parseInt(visitCount) + 1;
  }

  res.cookie("visitCount", visitCount);
  res.json({
    message: `You have visited this page ${visitCount} times`
  });
});

// Reset Route
app.get("/reset", (req, res) => {
  res.clearCookie("visitCount");
  res.json({ message: "Visit count reset" });
});

app.listen(3000, () => console.log("Server running"));