const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validation (same as frontend)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  if (!emailRegex.test(username)) {
    return res.status(400).send("Invalid email format.");
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).send("Password does not meet requirements.");
  }

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("User registered successfully.");
  } catch (err) {
    console.error("Registration failed:", err.message);

    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).send("Email already registered.");
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).send("Validation error: " + err.message);
    }

    // Generic fallback
    res.status(500).send("Error registering user: " + err.message);
  }
};
