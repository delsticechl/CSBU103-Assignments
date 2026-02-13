const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(v) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(v);
      },
      message: props => `Password does not meet complexity requirements`
    }
  }
});

module.exports = mongoose.model("User", userSchema);