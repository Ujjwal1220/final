// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Add = () => {
// const [title, settitle] = useState("");
// const [description, setdescription] = useState("");
// const [images, setImageUrl] = useState([]); // For storing multiple images
// const [tags, settags] = useState([]); // For storing tags
// const [inputtags, setinputtags] = useState(""); // For storing tag input
// const user = useSelector((store) => store.user);
// const userId = user.\_id;
// console.log(userId);
// // Function to handle save operation
// const handlesave = async () => {
// try {
// const res = await axios.post(
// "http://localhost:7777/savecarinfo",
// { withCredentials: true },
// {
// title,
// description,
// images,
// tags, // Pass the tags array here
// userId,
// }
// );
// console.log("Car info saved:", res.data);
// } catch (err) {
// console.log(err?.response?.data);
// }
// };

// // Function to add a tag
// const addTag = () => {
// if (inputtags.trim()) {
// settags([...tags, inputtags.trim()]); // Append new tag to the array
// setinputtags(""); // Clear the input field after adding the tag
// }
// };

// // Function to handle image file change
// const handleFileChange = (event) => {
// const files = event.target.files; // Get the selected files
// if (files) {
// const urls = Array.from(files).map((file) => URL.createObjectURL(file)); // Create URLs for each file
// setImageUrl((prevState) => [...prevState, ...urls]); // Add new image URLs to the array
// }
// };

// return (
// <div className="flex items-center justify-center h-screen gap-20">
// <div>
// <label className="input input-bordered flex items-center gap-2 mb-8 h-14">
// Title
// <input
// type="text"
// className="grow"
// placeholder="Title of Car"
// value={title}
// onChange={(e) => settitle(e.target.value)}
// />
// </label>

// <textarea
// className="textarea textarea-bordered mb-4 w-full p-6 text-left align-top"
// placeholder="Description of Car"
// value={description}
// onChange={(e) => setdescription(e.target.value)}
// ></textarea>

// <label className="input input-bordered flex items-center gap-2 h-14">
// Tags
// <input
// type="text"
// className="grow"
// placeholder="Tags"
// value={inputtags}
// onChange={(e) => setinputtags(e.target.value)}
// />
// </label>

// <div className="flex mt-4 w-1/2 ml-12 font-bold gap-8">
// <button className="btn " onClick={handlesave}>
// Save
// </button>
// <button className="btn ">Update</button>
// </div>
// </div>

// <div>
// {/_ Displaying multiple images _/}
// <div className="card card-compact bg-base-100 w-96 shadow-xl">
// <figure>
// {images.length > 0 && (
// <img src={images[images.length - 1]} alt="Uploaded" />
// )}
// </figure>
// </div>

// {/_ Image file input _/}
// <input
// type="file"
// className="file-input file-input-bordered w-full max-w-xs mt-6 ml-8"
// onChange={handleFileChange}
// multiple // Allow multiple files
// />
// </div>
// </div>
// );
// };

// export default Add;

// const handleAddTag = () => {
// if (inputTags.trim()) {
// setTags([...tags, inputTags.trim()]); // Add the new tag
// setInputTags(""); // Clear the input field
// }
// };

const handleAddExtraImage = async () => {
if (!carId) {
alert("Please save the car information first.");
return;
}

if (!imageUrl.trim()) {
alert("Image URL cannot be empty.");
return;
}

try {
const res = await axios.patch(
`http://localhost:7777/updatecarinfo/${carId}`,
{
newImage: imageUrl, // Image to be added
title, // Optional: Update the title if needed
description, // Optional: Update the description if needed
tags: inputTags // Optional: Update the tags if needed
? inputTags.split(",").map((tag) => tag.trim())
: [], // Ensure tags are sent in the correct format
},
{ withCredentials: true }
);

    setImages(res.data.data.images); // Update the images array
    setImageUrl(""); // Clear the input field
    console.log("Image added and fields updated (if provided):", res.data);

} catch (err) {
console.error("Error adding image or updating fields:", err?.response?.data);
}
};

const handleAddImage = async () => {
// if (!imageUrl.trim()) {
// return alert("Please enter a valid image URL.");
// }

    if (!currentCarId) {
      return alert(
        "Please save the car document first before adding extra images."
      );
    }

    try {
      const res = await axios.patch(
        `http://localhost:7777/updatecarinfo/${currentCarId}`,
        { newImage: imageUrl.trim() },
        { withCredentials: true }
      );
      dispatch(addFeed(res.data));
      setImages([...images, imageUrl.trim()]);
      setImageUrl(""); // Clear the image URL input
      alert("Image added to the car document successfully.");
    } catch (err) {
      console.error(err?.response?.data);
    }

};

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Usercard from "./Usercard";
import { addFeed } from "./utils/feedSlice";
const Feed = () => {
const feed = useSelector((store) => store.feed);
// const dispatch = useDispatch();
const getfeed = async () => {
try {
const res = await axios.get("http://localhost:7777/showusercars", {
withCredentials: true,
});
console.log(res?.response?.data);
dispatch(addFeed(res?.response?.data));
} catch (err) {
console.log(err?.respnse?.data);
}
};
useEffect(() => {
getfeed();
}, []);
const handleinfo = () => {};
return (

<div>
<div className="card card-compact bg-base-100 w-96 shadow-xl mt-6 ml-4">
<figure>
<img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            onClick={handleinfo}
          />
</figure>
</div>
</div>
);
};

export default Feed;
\//////////////

/

//////////
/
/
/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice"; // Assuming this is where you are dispatching the feed

const Feed = () => {
const dispatch = useDispatch();
const feed = useSelector((store) => store.feed || []); // Ensure feed is an array

const [clickedImageId, setClickedImageId] = useState(null); // Track which image was clicked

const getfeed = async () => {
try {
const res = await axios.get("http://localhost:7777/showusercars", {
withCredentials: true,
});

      console.log(res?.data); // Log the response to check the format
      if (Array.isArray(res?.data)) {
        dispatch(addFeed(res?.data)); // Dispatch only if it's an array
      } else {
        console.log("API returned non-array data:", res?.data);
      }
    } catch (err) {
      console.log("Error fetching feed:", err?.response?.data);
    }

};

useEffect(() => {
getfeed();
}, []);

const handleImageClick = (carId) => {
setClickedImageId(carId); // Set the clicked image's carId to show its details
};

const handleGoBack = () => {
setClickedImageId(null); // Reset to show images again
};

return (
<div>
{feed.map((car) => (
<div
          className="card card-compact bg-base-100 w-96 shadow-xl mt-6 ml-4"
          key={car._id}
        >
<figure>
{/_ Show image or car details based on click _/}
{clickedImageId === car.\_id ? (
<div className="card-body">
<h2 className="card-title">{car.title}</h2>
<p>{car.description}</p>
<p>
<strong>Tags:</strong> {car.tags.join(", ")}
</p>
<button className="btn" onClick={handleGoBack}>
Go Back
</button>
</div>
) : (
<img
src={car.images[0]} // Display the first image of the car
alt="Car"
onClick={() => handleImageClick(car.\_id)} // On click, show the car info
/>
)}
</figure>
</div>
))}
</div>
);
};

export default Feed;
# Car-Management-
# Car-Management-
