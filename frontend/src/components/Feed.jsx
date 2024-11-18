// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addFeed } from "../utils/feedSlice"; // Assuming this is where you are dispatching the feed

// // const Feed = () => {
// //   const dispatch = useDispatch();

// //   const feed = useSelector((store) => store.feed || []); // Ensure feed is an array
// //   const [empty, setEmpty] = useState(false);
// //   const [clickedImageId, setClickedImageId] = useState(null); // Track which image was clicked

// //   const getfeed = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:7777/showusercars", {
// //         withCredentials: true,
// //       });

// //       console.log(res?.data); // Log the response to check the format
// //       if (Array.isArray(res?.data)) {
// //         dispatch(addFeed(res?.data)); // Dispatch only if it's an array
// //       } else {
// //         console.log("API returned non-array data:", res?.data);
// //       }
// //     } catch (err) {
// //       console.log("Error fetching feed:", err?.response?.data);
// //     }
// //   };

// //   useEffect(() => {
// //     getfeed();
// //   }, []);
// //   useEffect(() => {
// //     if (feed.length === 0) {
// //       setEmpty(true);
// //     } else {
// //       setEmpty(false);
// //     }
// //   }, [feed]); // Run this effect whenever feed changes

// //   const handleImageClick = (carId) => {
// //     setClickedImageId(carId); // Set the clicked image's carId to show its details
// //   };

// //   const handleGoBack = () => {
// //     setClickedImageId(null); // Reset to show images again
// //   };

// //   // Delete car by id
// //   const handleDeleteCar = async (carId) => {
// //     try {
// //       const token = document.cookie
// //         .split(";")
// //         .find((cookie) => cookie.includes("token="));
// //       if (!token) {
// //         alert("You need to log in to delete the car.");
// //         return;
// //       }

// //       const response = await axios.delete(
// //         `http://localhost:7777/deletecarinfo/${carId}`,
// //         { withCredentials: true }
// //       );

// //       // Check if deletion was successful and remove car from state
// //       if (response.status === 200) {
// //         alert("Car deleted successfully!");
// //         // Dispatch the new feed after deleting the car
// //         const updatedFeed = feed.filter((car) => car._id !== carId);
// //         dispatch(addFeed(updatedFeed)); // Update feed in the state
// //         setClickedImageId(null); // Reset to show images again
// //       }
// //     } catch (err) {
// //       console.error("Error deleting car:", err?.response?.data);
// //       alert("An error occurred while deleting the car.");
// //     }
// //   };

// //   return (
// //     <div className="flex gap-4 flex-wrap">
// //       {empty && (
// //         <div>
// //           <h1 className="flex text-center text-3xl font-bold">
// //             {" "}
// //             CAR COLLECTION IS EMPTY !!!!
// //           </h1>
// //         </div>
// //       )}
// //       {feed.map((car) => (
// //         <div
// //           className="card card-compact bg-base-100 w-96 shadow-xl mt-6 ml-4"
// //           key={car._id}
// //         >
// //           <figure>
// //             {/* Show image or car details based on click */}
// //             {clickedImageId === car._id ? (
// //               <div className="card-body">
// //                 <h2 className="card-title">{car.title}</h2>
// //                 <p>{car.description}</p>
// //                 <p>
// //                   <strong>Tags:</strong> {car.tags.join(", ")}
// //                 </p>
// //                 {/* Delete button */}
// //                 <button
// //                   className="btn btn-danger mt-2"
// //                   onClick={() => handleDeleteCar(car._id)}
// //                 >
// //                   Delete Car
// //                 </button>
// //                 <button className="btn mt-2" onClick={handleGoBack}>
// //                   Go Back
// //                 </button>
// //               </div>
// //             ) : (
// //               <img
// //                 src={
// //                   car.images.length > 0
// //                     ? car.images[0]
// //                     : "https://amanworld.com/images/default_car.jpg"
// //                 } // Display the first image of the car
// //                 alt="Car"
// //                 onClick={() => handleImageClick(car._id)} // On click, show the car info
// //               />
// //             )}
// //           </figure>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Feed;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const feed = useSelector((store) => store.feed || []); // Ensure feed is an array
//   const user = useSelector((store) => store.user);
//   const [clickedImageId, setClickedImageId] = useState(null); // Track which image was clicked
//   const [loading, setLoading] = useState(false); // Manage loading state
//   const [error, setError] = useState(null); // Manage errors

