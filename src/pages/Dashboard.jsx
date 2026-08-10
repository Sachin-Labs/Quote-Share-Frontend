import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Globe, MessageSquareQuote, Sparkles, Hourglass, Ban } from "lucide-react";
import "../styles/dashboard.css";
import "../styles/admin.css"; // Reuse table, filters, segmented pills and footer styles
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuotes } from "../slice/quoteSlice";
import { setUser } from "../slice/userSlice";
import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Linkedin } from "../components/SocialIcons";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const quotesData = useSelector((state) => state.quote.quotes);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Stats for badge counts
  const [statsData, setStatsData] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  // Filter & Pagination States
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [statusFilter, setStatusFilter] = useState("all"); // Default to all
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const getUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}verify`, {
        withCredentials: true,
      });
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getStatsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}quote-stats?personal=true`, {
        withCredentials: true,
      });
      setStatsData(response.data.data || {
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
      });
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };

  const getQuotesData = async (pageVal, limitVal, statusVal, searchVal, sortByVal, sortOrderVal) => {
    try {
      const statusParam = statusVal === "all" ? "" : statusVal;
      const response = await axios.get(
        `${API_BASE_URL}myQuote?page=${pageVal}&limit=${limitVal}&status=${statusParam}&search=${searchVal}&sortBy=${sortByVal}&sortOrder=${sortOrderVal}`,
        { withCredentials: true }
      );
      dispatch(setQuotes(response.data.data));
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching quotes data:", error);
    }
  };

  // Initial loads
  useEffect(() => {
    getUserData();
    getStatsData();
  }, []);

  // Debounced quote query effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getQuotesData(pagination.page, pagination.limit, statusFilter, searchQuery, sortBy, sortOrder);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [pagination.page, pagination.limit, statusFilter, searchQuery, sortBy, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusChange = (statusVal) => {
    setStatusFilter(statusVal);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleLimitChange = (e) => {
    setPagination((prev) => ({ ...prev, page: 1, limit: parseInt(e.target.value) }));
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="dashboard-page-main-container" style={{ maxWidth: "100%", width: "100%" }}>
      <h1>Dashboard</h1>
      <p style={{ marginBottom: "24px" }}>Here you can view your recent activity and statistics.</p>

      {/* Stats Widgets */}
      <div className="statistics-container">
        <div className="statistic-item stat-total">
          <div>
            <p>Total Quotes</p>
            <h1>{statsData.total}</h1>
          </div>
          <div className="icon-container">
            <MessageSquareQuote size={20} />
          </div>
        </div>
        <div className="statistic-item stat-approved">
          <div>
            <p>Approved</p>
            <h1>{statsData.approved}</h1>
          </div>
          <div className="icon-container">
            <Sparkles size={20} />
          </div>
        </div>
        <div className="statistic-item stat-pending">
          <div>
            <p>Pending Review</p>
            <h1>{statsData.pending}</h1>
          </div>
          <div className="icon-container">
            <Hourglass size={20} />
          </div>
        </div>
        <div className="statistic-item stat-rejected">
          <div>
            <p>Rejected</p>
            <h1>{statsData.rejected}</h1>
          </div>
          <div className="icon-container">
            <Ban size={20} />
          </div>
        </div>
      </div>

      {/* Sleek Filters Panel */}
      <div className="admin-filters-bar">
        {/* Quick Search */}
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by quote content, author name, bio..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Segmented Status Pills with Dynamic Counters */}
        <div className="status-pills">
          {[
            { id: "all", label: "All", count: statsData.total },
            { id: "pending", label: "Pending", count: statsData.pending },
            { id: "approved", label: "Approved", count: statsData.approved },
            { id: "rejected", label: "Rejected", count: statsData.rejected }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`status-pill-btn ${statusFilter === tab.id ? "active" : ""}`}
              data-status={tab.id}
              onClick={() => handleStatusChange(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="pill-badge">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabular Interface */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Author Details</th>
              <th>Quote Text & Feedback</th>
              <th>Social Connections</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotesData && quotesData.length > 0 ? (
              quotesData.map((quote) => (
                <tr key={quote.id}>
                  <td>
                    <div className="table-user-cell">
                      <img
                        src={quote.imageUrl}
                        alt="profile"
                        className="table-user-avatar"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="table-user-info">
                        <span className="table-user-name">{quote.author}</span>
                        <span className="table-user-email">{quote.caption}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table-quote-cell">
                      <span className="quote-cell-text">"{quote.quote}"</span>
                      {quote.adminComment && (
                        <span
                          className="quote-cell-comment"
                          style={{
                            color: quote.status === "rejected" ? "var(--t-error)" : "#10b981",
                            fontWeight: 600,
                          }}
                        >
                          {quote.status === "rejected" ? "Rejection Reason: " : "Admin Feedback: "}
                          <span style={{ fontWeight: 400, color: "var(--t-subtle)" }}>
                            {quote.adminComment}
                          </span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <ul className="social-container">
                      {quote.socialLinks &&
                        Object.entries(socialIcons).map(([platform, IconComponent]) => {
                          const link = quote.socialLinks[platform];
                          if (!link) return null;
                          return (
                            <li key={platform} className="each-social">
                              <a
                                href={link.startsWith("http") ? link : `https://${link}`}
                                target="_blank"
                                  rel="noopener noreferrer"
                                title={`${platform}: ${link}`}
                              >
                                <IconComponent size={16} />
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                  <td>
                    <span className={`review ${quote.status}`} style={{ margin: 0 }}>
                      {quote.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-date-cell">
                      {new Date(quote.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td>
                    {quote.status !== "approved" ? (
                      <Link
                        className="edit-button"
                        to={`/quote/edit/${quote.id}`}
                        style={{ display: "inline-flex", textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    ) : (
                      <span style={{ fontSize: "12px", color: "var(--t-muted)", fontStyle: "italic" }}>
                        Locked
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "32px", color: "var(--t-muted)" }}>
                  No quotes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Controls with Sort & View Dropdowns */}
      {pagination.total > 0 && (
        <div className="admin-pagination-bar" style={{ marginTop: "16px" }}>
          <div className="pagination-info">
            Showing{" "}
            <strong>
              {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </strong>{" "}
            of <strong>{pagination.total}</strong> quotes
          </div>

          <div className="pagination-filters">
            <div className="filter-dropdown-group">
              <span className="filter-label">Sort:</span>
              <select className="filter-select" value={sortBy} onChange={handleSortChange}>
                <option value="createdAt">Created Date</option>
                <option value="author">Author Name</option>
              </select>
            </div>

            <div className="filter-dropdown-group">
              <span className="filter-label">Order:</span>
              <select className="filter-select" value={sortOrder} onChange={handleOrderChange}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>

            <div className="filter-dropdown-group">
              <span className="filter-label">Show:</span>
              <select className="filter-select" value={pagination.limit} onChange={handleLimitChange} style={{ minWidth: "90px" }}>
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>

          <div className="pagination-buttons">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="page-indicator">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
