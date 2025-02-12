import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/store";
import { useNavigate } from "react-router-dom";

const ToggleForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("token") || "";
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isAuthenticated !== "") {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        dispatch(login({ user: data.user, token: data.token }));
        navigate("/home");
      } else {
        alert(`Login Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login.");
    } finally {
      setLoader(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful! You can now login.");
        setIsLogin(true);
      } else {
        alert(`Registration Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred during registration.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center drop-shadow-lg">
        Media Capture and Storage Web Application
      </h1>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-6 text-lg font-semibold rounded-full transition-all ${
              isLogin
                ? "bg-white text-blue-600 shadow-md"
                : "text-white border border-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-6 text-lg font-semibold rounded-full transition-all ${
              !isLogin
                ? "bg-white text-blue-600 shadow-md"
                : "text-white border border-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 w-full border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/80"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loginPassword"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/80"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all"
            >
              {loader ? "Loading..." : "Login"}
            </button>
          </form>
        ) : (
          // Sign Up Form
          <form className="space-y-6" onSubmit={handleSignupSubmit}>
            <div>
              <label
                htmlFor="signupEmail"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 w-full border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/80"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-3 w-full border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/80"
                placeholder="Enter your Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="signupPassword"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="signupPassword"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/80"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-white/40 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/80"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all"
            >
              {loader ? "Loading..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ToggleForm;
