import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Store image URLs
  const [imageUrl, setImageUrl] = useState(""); // For input field to add a single image URL
  const [inputTags, setInputTags] = useState(""); // Input for tags
  const [currentCarId, setCurrentCarId] = useState(null); // Track the current car document ID
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const userId = user?._id;
  const carId = feed?.data?._id;
  console.log(carId);
  console.log(userId);
  // const carId
  // Save the car document
  const handleSaveData = async () => {
    // if (!title || !description) {
    //   return alert("Please fill out the title and description.");
    // }

    try {
      const res = await axios.post(
        "http://localhost:7777/savecarinfo",
        {
          title,
          description,
          images: imageUrl,
          inputTags,
          userId,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(addFeed(res.data));
      setCurrentCarId(res.data.data._id); // Store the current document ID
      alert("Car information saved successfully.");
    } catch (err) {
      console.error(err?.response?.data);
    }
  };

  // Add an extra image to the existing car document
  // const handleAddImage = async () => {
  //   // if (!carId) {
  //   //   alert("Please save the car information first.");
  //   //   return;
  //   // }

  //   // if (!imageUrl.trim()) {
  //   //   alert("Image URL cannot be empty.");
  //   //   return;
  //   // }

  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:7777/updatecarinfo/${carId}`,
  //       {
  //         newImage: imageUrl, // Image to be added
  //         title, // Optional: Update the title if needed
  //         description, // Optional: Update the description if needed
  //         tags: inputTags // Optional: Update the tags if needed
  //           ? inputTags.split(",").map((tag) => tag.trim())
  //           : [], // Ensure tags are sent in the correct format
  //       },
  //       { withCredentials: true }
  //     );

  //     setImages(res.data.data.images); // Update the images array
  //     setImageUrl(""); // Clear the input field
  //     console.log("Image added and fields updated (if provided):", res.data);
  //   } catch (err) {
  //     console.error(
  //       "Error adding image or updating fields:",
  //       err?.response?.data
  //     );
  //   }
  // };
  const handleAddImage = async () => {
    // Ensure carId is available
    if (!carId) {
      alert("Please save the car information first.");
      return;
    }

    // Validate that the image URL is provided if it's not optional
    // if (imageUrl.trim() && !imageUrl.startsWith("http")) {
    //   alert("Please provide a valid image URL.");
    //   return;
    // }

    try {
      const res = await axios.patch(
        `http://localhost:7777/updatecarinfo/${carId}`,
        {
          newImage: imageUrl.trim() ? imageUrl : undefined, // Send image only if URL is provided
          title, // Optional field: Send if title is updated
          description, // Optional field: Send if description is updated
          tags: inputTags ? inputTags.split(",").map((tag) => tag.trim()) : [], // Optional tags
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setImages(res.data.data.images); // Update the images array with the response
        setImageUrl(""); // Clear the input field
        console.log("Car updated:", res.data);
        alert("Data Updated");
      } else {
        console.error("Failed to update car:", res.data);
      }
    } catch (err) {
      console.error("Error updating car:", err?.response?.data);
      alert("An error occurred while updating the car.");
    }
  };

  // Clear input fields and prepare for a new car document
  const handleAddNewCar = () => {
    setTitle("");
    setDescription("");
    setImages([]);
    setInputTags("");
    setImageUrl("");
    setCurrentCarId(null); // Clear the current document ID
    alert("Ready to add a new car document.");
  };

  return (
    <div className="flex items-center justify-center h-screen gap-20">
      <div>
        {/* Title */}
        <label className="input input-bordered flex items-center gap-2 mb-8 h-14">
          Title
          <input
            type="text"
            className="grow"
            placeholder="Title of Car"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* Description */}
        <textarea
          className="textarea textarea-bordered mb-4 w-full p-6 text-left align-top"
          placeholder="Description of Car"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Tags */}
        <label className="input input-bordered flex items-center gap-2 h-14">
          Tags
          <input
            type="text"
            className="grow"
            placeholder="Tags"
            value={inputTags}
            onChange={(e) => setInputTags(e.target.value)}
          />
        </label>

        {/* Buttons */}
        <div className="flex mt-4 w-1/2 ml-12 font-bold gap-4">
          <button className="btn" onClick={handleSaveData}>
            Save
          </button>
          <button className="btn" onClick={handleAddImage}>
            Update
          </button>
          <button className="btn" onClick={handleAddNewCar}>
            Ready to Add New Car Info
          </button>
        </div>
      </div>

      <div>
        {/* Add Image by URL */}
        <label className="input input-bordered flex items-center gap-2 h-14 mb-4">
          Image URL
          <input
            type="text"
            className="grow"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        {/* Displaying Images */}
        <div className="card card-compact bg-base-100 w-96 shadow-xl mt-4">
          <figure>
            {images.length > 0 && (
              <img src={images[images.length - 1]} alt="Car Preview" />
            )}
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Add;