//   // Fetch feed data from backend
//   const getFeed = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:7777/showusercars", {
//         withCredentials: true,
//       });

//       if (Array.isArray(res?.data)) {
//         dispatch(addFeed(res?.data)); // Dispatch data if valid
//       } else {
//         setError("Unexpected data format from API.");
//       }
//     } catch (err) {
//       // setError("Failed to load car feed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   // Handle image click to show car details
//   const handleImageClick = (carId) => {
//     setClickedImageId(carId);
//   };

//   // Handle delete car functionality
//   const handleDeleteCar = async (carId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:7777/deletecarinfo/${carId}`,
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         alert("Car deleted successfully!");
//         const updatedFeed = feed.filter((car) => car._id !== carId);
//         dispatch(addFeed(updatedFeed));
//         setClickedImageId(null);
//       }
//     } catch (err) {
//       alert(
//         err?.response?.data?.message ||
//           "An error occurred while deleting the car."
//       );
//     }
//   };

//   const handleGoBack = () => {
//     setClickedImageId(null);
//   };

//   // Utility to get the car image or default image
//   const getCarImage = (car) => {
//     return car.images.length > 0
//       ? car.images[0]
//       : "https://amanworld.com/images/default_car.jpg";
//   };

//   return (
//     <div className="p-4">
//       {loading && <div className="text-center text-gray-500">Loading...</div>}
//       {error && <div className="text-center text-red-500">{error}</div>}
//       {feed.length === 0 && !loading && !error && (
//         <div className="text-center text-3xl font-bold mt-6">
//           CAR COLLECTION IS EMPTY!
//         </div>
//       )}

//       <div className="flex flex-wrap gap-6 justify-center">
//         {feed.map((car) => (
//           <div
//             className="card bg-white shadow-lg rounded-lg w-80 p-4"
//             key={car._id}
//           >
//             <figure>
//               {clickedImageId === car._id ? (
//                 <div className="card-body space-y-3">
//                   <h2 className="text-xl font-bold">{car.title}</h2>
//                   <p className="text-gray-600">{car.description}</p>
//                   <p className="text-sm text-gray-500">
//                     <strong>Tags:</strong> {car.tags.join(", ")}
//                   </p>
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                       onClick={() => handleDeleteCar(car._id)}
//                     >
//                       Delete Car
//                     </button>
//                     <button
//                       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//                       onClick={handleGoBack}
//                     >
//                       Go Back
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <img
//                   src={getCarImage(car)}
//                   alt="Car"
//                   className="rounded-lg cursor-pointer"
//                   onClick={() => handleImageClick(car._id)}
//                 />
//               )}
//             </figure>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import { useNavigate } from "react-router-dom";

// const Feed = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const feed = useSelector((store) => store.feed || []); // Ensure feed is an array
//   const user = useSelector((store) => store.user); // Get logged-in user data
//   const [clickedImageId, setClickedImageId] = useState(null); // Track which image was clicked
//   const [loading, setLoading] = useState(false); // Manage loading state
//   const [error, setError] = useState(null); // Manage errors

//   // Redirect to login if user is not logged in
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   // Fetch feed data from backend
//   const getFeed = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:7777/showusercars", {
//         withCredentials: true,
//       });

//       if (Array.isArray(res?.data)) {
//         dispatch(addFeed(res?.data)); // Dispatch data if valid
//       } else {
//         setError("Unexpected data format from API.");
//       }
//     } catch (err) {
//       setError("Failed to load car feed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   // Handle image click to show car details
//   const handleImageClick = (carId) => {
//     setClickedImageId(carId);
//   };

