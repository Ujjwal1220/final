// const mongoose = require("mongoose");
// const validator = require("validator"); // Add this to your model file
// const jwt = require("jsonwebtoken");

// // Define the schema
// const carSchema = new mongoose.Schema(
//   {
//     FirstName: {
//       type: String,
//       minLength: 4,
//       maxLength: 100,
//     },
//     LastName: {
//       type: String,
//     },
//     Email: {
//       type: String,
//       lowercase: true,
//       unique: true,
//       trim: true,
//       validate(value) {
//         // Custom validator for checking valid email format
//         if (!validator.isEmail(value)) {
//           throw new Error("Invalid email: " + value); // Throws error if email format is invalid
//         }
//       },
//     },
//     password: {
//       type: String,
//     },
//     title: {
//       type: String,
//       trim: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     images: {
//       type: [String], // Array of image URLs or paths
//       validate: {
//         validator: function (images) {
//           // Ensure no more than 10 images
//           return images.length <= 10;
//         },
//         // message: "You can upload up to 10 images only.",
//       },
//     },
//     tags: {
//       type: [String], // Array of tags
//       // default: [], // Optional: Default to an empty array
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId, // Referencing the user who owns the car
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// carSchema.methods.getJWT = async function () {
//   const user = this;
//   const token = await jwt.sign({ _id: user.id }, "UjjWal@123", {
//     expiresIn: "7d",
//   });
//   return token;
// };

// // Create the model
// const Car = mongoose.model("Car", carSchema);

// // Export the model
// module.exports = Car;
