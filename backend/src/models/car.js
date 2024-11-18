const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../models/user");
const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 100,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    images: {
      type: [String],

      validate: {
        validator: function (images) {
          // Ensure no more than 10 images
          return images.length <= 10;
        },
        message: "You can upload up to 10 images only.",
      },
    },
    tags: {
      type: [String], // Array of tags for the car (e.g., 'SUV', 'luxury', etc.)
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Car model
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
