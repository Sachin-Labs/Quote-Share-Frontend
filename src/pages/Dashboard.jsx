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
  const [statsData, setStatsData] = useState({});

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
        setStatsData(response.data.data);
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
          <div
            className="icon-container"
            style={{ backgroundColor: "#DBEAFE" }}
          >
            <FaGlobe style={{ fontSize: "20px", color: "#2563EB" }} />
          </div>
        </div>
        <div className="statistic-item">
          <div>
            <p>Approved</p>
            <h1>{statsData.approved}</h1>
          </div>
          <div
            className="icon-container"
            style={{ backgroundColor: "#DCFCE7" }}
          >
            <FaCheckCircle style={{ fontSize: "20px", color: "green" }} />
          </div>
        </div>
        <div className="statistic-item">
          <div>
            <p>Pending Review</p>
            <h1>{statsData.pending}</h1>
          </div>
          <div
            className="icon-container"
            style={{ backgroundColor: "#FFEDD5" }}
          >
            <FaClock style={{ fontSize: "20px", color: "orange" }} />
          </div>
        </div>
        <div className="statistic-item">
          <div>
            <p>Rejected</p>
            <h1>{statsData.rejected}</h1>
          </div>
          <div
            className="icon-container"
            style={{ backgroundColor: "#FEE2E2" }}
          >
            <RxCrossCircled style={{ fontSize: "20px", color: "red" }} />
          </div>
        </div>
      </div>
      <div className="recent-activity-container">
        <h4>My Quotes</h4>
        <ul className="quotes-list">
          {quotesData.length > 0 ? (
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
                   <p className="name-and-created-at">{quote.createdBy}</p>
                  </div>
                </div>
                <div className="status-and-edit">
                <span className={`review ${quote.status}`} >{quote.status}</span>
                <Link className="edit-button" to={`/quote/edit/${quote.id}`}>Edit</Link>
                </div>
                </div>
                <p className="quote-text">"{quote.quote}"</p>
                <div className="quote-bottom-card">
                  <p className="id">ID: {quote.id}</p>
                   <p className="name-and-created-at">Created At: 
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