//   // Handle delete car functionality
//   const handleDeleteCar = async (carId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:7777/deletecarinfo/${carId}`,
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         alert("Car deleted successfully!");
//         const updatedFeed = feed.filter((car) => car._id !== carId);
//         dispatch(addFeed(updatedFeed));
//         setClickedImageId(null);
//       }
//     } catch (err) {
//       alert(
//         err?.response?.data?.message ||
//           "An error occurred while deleting the car."
//       );
//     }
//   };

//   const handleGoBack = () => {
//     setClickedImageId(null);
//   };

//   // Utility to get the car image or default image
//   const getCarImage = (car) => {
//     return car.images.length > 0
//       ? car.images[0]
//       : "https://amanworld.com/images/default_car.jpg";
//   };

//   return (
//     <div className="p-4">
//       {loading && <div className="text-center text-gray-500">Loading...</div>}
//       {error && <div className="text-center text-red-500">{error}</div>}
//       {feed.length === 0 && !loading && !error && (
//         <div className="text-center text-3xl font-bold mt-6">
//           CAR COLLECTION IS EMPTY!
//         </div>
//       )}

//       <div className="flex flex-wrap gap-6 justify-center">
//         {feed.map((car) => (
//           <div
//             className="card bg-white shadow-lg rounded-lg w-80 p-4"
//             key={car._id}
//           >
//             <figure>
//               {clickedImageId === car._id ? (
//                 <div className="card-body space-y-3">
//                   <h2 className="text-xl font-bold">{car.title}</h2>
//                   <p className="text-gray-600">{car.description}</p>
//                   <p className="text-sm text-gray-500">
//                     <strong>Tags:</strong> {car.tags.join(", ")}
//                   </p>
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                       onClick={() => handleDeleteCar(car._id)}
//                     >
//                       Delete Car
//                     </button>
//                     <button
//                       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//                       onClick={handleGoBack}
//                     >
//                       Go Back
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <img
//                   src={getCarImage(car)}
//                   alt="Car"
//                   className="rounded-lg cursor-pointer"
//                   onClick={() => handleImageClick(car._id)}
//                 />
//               )}
//             </figure>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed || []); // Ensure feed is an array
  const user = useSelector((store) => store.user); // Get logged-in user data
  const [clickedImageId, setClickedImageId] = useState(null); // Track which image was clicked
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(null); // Manage errors

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch feed data from backend
  const getFeed = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:7777/showusercars", {
        withCredentials: true,
      });

      const data = Array.isArray(res?.data) ? res.data : [];
      dispatch(addFeed(data)); // Dispatch data if valid
    } catch (err) {
      // setError("Failed to load car feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Handle image click to show car details
  const handleImageClick = (carId) => {
    setClickedImageId(carId);
  };

  // Handle delete car functionality
  const handleDeleteCar = async (carId) => {
    try {
      const res = await axios.delete(
        `http://localhost:7777/deletecarinfo/${carId}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Car deleted successfully!");
        const updatedFeed = feed.filter((car) => car._id !== carId);
        dispatch(addFeed(updatedFeed));
        setClickedImageId(null);
      }
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "An error occurred while deleting the car."
      );
    }
  };

  const handleGoBack = () => {
    setClickedImageId(null);
  };

  // Utility to get the car image or default image
  const getCarImage = (car) => {
    return car.images.length > 0
      ? car.images[0]
      : "https://amanworld.com/images/default_car.jpg";
  };

  return (
    <div className="p-4">
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {feed.length === 0 && !loading && !error && (
        <div className="text-center text-3xl font-bold mt-6">
          CAR COLLECTION IS EMPTY!
        </div>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {Array.isArray(feed) &&
          feed.map((car) => (
            <div
              className="card bg-white shadow-lg rounded-lg w-80 p-4"
              key={car._id}
            >
              <figure>
                {clickedImageId === car._id ? (
                  <div className="card-body space-y-3">
                    <h2 className="text-xl font-bold">{car.title}</h2>
                    <p className="text-gray-600">{car.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Tags:</strong> {car.tags.join(", ")}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        onClick={() => handleDeleteCar(car._id)}
                      >
                        Delete Car
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onClick={handleGoBack}
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getCarImage(car)}
                    alt="Car"
                    className="rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(car._id)}
                  />
                )}
              </figure>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feed;
