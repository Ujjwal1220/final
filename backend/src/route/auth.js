const express = require("express");
const User = require("../models/user");
const Car = require("../models/car");
const authrouter = express.Router();
const bcrypt = require("bcrypt");
const { validationsignup } = require("../utils/validation");
const jwt = require("jsonwebtoken");

authrouter.post("/signup", async (req, res) => {
  try {
    // Extract data from the request body
    validationsignup(req);
    const { FirstName, LastName, Email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user object
    const Userdata = new User({
      FirstName,
      LastName,
      Email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await Userdata.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 360000),
    });
    res.send(savedUser);
  } catch (err) {
    res.status(400).send("Something Went Wrong" + " " + err.message);
  }
});

authrouter.post("/login", async (req, res) => {
  try {
    const { Email, password } = req.body;

    const valid = await User.findOne({ Email: Email });

    if (!valid) {
      throw new Error("Email ID invalid");
    }

    const isPasswordValid = await bcrypt.compare(password, valid.password);

    if (isPasswordValid) {
      // create jwt token
      const token = await jwt.sign({ _id: valid._id }, "UjjWal@123", {
        expiresIn: "1d",
      });
      console.log(token);
      res.cookie("token", token);

      res.send(valid);
    } else {
      throw new Error("Password is not correct");
    }
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

authrouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});

authrouter.delete("/deletecarinfo/:id", async (req, res) => {
  try {
    // Extract the JWT token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided.");
    }

    // Verify the token to get the logged-in user's ID
    const decoded = jwt.verify(token, "UjjWal@123");
    const loginuserid = decoded._id;

    // Extract the car's ID from the request parameters
    const { id } = req.params;

    // Find and delete the car, ensuring it belongs to the logged-in user
    const car = await Car.findOneAndDelete({ _id: id, userId: loginuserid });

    if (!car) {
      return res
        .status(404)
        .send("Car not found or you are not authorized to delete this car.");
    }

    // If the car was successfully deleted, send a success response
    return res.status(200).send({ message: "Car deleted successfully!", car });
  } catch (err) {
    console.error("Error deleting car:", err);
    return res.status(500).send("An error occurred while deleting the car.");
  }
});

module.exports = authrouter;
