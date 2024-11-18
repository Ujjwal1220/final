import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setisLogin] = useState("true");
  const [error, seterror] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      const res = await axios.post(
        "https://final-11-qia4.onrender.com/login",
        {
          Email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      seterror("");
      navigate("/");
    } catch (err) {
      console.log(err?.response?.data);
      seterror(err?.response?.data);
    }
  };
  const handlesignup = async () => {
    try {
      const res = await axios.post(
        "https://final-11-qia4.onrender.com/signup",
        {
          Email,
          FirstName,
          LastName,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.Email);
      dispatch(addUser(res.data));
      navigate("/add");
    } catch (err) {
      console.log(err?.response?.data);
      seterror(err?.response?.data);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        {isLogin && (
          <div className="flex items-center ">
            <h1 className="mr-2 text-2xl font-bold">FirstName</h1>
            <input
              type="text"
              placeholder="Type here"
              value={FirstName}
              className="border-2 p-1 rounded"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        )}
        {isLogin && (
          <div className="flex items-center ">
            <h1 className="mr-2 text-2xl font-bold">LastName</h1>
            <input
              type="text"
              placeholder="Type here"
              value={LastName}
              className="border-2 p-1 rounded"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center ">
          <h1 className="mr-2 text-2xl font-bold">Email</h1>
          <input
            type="text"
            placeholder="Type here"
            value={Email}
            className="border-2 p-1 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <h1 className="mr-2 text-2xl font-bold">Password</h1>
          <input
            type="text" // Changed to password input type
            placeholder="Type here"
            value={password}
            className="border-2 p-1 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 ">{error}</p>}
        {/* {isLogin && <p className="text-red-600 ">Data Added Successfully</p>} */}
        <div className="flex items-center">
          <button
            className="border-2 border-black p-2 bg-slate-400 rounded-lg shadow-xl"
            onClick={!isLogin ? handlelogin : handlesignup}
          >
            {!isLogin ? "Login" : "Signup"}
          </button>
        </div>

        <p
          className="text-red-600 m-auto cursor-pointer bg-slate-400 font-bold p-2 rounded-xl shadow-lg "
          onClick={() => setisLogin((value) => !value)}
        >
          {isLogin ? "Existing User : Login here" : "New User : Sign Up here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
