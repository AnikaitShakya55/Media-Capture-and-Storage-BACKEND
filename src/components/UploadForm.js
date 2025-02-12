import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

const UploadForm = () => {
  const [imageBase64, setImageBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const loggedInUser = useSelector((state) => state.auth.user);

  // DROPPING THE FILES
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      resizeAndConvertToBase64(file);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Function to resize and convert image to Base64
  const resizeAndConvertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 300;
        const scaleSize = maxWidth / img.width;
        const newHeight = img.height * scaleSize;

        canvas.width = maxWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, maxWidth, newHeight);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setImageBase64(compressedBase64);
      };
    };
  };

  const uploadFile = async () => {
    if (!imageBase64) return;

    try {
      const response = await fetch("http://localhost:3002/api/media/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageBase64, fileName, loggedInUser }),
      });

      const data = await response.json();
      alert(`Upload successful! File ID: ${data}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-8 mb-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-xl">Drag & Drop an Image Here or Click to Upload</p>
      </div>
      {imageBase64 && (
        <div className="mt-4">
          <p>File ready for upload:</p>
          <p className="text-sm">{fileName}</p>
          <img
            src={imageBase64}
            alt="Preview"
            className="mt-2 w-40 h-40 object-cover"
          />
        </div>
      )}
      <button
        onClick={uploadFile}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadForm;
