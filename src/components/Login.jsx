import React from "react";
import { useState } from "react";
import axios from "axios";
import { USER } from "../utils/constants";

import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        USER + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (err) {
      // setError(err?.response?.data || "Something went wrong!!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      return setError("All fields are required!");
    }
   
    try {
      const res = await axios.post(
        USER + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
     
      console.log(res.data);
      
      dispatch(addUser(res.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!");
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl bg-gray-800 max-w-4xl w-full">
        {/* Left side image (hidden on small screens) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://media.istockphoto.com/id/1355584056/vector/vector-illustrations-of-futuristic-hi-tech-blue-technology.jpg?s=612x612&w=0&k=20&c=LkHcYwZbmXfQ15EkLbuZno4q7fT6VKLOXQI6ZcxmGeg="
            alt="Tech background"
            className="h-full w-full object-cover brightness-75"
          />
        </div>
        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              {
                isLoginForm ? handleLogin() : handleSignUp();
              }
            }}
          >
            {!isLoginForm && (
              <>
                {" "}
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    placeholder="firstName"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-gray-300 peer-focus:text-sm"
                  >
                    firstName
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    placeholder="lastName"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-gray-300 peer-focus:text-sm"
                  >
                    lastName
                  </label>
                </div>
              </>
            )}
            <div className="relative">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmailId(e.target.value)}
                className="peer h-10 w-full border-b-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-gray-300 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer h-10 w-full border-b-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-gray-300 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <p className="text-red-600">{error}</p>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 text-white text-center text-base font-semibold rounded-lg transition duration-200 shadow"
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
            <div
              className="flex justify-center mt-4 cursor-pointer"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              <p className="">
                {isLoginForm
                  ? " New User? Sign Up"
                  : " Existing user? Login here"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
