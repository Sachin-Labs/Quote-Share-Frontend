import React from "react";
import { useEffect, useState } from "react";
import { FaClock, FaCheckCircle, FaGlobe } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import "../styles/dashboard.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuotes } from "../slice/quoteSlice";
import { setUser } from "../slice/userSlice";
import { Link } from "react-router";

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const dispatch = useDispatch();

  const quotesData = useSelector((state) => state.quote.quotes);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}verify`, {
          withCredentials: true,
        });
        dispatch(setUser(response.data.user));
      } catch (error) {
        alert("Error fetching user data. Please try again later.");
        console.error("Error fetching user data:", error);
      }
    };
    const getQuotesData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}myQuote`, {
          withCredentials: true,
        });
        dispatch(setQuotes(response.data.data));
      } catch (error) {
        alert("Error fetching user data. Please try again later.");
        console.error("Error fetching user data:", error);
      }
    };
    const getStatsData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}quote-stats`, {
          withCredentials: true,
        });
        setStatsData(response.data.data || {
          total: 0,
          approved: 0,
          pending: 0,
          rejected: 0,
        });
      } catch (error) {
        alert("Error fetching stats data. Please try again later.");
        console.error("Error fetching stats data:", error);
      }
    };
    getStatsData();
    getUserData();
    getQuotesData();
  }, []);

  return (
    <div className="dashboard-page-main-container">
      <h1>Dashboard</h1>
      <p>Here you can view your recent activity and statistics.</p>
      <div className="statistics-container">
        <div className="statistic-item">
          <div>
            <p>Total Quotes</p>
            <h1>{statsData.total}</h1>
          </div>
          <div className="icon-container">
            <FaGlobe style={{ fontSize: "20px" }} />
          </div>
        </div>
        <div className="statistic-item">
          <div>
            <p>Approved</p>
            <h1>{statsData.approved}</h1>
          </div>
          <div className="icon-container">
            <FaCheckCircle style={{ fontSize: "20px" }} />
          </div>
        </div>
        <div className="statistic-item">
          <div>
            <p>Pending Review</p>
            <h1>{statsData.pending}</h1>
          </div>
          <div className="icon-container">
            <FaClock style={{ fontSize: "20px" }} />
          </div>
        </div>
        <div className="statistic-item">
          <div>
            <p>Rejected</p>
            <h1>{statsData.rejected}</h1>
          </div>
          <div className="icon-container">
            <RxCrossCircled style={{ fontSize: "20px" }} />
          </div>
        </div>
      </div>
      <div className="recent-activity-container">
        <h4>My Quotes</h4>
        <ul className="quotes-list">
          {quotesData && quotesData.length > 0 ? (
            quotesData.map((quote) => (
              <li key={quote.id} className="quote-item">
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
                  <div className="status-and-edit">
                    <div className="inner-status-and-edit">
                      <span className={`review ${quote.status}`}>
                        {quote.status}
                      </span>
                      {quote.status !== "approved" && (
                        <Link
                          className="edit-button"
                          to={`/quote/edit/${quote.id}`}
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                    {(quote.adminComment && quote.status === "rejected") && (
                      <p className="admin-para">
                        Reason for Rejection: <span className="admin-comment">{quote.adminComment}</span>
                      </p>
                    )}
                  </div>
                </div>
                <p className="quote-text">"{quote.quote}"</p>
                <div className="quote-bottom-card">
                  <p className="id">ID: {quote.id}</p>
                  <p className="name-and-created-at">
                    Created At:
                    {new Date(quote.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <div>
              <p>No quotes found.</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
