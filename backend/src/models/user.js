const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String, // The email field should be a string
      required: true, // This field is required
      unique: true, // Ensure the email is unique across the database
      lowercase: true, // Automatically convert the email to lowercase
      trim: true, // Remove any leading or trailing whitespace
      validate(value) {
        // Custom validator for checking valid email format
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email: " + value); // Throws error if email format is invalid
        }
      },
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Method to generate JWT for authentication
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user.id }, "UjjWal@123", {
    expiresIn: "7d",
  });
  return token;
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
