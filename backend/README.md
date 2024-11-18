mongodb+srv://ujjwalhero03:12345@car.9nrvf.mongodb.net/
saverouter.patch("/savecarinfo/update", async (req, res) => {
try {
// Extract the JWT token from cookies
const token = req.cookies.token;
if (!token) {
return res.status(401).send("Unauthorized: No token provided.");
}

    // Decode the token to get the userId
    const decoded = jwt.verify(token, "UjjWal@123");
    const userId = decoded._id;

    // Extract car details from the request body
    const { title, description, images, tags } = req.body;

    // Create separate update objects for `$set` and `$push`
    const setFields = {};
    const pushFields = {};

    // Add non-array fields to `$set`
    if (title) setFields.title = title;
    if (description) setFields.description = description;

    // Add array fields to `$push`
    if (images) pushFields.images = { $each: images };
    if (tags) pushFields.tags = { $each: tags };

    // Build the update query
    const updateQuery = {};
    if (Object.keys(setFields).length > 0) updateQuery.$set = setFields;
    if (Object.keys(pushFields).length > 0) updateQuery.$push = pushFields;

    // Update the car entry with the userId using findByIdAndUpdate
    const updatedData = await Car.findByIdAndUpdate(
      userId, // Use the userId directly here
      updateQuery, // The combined `$set` and `$push` query
      { new: true, runValidators: true }
    );

    // If no car data found or updated, send an error
    if (!updatedData) {
      return res.status(404).send("Car data not found for the given user.");
    }

    res.status(200).send("Car data updated successfully!");

} catch (err) {
res
.status(500)
.send("An error occurred while updating the car information.");
}
});

saverouter.post("/savecarinfo", async (req, res) => {
try {
// Extract the JWT token from cookies
const token = req.cookies.token;
if (!token) {
return res.status(401).send("Unauthorized: No token provided.");
}

    // Decode the token to get the userId
    const decoded = jwt.verify(token, "UjjWal@123");
    const userId = decoded._id;

    // Extract car details from the request body
    const { title, description, images, tags } = req.body;

    // Fetch the existing car from the database for this user (if any)
    const existingCar = await Car.findOne({ userId });

    if (existingCar) {
      // Logic to add images and tags without exceeding the limit
      let newImages = images || [];
      let newTags = tags || [];

      // If the user provides images, check the current number of images
      if (newImages.length > 0) {
        // Limit the number of images to 10
        newImages = existingCar.images.concat(newImages).slice(0, 10); // Concatenate new images and trim to max of 10
      }

      // If the user provides tags, add them to the existing tags
      if (newTags.length > 0) {
        newTags = existingCar.tags.concat(newTags); // Append the new tags
      }

      // Create a new car object with the updated details
      const updatedCar = {
        title,
        description,
        images: newImages, // Updated images
        tags: newTags, // Updated tags
        userId, // Ensure the userId is correctly associated
      };

      // Update the car data in the database
      await Car.findOneAndUpdate({ userId }, updatedCar, {
        new: true,
        runValidators: true,
      });

      return res.status(200).send({ message: "Car updated successfully!" });
    } else {
      // If the car doesn't exist, create a new one
      const newCar = new Car({
        title,
        description,
        images: images || [], // Default to empty array if no images
        tags: tags || [], // Default to empty array if no tags
        userId, // Associate with the logged-in user
      });

      // Save the new car entry to the database
      const savedCar = await newCar.save();
      return res
        .status(201)
        .send({ message: "Car added successfully!", car: savedCar });
    }

} catch (err) {
console.error("Error saving car data:", err);
res.status(500).send("An error occurred while adding the car.");
}
});

//// SAVECARINFORMATION
saverouter.post("/savecarinfo", async (req, res) => {
try {
// Extract the JWT token from cookies
const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided.");
    }

    // Decode the token to get the userId
    const decoded = jwt.verify(token, "UjjWal@123");
    const userId = decoded._id;

    // Extract car details from the request body
    const { title, description, images, tags } = req.body;
    console.log(req.body);
    // Logic to add images and tags without exceeding the limit

    // Ensure the tags array is not empty or too large, optional logic here

    // // Create a new car document with the user's data
    const newCar = new Car({
      title,
      description,
      images, // Store images (up to 10)
      tags, // Store tags
      userId, // Associate the car with the logged-in user
    });

    // // Save the new car entry to the database
    const savedCar = await newCar.save();

    return res.status(201).send({
      data: newCar,
    });

} catch (err) {
console.error("Error saving car data:", err);
res.status(500).send("An error occurred while adding the car.");
}
});
