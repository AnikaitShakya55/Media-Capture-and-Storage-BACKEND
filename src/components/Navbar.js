import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl">Media Upload App</div>
        <div>
          <a href="/" className="mx-4">
            Home
          </a>
          <a href="/dashboard" className="mx-4">
            Dashboard
          </a>
          <button
            className="mx-4"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
