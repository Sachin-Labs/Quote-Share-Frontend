import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuotes } from "../slice/quoteSlice";
import "../styles/admin.css";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";

const socialIcons = {
  facebook: <FaFacebook className="social-icon icon-facebook" />,
  instagram: <FaInstagram className="social-icon icon-instagram" />,
  twitter: <FaXTwitter className="social-icon icon-twitter" />,
  linkedin: <FaLinkedinIn className="social-icon icon-linkedin" />,
  website: <BsGlobeCentralSouthAsia className="social-icon icon-website" />,
};


const Admin = () => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const quotesData = useSelector((state) => state.quote.quotes);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchQuotes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}quotes`, {
        withCredentials: true,
      });
      dispatch(setQuotes(res.data.data));
    } catch (error) {
      alert("Error fetching quotes. Please try again later.");
    }
  };

  const approveQuote = async (id) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_BASE_URL}approve/quote/${id}`,
        { comment },
        { withCredentials: true, validateStatus: () => true }
      );

      if (res.status === 200) {
        alert("Quote approved successfully!");
        await fetchQuotes();
      } else {
        alert(res.data.message || "Failed to approve quote.");
      }
    } catch (error) {
      alert("Error approving quote.");
    } finally {
      setLoading(false);
    }
  };

  const rejectQuote = async (id) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_BASE_URL}reject/quote/${id}`,
        { comment },
        { withCredentials: true, validateStatus: () => true }
      );

      if (res.status === 200) {
        alert("Quote rejected successfully!");
        await fetchQuotes();
      } else {
        alert(res.data.message || "Failed to reject quote.");
      }
    } catch (error) {
      alert("Error rejecting quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="recent-activity-container">
      <h4>My Quotes</h4>
      <ul className="quotes-list">
        {quotesData.length > 0 ? (
          quotesData.map((quote) => (
            <li key={quote._id} className="quote-item">
              <span className={`review ${quote.status}`}>{quote.status}</span>
              <div className="quote-top-card">
                <div className="quote-header">
                  <img
                    src={quote.imageUrl}
                    alt="profile"
                    className="profile-pic"
                  />
                  <div className="quote-details">
                    <h3>{quote.author}</h3>
                    <p className="name-and-created-at">{quote.caption}</p>
                  </div>
                </div>

              </div>

              <p className="quote-text">"{quote.quote}"</p>
              <div className="quote-bottom-card">
                <p className="id">ID: {quote._id}</p>
                <p className="name-and-created-at">
                  Created At:
                  {new Date(quote.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <ul className="social-container">
                {quote.socialLinks &&
                  Object.entries(socialIcons).map(([platform, iconFile]) => {
                    const link = quote.socialLinks[platform];
                    if (!link) return null;
                    return (
                      <li key={platform} className="each-social">
                        <a
                          href={
                            link.startsWith("http") ? link : `https://${link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {iconFile}
                        </a>
                      </li>
                    );
                  })}
              </ul>

              {quote.status === "pending" && (
                <div className="status-and-edit">
                  <div className="comment-container">
                    <label htmlFor={`comment-${quote._id}`}>Admin Comment</label>
                    <textarea
                      id={`comment-${quote._id}`}
                      required
                      placeholder="Leave a comment about this quote..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="action-buttons">
                    <button
                      className="submit-button btn-approve"
                      disabled={loading}
                      onClick={() => approveQuote(quote._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="submit-button btn-reject"
                      disabled={loading}
                      onClick={() => rejectQuote(quote._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <div>
            <p>No quotes found.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Admin;
