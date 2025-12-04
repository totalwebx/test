// index.js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node.js on Vercel 🚀");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "nshufu hadshi wash khdam" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
