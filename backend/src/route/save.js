const express = require("express");
// const Car = require("../models/carinfo"); // Import the Car model
const saverouter = express.Router();
const jwt = require("jsonwebtoken");
const Car = require("../models/car");
const { authentication } = require("../middleware/middleware");

saverouter.post("/savecarinfo", authentication, async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided.");
    }

    const decoded = jwt.verify(token, "UjjWal@123");
    const userId = decoded._id;

    const { title, description, images, inputTags } = req.body;
    // const processedImages = images
    //   ? images.split(",").map((url) => url.trim())
    //   : [];

    const newCar = new Car({
      title,
      description,
      images,
      tags: inputTags ? inputTags.split(",").map((tag) => tag.trim()) : [],
      userId,
    });

    const savedCar = await newCar.save();

    res.status(201).send({
      message: "Car information saved successfully.",
      data: savedCar,
    });
  } catch (err) {
    console.error("Error saving car data:", err);
    res.status(500).send("An error occurred while saving the car data.");
  }
});

saverouter.get("/showusercars", authentication, async (req, res) => {
  try {
    // Extract the JWT token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided.");
    }

    // Decode the token to get the userId
    const decoded = jwt.verify(token, "UjjWal@123");
    const userId = decoded._id;

    // Fetch all cars associated with the logged-in user, selecting only specific fields
    const userCars = await Car.find(
      { userId }, // Filter by userId
      "title description images tags" // Specify the fields to include
    );

    // If no cars found
    if (!userCars || userCars.length === 0) {
      return res.status(404).send("No cars found for this user.");
    }

    // Return the list of cars
    res.status(200).json(userCars);
  } catch (err) {
    console.error("Error retrieving user cars:", err);
    res.status(500).send("An error occurred while retrieving the cars.");
  }
});

saverouter.patch("/updatecar/:id", authentication, async (req, res) => {
  try {
    const token = req.cookies.token; // Extract token from cookies

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided.");
    }

    // Decode the token to get the userId
    const decoded = jwt.verify(token, "UjjWal@123");
    const userId = decoded._id;

    // Extract car ID from the URL parameters and new data from the request body
    const { id } = req.params; // The car's ID to be updated
    const { title, description, images, tags } = req.body;
    let newImages = images || [];

    // Ensure the images array has a maximum of 10 images
    if (newImages.length > 10) {
      return res.status(400).send("You can only upload up to 10 images.");
    }

    // Ensure that the car belongs to the logged-in user
    const car = await Car.findOne({ _id: id, userId });
    if (!car) {
      return res
        .status(404)
        .send("Car not found or you are not authorized to edit this car.");
    }

    // Update the fields if they are provided in the request body
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    if (images && images.length > 0) {
      const combinedImages = car.images.concat(images).slice(0, 10); // Append and trim
      updateFields.images = combinedImages;
    } // Can handle image update logic as needed

    if (tags) updateFields.tags = tags;

    // Perform the update operation
    const updatedCar = await Car.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    // Send success response
    res.status(200).send({ message: "Car updated successfully!", updatedCar });
  } catch (err) {
    console.error("Error updating car:", err);
    res
      .status(500)
      .send("An error occurred while updating the car information.");
  }
});

// saverouter.patch("/updatecarinfo/:id", authentication, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, tags, newImage } = req.body;

//     // Find the car document
//     const car = await Car.findById(id);

//     if (!car) {
//       return res.status(404).send("Car not found.");
//     }

//     // Update only the fields provided
//     if (title) car.title = title;
//     if (description) car.description = description;
//     if (tags) {
//       car.tags = tags.split(",").map((tag) => tag.trim());
//     }
//     if (newImage) {
//       car.images.push(newImage); // Add a new image to the existing images array
//     }

//     const updatedCar = await car.save();

//     res.status(200).send({
//       message: "Car information updated successfully.",
//       data: updatedCar,
//     });
//   } catch (err) {
//     console.error("Error updating car data:", err);
//     res.status(500).send("An error occurred while updating the car data.");
//   }
// });
saverouter.patch("/updatecarinfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, images } = req.body;

    // Find the car document by ID
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).send("Car not found.");
    }

    // Update only the fields that are provided
    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags;

    if (images && Array.isArray(images)) {
      car.images.push(...images); // Spread the array if it's an array of images
    } else if (images && typeof images === "string") {
      car.images.push(images); // If images is a single string, just add it as an image
    }

    const updatedCar = await car.save();

    res.status(200).send({
      message: "Car information updated successfully.",
      data: updatedCar,
    });
  } catch (err) {
    console.error("Error updating car data:", err);
    res.status(500).send("An error occurred while updating the car data.");
  }
});

module.exports = saverouter;
