import React, { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const isAuthenticated = localStorage.getItem("token") || "";
  const loggedInUser = useSelector((state) => state.auth.user);
  const [loader, setLoader] = useState();
  console.log(loggedInUser);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/media/get_media?loggedInUser=${loggedInUser}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch media");
        }
        const data = await response.json();
        console.log(data);
        setMedia(data);
      } catch (error) {
        console.error("Failed to fetch media", error);
      }
    };

    fetchMedia();
  }, [loader, loggedInUser]);

  const deleteMedia = async (id) => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:3002/api/media/delete_media",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loggedInUser, index: id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete media");
      }

      setMedia(media.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete media", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl mb-4">Your Media</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loader &&
            media?.map((item) => (
              <MediaCard
                key={item.id}
                media={item.text}
                onDelete={() => deleteMedia(item.id)}
              />
            ))}
          {loader && <p>Loading....</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
