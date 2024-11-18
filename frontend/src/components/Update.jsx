import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Store image URLs
  const [imageUrl, setImageUrl] = useState(""); // For input field to add a single image URL
  const [inputTags, setInputTags] = useState(""); // Input for tags
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback for user
  const [errorMessage, setErrorMessage] = useState(""); // Error handling feedback

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        "https://final-11-qia4.onrender.com/savecarinfo",
        {
          title,
          description,
          images,
          inputTags,
          userId,
        },
        { withCredentials: true }
      );
      setTitle("");
      setInputTags("");
      setDescription("");
      setImages([]);
      setFeedbackMessage("Car info saved successfully!");
      setErrorMessage("");
      console.log("Car info saved:", res.data);
    } catch (err) {
      setErrorMessage("Error saving car info. Please try again.");
      console.error(err?.response?.data);
    }
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]); // Add the new image URL to the images array
      setImageUrl(""); // Clear the input field
    }
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

        {/* Save Button */}
        <div className="flex mt-4 w-1/2 ml-12 font-bold gap-8">
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>

        {/* Feedback Messages */}
        {feedbackMessage && (
          <p className="text-green-500 mt-2">{feedbackMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
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
        <button className="btn" onClick={handleAddImage}>
          Add Image
        </button>

        {/* Displaying Images */}
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 w-48 shadow-xl"
            >
              <figure>
                <img src={url} alt={`Car Preview ${index + 1}`} />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Update;
