const mongoose = require("mongoose");
require("dotenv").config(); // this loads .env file

const uri = process.env.MONGO_URI; // get the variable

if (!uri) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

module.exports = db;
