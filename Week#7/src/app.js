const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./models/db");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files from src/public
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", authRoutes); // mount backend routes under /api

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
