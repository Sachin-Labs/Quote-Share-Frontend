import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ImageGalleryModal.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ImageGalleryModal = ({ onClose, onSelect }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}images`, {
        withCredentials: true,
      });
      setImages(res.data.data);
    } catch (err) {
      alert("Failed to load images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, or WEBP images are allowed.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("File exceeds 1MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      await axios.post(`${API_BASE_URL}image/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Select or Upload Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <div className="image-grid">
          {images.map((img) => (
            <img
              key={img._id}
              src={img.imageUrl}
              alt="user"
              onClick={() => {
                onSelect(img.imageUrl);
                onClose();
              }}
            />
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
