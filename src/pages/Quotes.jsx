import React, { useEffect, useState, useRef } from "react";
import { Globe, Info, Sparkles, Upload, Image } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter } from "../components/SocialIcons";
import axios from "axios";
import "../styles/quotes.css";
import "../styles/settings.css"; // Reuse input style definitions
import { useNavigate, useParams } from "react-router";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
};

const Quotes = ({ mode }) => {
  const { id } = useParams();
  const fileInputRef = useRef(null);

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
  const [imagesList, setImagesList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isEditMode = mode === "edit";

  // Fetch preset wallpapers
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}images`, {
        withCredentials: true,
      });
      setImagesList(res.data.data || []);
      // If we don't have an imageUrl yet, set it to the first preset image
      if (res.data.data && res.data.data.length > 0 && !imageUrl && !isEditMode) {
        setImageUrl(res.data.data[0].imageUrl);
      }
    } catch (err) {
      console.error("Failed to load preset images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch single quote detail for edit mode
  useEffect(() => {
    if (isEditMode && id) {
      axios
        .get(`${API_BASE_URL}quote/${id}`, { withCredentials: true })
        .then((res) => {
          const { quote, author, caption, socialLinks, imageUrl } =
            res.data.data;
          setFormData({ quote, author, caption, socialLinks });
          setImageUrl(imageUrl);
        })
        .catch((err) => {
          console.error("Failed to load quote details:", err);
          alert("Quote not found or unauthorized.");
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

  // Upload local image directly from presets bar
  const handleCustomImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_BASE_URL}image/upload`, uploadData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newImgUrl = res.data.data.imageUrl;
      setImageUrl(newImgUrl);
      fetchImages(); // Refresh the list
      alert("Custom image uploaded and applied successfully!");
    } catch (err) {
      console.error("Custom image upload failed:", err);
      alert("Failed to upload custom image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageUrl) {
      alert("Please select a background image before submitting.");
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

      await axios({
        method,
        url,
        data: payload,
        withCredentials: true,
      });

      alert(isEditMode ? "Quote updated successfully!" : "Quote submitted for review successfully!");
      if (!isEditMode) {
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
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Error submitting quote");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = formData.author
    ? formData.author.slice(0, 2).toUpperCase()
    : "Q";

  return (
    <div className="quote-workspace-container">
      {/* Page Header */}
      <div className="quotes-header-section">
        <h1>{isEditMode ? "Edit Insight" : "Write a New Quote"}</h1>
        <p>Draft your quote, customize background wallpapers, and preview tab displays in real time.</p>
      </div>

      {/* Left Column: Clean Form Controls */}
      <div className="workspace-form-column">
        <form onSubmit={handleSubmit} className="quote-editor-form">
          
          {/* Section 1: Author Profile Picture Select */}
          <div className="form-section-card">
            <div className="editor-section-header">
              <h3 className="editor-section-title">1. Author Profile Picture</h3>
              <p className="editor-section-subtitle">Select a pre-vetted avatar or upload a custom profile portrait.</p>
            </div>

            {/* Scrolling Preset Row with Upload button */}
            <div className="wallpaper-scroll-row">
              {/* Hidden file input for uploading custom images */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleCustomImageUpload}
              />
              <button
                type="button"
                className="upload-thumb-btn"
                onClick={triggerFileSelect}
                disabled={isSubmitting}
              >
                <Upload size={18} />
                <span>Upload</span>
              </button>

              {imagesList.map((item) => (
                <div
                  key={item._id}
                  className={`wallpaper-thumb ${imageUrl === item.imageUrl ? "active" : ""}`}
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                  onClick={() => setImageUrl(item.imageUrl)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Quote Content */}
          <div className="form-section-card">
            <div className="editor-section-header">
              <h3 className="editor-section-title">2. Compose Quote</h3>
              <p className="editor-section-subtitle">Keep it clean and inspirational.</p>
            </div>
            <div className="form-group">
              <textarea
                id="quote"
                className="premium-textarea"
                maxLength={500}
                placeholder="Type your quote here... (maximum 500 characters)"
                required
                onChange={handleInputChange}
                disabled={isSubmitting}
                value={formData.quote}
              />
              <div className="char-counter">{formData.quote.length} / 500 characters</div>
            </div>
          </div>

          {/* Section 3: Creator Details */}
          <div className="form-section-card">
            <div className="editor-section-header">
              <h3 className="editor-section-title">3. Author Profile details</h3>
              <p className="editor-section-subtitle">Identify the original creator of this quote.</p>
            </div>

            <div className="inputs-row">
              <div className="form-group">
                <label htmlFor="author" className="settings-field-label">Author Name</label>
                <input
                  type="text"
                  id="author"
                  className="settings-field-input"
                  placeholder="E.g. Elena Vance"
                  required
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.author}
                />
              </div>
              <div className="form-group">
                <label htmlFor="caption" className="settings-field-label">Creator Tagline/Bio</label>
                <input
                  type="text"
                  id="caption"
                  className="settings-field-input"
                  placeholder="E.g. UI/UX Designer"
                  required
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  value={formData.caption}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Verified Connections */}
          <div className="form-section-card">
            <div className="editor-section-header">
              <h3 className="editor-section-title">4. Verify Creator Social Links</h3>
              <p className="editor-section-subtitle">Link your social media to verify creator ownership.</p>
            </div>

            <div className="social-inputs-grid">
              <div className="premium-social-input">
                <Facebook size={16} className="social-input-icon icon-facebook" />
                <input
                  type="text"
                  id="facebook"
                  placeholder="Facebook URL"
                  value={formData.socialLinks.facebook || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="premium-social-input">
                <Instagram size={16} className="social-input-icon icon-instagram" />
                <input
                  type="text"
                  id="instagram"
                  placeholder="Instagram URL"
                  value={formData.socialLinks.instagram || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="premium-social-input">
                <Linkedin size={16} className="social-input-icon icon-linkedin" />
                <input
                  type="text"
                  id="linkedin"
                  placeholder="LinkedIn URL"
                  value={formData.socialLinks.linkedin || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="premium-social-input">
                <Twitter size={16} className="social-input-icon icon-twitter" />
                <input
                  type="text"
                  id="twitter"
                  placeholder="Twitter / X URL"
                  value={formData.socialLinks.twitter || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="premium-social-input" style={{ gridColumn: "1 / -1" }}>
                <Globe size={16} className="social-input-icon icon-website" />
                <input
                  type="text"
                  id="website"
                  placeholder="Website / Portfolio URL"
                  value={formData.socialLinks.website || ""}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button type="submit" className="submit-quote-action-btn" disabled={isSubmitting}>
            {isSubmitting
              ? "Publishing Insight..."
              : isEditMode
              ? "Update Quote"
              : "Submit Quote for Review"}
          </button>

        </form>
      </div>

      {/* Right Column: Live Mockup Card Preview */}
      <div className="workspace-preview-column">
        <span className="column-label">Live Preview Mockup</span>
        <div className="mockup-card-container">
          <div className="mockup-card-overlay" />
          <div className="mockup-quote-mark">“</div>
          <p className="mockup-quote-text" style={{ color: "#ffffff" }}>
            {formData.quote || "The simple things are also the most extraordinary things, and only the wise can see them."}
          </p>
          
          <div className="mockup-footer">
            <div className="mockup-profile">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="mockup-avatar"
                />
              ) : (
                <div className="mockup-avatar">
                  {initials}
                </div>
              )}
              <div className="mockup-profile-info">
                <span className="mockup-author" style={{ color: "#ffffff" }}>
                  {formData.author || "Santiago"}
                </span>
                <span className="mockup-caption" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                  {formData.caption || "Andalusian Shepherd"}
                </span>
              </div>
            </div>

            <div className="mockup-socials">
              {Object.entries(formData.socialLinks).map(([platform, value]) => {
                if (!value) return null;
                const Icon = socialIcons[platform];
                return (
                  <Icon
                    key={platform}
                    size={14}
                    className="mockup-social-icon"
                    style={{ color: "#ffffff" }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Quality Banner */}
        <div className="info-card">
          <Info size={20} className="info-icon" />
          <div>
            <h5 className="info-heading">Vetting Guidelines</h5>
            <p className="info-text">
              Quotes are reviewed for formatting, spelling accuracy, and duplicate checks. Verified socials verify creator authenticity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
