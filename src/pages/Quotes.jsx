import {
  FaFacebook,
  FaInstagram,
  FaInfoCircle,
  FaEdit,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import ImageGalleryModal from "../components/ImageGalleryModal";
import axios from "axios";
import "../styles/quotes.css";
import { useNavigate, useParams } from "react-router";

const Quotes = ({ mode }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    caption: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      website: "",
    },
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [imageUrl, setImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const isEditMode = mode === "edit";

  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`${API_BASE_URL}quote/${id}`, { withCredentials: true })
        .then((res) => {
          const { quote, author, caption, socialLinks, imageUrl } =
            res.data.data;
          // console.log(res.data.data);
          setFormData({ quote, author, caption, socialLinks });
          setImageUrl(imageUrl);
        })
        .catch((err) => {
          console.error("Failed to load quote", err);
          alert("Quote not found or unauthorized");
          navigate("/dashboard");
        });
    }
  }, [mode, id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (
      ["facebook", "instagram", "twitter", "linkedin", "website"].includes(id)
    ) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [id]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageUrl) {
      alert("Please select an image before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        quote: formData.quote,
        author: formData.author,
        caption: formData.caption,
        imageUrl: imageUrl,
        socialLinks: formData.socialLinks,
      };

      const url = isEditMode
        ? `${API_BASE_URL}quote/${id}`
        : `${API_BASE_URL}quote`;

      const method = isEditMode ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: payload,
        withCredentials: true,
      });

      alert("Quote submitted successfully!");
      setFormData({
        quote: "",
        author: "",
        caption: "",
        socialLinks: {
          facebook: "",
          instagram: "",
          twitter: "",
          linkedin: "",
          website: "",
        },
      });
      setImageUrl(null);
    } catch (error) {
      alert(error?.response?.data?.message || "Error submitting quote");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="quotes-page-main-container">
      <h1>{mode === "edit" ? "Edit Your Quote" : "Submit a New Quote"}</h1>
      <p>
        Share your wisdom with the world. Your quote will be reviewed before
        going live.
      </p>
      <div className="quote-form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="quote" className="label">
              Your Quote
            </label>
            <textarea
              id="quote"
              name="quote"
              rows="4"
              placeholder="Enter your quote here..."
              required
              onChange={handleInputChange}
              disabled={isSubmitting}
              value={formData.quote}
            ></textarea>
          </div>
          <div className="author-and-caption-container">
            <div className="form-group">
              <label htmlFor="author" className="label">
                Author Name
              </label>
              <input
                type="text"
                id="author"
                placeholder="Your name or Pen name"
                required
                onChange={handleInputChange}
                disabled={isSubmitting}
                value={formData.author}
              />
            </div>
            <div className="form-group">
              <label htmlFor="caption" className="label">
                Caption/Description
              </label>
              <input
                id="caption"
                type="text"
                placeholder="Brief description about you"
                required
                onChange={handleInputChange}
                disabled={isSubmitting}
                value={formData.caption}
              />
            </div>
          </div>
          {/* <div className="form-group">
            <label htmlFor="image" className="image-upload-wrapper">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="upload-input"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />

              {imageFile || imageUrl ? (
                <>
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                    alt="Uploaded"
                  />
                  <div className="edit-overlay">
                    <FaEdit size={24} />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    lineHeight: "150px",
                    color: "#999",
                  }}
                >
                  Upload
                </div>
              )}
            </label>
          </div> */}
          <div>
            <div
              className="image-preview-wrapper"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            >
              {imageUrl ? (
                <div className="image-hover-container">
                  <img
                    src={imageUrl}
                    alt="Selected"
                    className="image-preview"
                  />
                  <div className="image-hover-overlay">
                    <FaEdit size={20} />
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">Click to upload</div>
              )}
            </div>
            {showModal && (
              <ImageGalleryModal
                onClose={() => setShowModal(false)}
                onSelect={(url) => setImageUrl(url)}
              />
            )}
          </div>
          <label htmlFor="social" className="label">
            Social Media Links
          </label>
          <div className="author-and-caption-container">
            <div className="form-group">
              <div className="social-input">
                <FaFacebook style={{ fontSize: "30px", color: "blue" }} />
                <input
                  type="text"
                  id="facebook"
                  placeholder="Facebook Profile URL"
                  style={{ marginBottom: "0px" }}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.socialLinks.facebook || ""}
                />
              </div>
              <div className="social-input">
                <FaInstagram style={{ fontSize: "30px", color: "#e56969" }} />
                <input
                  type="text"
                  id="instagram"
                  placeholder="Instagram Profile URL"
                  style={{ marginBottom: "0px" }}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.socialLinks.instagram || ""}
                />
              </div>
              <div className="social-input">
                <FaLinkedinIn style={{ fontSize: "30px", color: "darkBlue" }} />
                <input
                  type="text"
                  id="linkedin"
                  placeholder="linkedin Profile URL"
                  style={{ marginBottom: "0px" }}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.socialLinks.linkedin || ""}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="social-input">
                <FaXTwitter style={{ fontSize: "30px", color: "black" }} />
                <input
                  type="text"
                  id="twitter"
                  placeholder="Twitter Profile URL"
                  style={{ marginBottom: "0px" }}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.socialLinks.twitter || ""}
                />
              </div>
              <div className="social-input">
                <BsGlobeCentralSouthAsia
                  style={{ fontSize: "30px", color: "green" }}
                />
                <input
                  type="text"
                  id="website"
                  placeholder="website Profile URL"
                  style={{ marginBottom: "0px" }}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.socialLinks.website || ""}
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="authButton"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Submitting..."
                : mode === "edit"
                ? "Update Quote"
                : "Submit Quote"}
            </button>
          </div>
        </form>
      </div>
      <div className="quote-form-container info-container">
        <div className="info-card">
          <FaInfoCircle style={{ color: "#1E3A8A", fontSize: "32px" }} />
          <h5 className="info-heading">Review Process</h5>
          <p className="info-text">
            Your quote will be reviewed by our team within 24-48 hours. We check
            for quality, originality, and appropriateness. You'll receive a
            notification once your quote is approved and published.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
