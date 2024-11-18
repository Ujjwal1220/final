// // import React from "react";
// // import axios from "axios";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // import { removeUser } from "../utils/userSlice";
// // import { removeFeed } from "../utils/feedSlice";

// // const NavBar = () => {
// //   const myData = useSelector((store) => store.user);
// //   const nav = useSelector((store) => store.feed);

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const handlelogout = async () => {
// //     try {
// //       const res = await axios.post(
// //         "http://localhost:7777/logout",
// //         {},
// //         {
// //           withCredentials: true,
// //         }
// //       );
// //       dispatch(removeUser());
// //       dispatch(removeFeed());
// //       navigate("/login");
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// //   return (
// //     <div>
// //       <div className="navbar bg-base-300">
// //         <div className="flex-1">
// //           <a className="btn btn-ghost text-xl">spyne</a>
// //         </div>
// //         {nav && (
// //           <div className="flex-none gap-2">
// //             <div className="form-control flex flex-row gap-2">
// //               <input
// //                 type="text"
// //                 placeholder="Search"
// //                 className="input input-bordered w-24 md:w-auto"
// //               />
// //               <button className="btn">Search</button>
// //             </div>
// //             <div className="dropdown dropdown-end">
// //               <div
// //                 tabIndex={0}
// //                 role="button"
// //                 className="btn btn-ghost btn-circle avatar"
// //               >
// //                 <div className="w-10 rounded-full">
// //                   <img
// //                     alt="Tailwind CSS Navbar component"
// //                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxPC94OW09dN21sO0wbxzZiW7LViqE9OtJg&s"
// //                   />
// //                 </div>
// //               </div>
// //               <ul
// //                 tabIndex={0}
// //                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
// //               >
// //                 <li>
// //                   <Link to="/" className="justify-between">
// //                     View Cars
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to="/add">Add Car</Link>
// //                 </li>

// //                 <li>
// //                   <a onClick={handlelogout}>Log Out</a>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavBar;

// import React from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { removeUser } from "../utils/userSlice";
// import { removeFeed } from "../utils/feedSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user); // Check if user is logged in
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:7777/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       dispatch(removeUser());
//       dispatch(removeFeed());
//       navigate("/login");
//     } catch (err) {
//       console.log("Error during logout:", err);
//     }
//   };

//   return (
//     <div className="navbar bg-base-300">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl">
//           spyne
//         </Link>
//       </div>
//       {user && user.Email ? ( // Check if the user is logged in
//         <div className="flex-none gap-2">
//           <div className="form-control flex flex-row gap-2">
//             <input
//               type="text"
//               placeholder="Search"
//               className="input input-bordered w-24 md:w-auto"
//             />
//             <button className="btn">Search</button>
//           </div>
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="User Avatar"
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxPC94OW09dN21sO0wbxzZiW7LViqE9OtJg&s"
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/" className="justify-between">
//                   View Cars
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/add">Add Car</Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Log Out</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//       // ) : (
//       //   <div className="flex-none">
//       //     <Link to="/login" className="btn btn-primary">
//       //       Login
//       //     </Link>
//       //   </div>
//       // )
//       }
//     </div>
//   );
// };

// export default NavBar;

// import React from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { removeUser } from "../utils/userSlice";
// import { removeFeed } from "../utils/feedSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user); // Check if the user is logged in
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:7777/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       dispatch(removeUser());
//       dispatch(removeFeed());
//       navigate("/login");
//     } catch (err) {
//       console.log("Error during logout:", err);
//     }
//   };

//   return (
//     <div className="navbar bg-base-300">
//       {/* Always show the "spyne" logo on the left */}
//       <div className="flex-1">
//         <a className="btn btn-ghost text-xl">spyne</a>
//       </div>
//       {/* Show the rest of the navbar only when the user is logged in */}
//       {user && user.Email && (
//         <div className="flex-none gap-2">
//           <div className="form-control flex flex-row gap-2">
//             <input
//               type="text"
//               placeholder="Search"
//               className="input input-bordered w-24 md:w-auto"
//             />
//             <button className="btn">Search</button>
//           </div>
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img
//                   alt="User Avatar"
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxPC94OW09dN21sO0wbxzZiW7LViqE9OtJg&s"
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/" className="justify-between">
//                   View Cars
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/add">Add Car</Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Log Out</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { addFeed, removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user); // Check if the user is logged in
  const feed = useSelector((store) => store.feed || []); // Get the current feed
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user?.Email);
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery) {
      return; // If search query is empty, do nothing
    }

    const filteredFeed = feed.filter(
      (car) =>
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    dispatch(addFeed(filteredFeed)); // Update the feed with the search results
  };

  return (
    <div className="navbar bg-base-300">
      {/* Always show the "spyne" logo on the left */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">spyne</a>
      </div>

      {/* Show the rest of the navbar only when the user is logged in */}
      {user && user.Email && (
        <div className="flex-none gap-2">
          <div className="form-control flex flex-row gap-2">
            <input
              type="text"
              placeholder="Search by title, description, or tag"
              className="input input-bordered w-24 md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxPC94OW09dN21sO0wbxzZiW7LViqE9OtJg&s"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="justify-between">
                  View Cars
                </Link>
              </li>
              <li>
                <Link to="/add">Add Car</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
