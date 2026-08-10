import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuotes } from "../slice/quoteSlice";
import "../styles/admin.css";
import { Globe, Check, XCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Facebook, Instagram, Twitter, Linkedin } from "../components/SocialIcons";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
};

const Admin = () => {
  const [comment, setComment] = useState("");
  const [activeQuoteId, setActiveQuoteId] = useState(null);
  const [actionType, setActionType] = useState(""); // "approve" | "reject"
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Stats for badge counts
  const [statsData, setStatsData] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    total: 0
  });

  // Filter & Pagination States
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [statusFilter, setStatusFilter] = useState("pending"); // Default to pending
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const dispatch = useDispatch();
  const quotesData = useSelector((state) => state.quote.quotes);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}quote-stats`, {
        withCredentials: true,
      });
      setStatsData(res.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchQuotes = async (pageVal, limitVal, statusVal, searchVal, sortByVal, sortOrderVal) => {
    try {
      const statusParam = statusVal === "all" ? "" : statusVal;
      const res = await axios.get(
        `${API_BASE_URL}quotes?page=${pageVal}&limit=${limitVal}&status=${statusParam}&search=${searchVal}&sortBy=${sortByVal}&sortOrder=${sortOrderVal}`,
        { withCredentials: true }
      );
      dispatch(setQuotes(res.data.data));
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Initial fetch and debounce fetch trigger
  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchQuotes(pagination.page, pagination.limit, statusFilter, searchQuery, sortBy, sortOrder);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [pagination.page, pagination.limit, statusFilter, searchQuery, sortBy, sortOrder]);

  const approveQuote = async (id, finalComment) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_BASE_URL}approve/quote/${id}`,
        { comment: finalComment },
        { withCredentials: true, validateStatus: () => true }
      );

      if (res.status === 200) {
        alert("Quote approved successfully!");
        await fetchStats();
        await fetchQuotes(pagination.page, pagination.limit, statusFilter, searchQuery, sortBy, sortOrder);
      } else {
        alert(res.data.message || "Failed to approve quote.");
      }
    } catch (error) {
      alert("Error approving quote.");
    } finally {
      setLoading(false);
      setShowModal(false);
      setActiveQuoteId(null);
      setComment("");
    }
  };

  const rejectQuote = async (id, finalComment) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_BASE_URL}reject/quote/${id}`,
        { comment: finalComment },
        { withCredentials: true, validateStatus: () => true }
      );

      if (res.status === 200) {
        alert("Quote rejected successfully!");
        await fetchStats();
        await fetchQuotes(pagination.page, pagination.limit, statusFilter, searchQuery, sortBy, sortOrder);
      } else {
        alert(res.data.message || "Failed to reject quote.");
      }
    } catch (error) {
      alert("Error rejecting quote.");
    } finally {
      setLoading(false);
      setShowModal(false);
      setActiveQuoteId(null);
      setComment("");
    }
  };

  const handleActionClick = (id, type) => {
    setActiveQuoteId(id);
    setActionType(type);
    setComment("");
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert(`Please provide a comment for ${actionType === "approve" ? "approval" : "rejection"}.`);
      return;
    }
    if (actionType === "approve") {
      approveQuote(activeQuoteId, comment);
    } else {
      rejectQuote(activeQuoteId, comment);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
    <div className="recent-activity-container" style={{ maxWidth: "100%", width: "100%", padding: "0 8px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px", color: "var(--t-bright)" }}>
        Moderation Workspace
      </h2>

      {/* Sleek Filters Panel */}
      <div className="admin-filters-bar">
        {/* Quick Search */}
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by quote, author, bio..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Segmented Status Pills with Dynamic Counters */}
        <div className="status-pills">
          {[
            { id: "pending", label: "Pending", count: statsData.pending },
            { id: "approved", label: "Approved", count: statsData.approved },
            { id: "rejected", label: "Rejected", count: statsData.rejected },
            { id: "all", label: "All", count: statsData.total }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`status-pill-btn ${statusFilter === tab.id ? "active" : ""}`}
              data-status={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
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
              <th>Creator</th>
              <th>Author Details</th>
              <th>Quote Text</th>
              <th>Social Connections</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Moderation Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotesData.length > 0 ? (
              quotesData.map((quote) => {
                const creatorName = quote.createdBy?.name || "Anonymous";
                const creatorEmail = quote.createdBy?.emailId || "N/A";
                const initials = creatorName.slice(0, 2).toUpperCase();

                return (
                  <tr key={quote._id}>
                    <td>
                      <div className="table-user-cell">
                        <div className="table-user-avatar">{initials}</div>
                        <div className="table-user-info">
                          <span className="table-user-name">{creatorName}</span>
                          <span className="table-user-email">{creatorEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-user-info">
                        <span className="table-user-name" style={{ fontWeight: "600" }}>
                          {quote.author}
                        </span>
                        <span className="table-user-email">{quote.caption}</span>
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
                            {quote.status === "rejected" ? "Rejection Reason: " : "Feedback: "}
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
                      {quote.status === "pending" ? (
                        <div className="admin-actions">
                          <button
                            className="admin-btn approve-btn"
                            disabled={loading}
                            onClick={() => handleActionClick(quote._id, "approve")}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            className="admin-btn reject-btn"
                            disabled={loading}
                            onClick={() => handleActionClick(quote._id, "reject")}
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "var(--t-muted)", fontStyle: "italic" }}>
                          Moderated
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "var(--t-muted)" }}>
                  No quotes match the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Controls with Sort & View Dropdowns */}
      {pagination.total > 0 && (
        <div className="admin-pagination-bar">
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

      {/* Moderation Comment Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => { if (!loading) { setShowModal(false); setComment(""); } }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{actionType === "approve" ? "Approve Quote" : "Reject Quote"}</h3>
            <p>
              {actionType === "approve"
                ? "Please add an approval feedback comment for the creator."
                : "Please specify the reason for rejecting this quote. This reason will be shared with the creator."}
            </p>

            <form onSubmit={handleModalSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <textarea
                className="admin-modal-textarea"
                placeholder={
                  actionType === "approve"
                    ? "Feedback comment (e.g. Great insight!)"
                    : "Reason for rejection (e.g. Typos, Spam)..."
                }
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <div className="quick-tags-container">
                <span className="quick-tags-label">Quick comment tags:</span>
                <div className="admin-modal-tags">
                  {(actionType === "approve"
                    ? ["Approved", "Great quote!", "Excellent insight", "Beautiful thought"]
                    : ["Inappropriate content", "Typo / Grammar error", "Duplicate quote", "Spam link"]
                  ).map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      className="tag-btn"
                      onClick={() => setComment(reason)}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);
                    setActiveQuoteId(null);
                    setComment("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  style={{
                    backgroundColor: actionType === "approve" ? "#10b981" : "#ef4444",
                  }}
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : actionType === "approve"
                    ? "Confirm Approval"
                    : "Confirm Rejection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
