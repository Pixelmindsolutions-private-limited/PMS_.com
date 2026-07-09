// utils/AdminVisitors.js
import React, { useState, useEffect } from 'react';
import {
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Chrome,
  Apple,
  Search,
  RefreshCw,
  Eye,
  X,
  Clock,
  Activity,
  TrendingUp,
  MapPin,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { BiWindows } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const API_URL = "https://pms-tracker-2.onrender.com";

const AdminVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    unique: 0,
    countries: []
  });
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [ipDetails, setIpDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "Pixelmind@25") {
      setIsAuthenticated(true);
      setPasswordError('');
      setPassword('');
    } else {
      setPasswordError('Invalid password. Please try again.');
      setPassword('');
    }
  };


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch visitors data
  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/visitors?limit=1000`);
      const data = await response.json();

      let visitorsData = [];
      if (Array.isArray(data)) {
        visitorsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        visitorsData = data.data;
      } else if (data.visitors && Array.isArray(data.visitors)) {
        visitorsData = data.visitors;
      } else {
        visitorsData = [];
      }

      setVisitors(visitorsData);

      const today = new Date().toDateString();
      const todayCount = visitorsData.filter(v =>
        new Date(v.createdAt).toDateString() === today
      ).length || 0;

      const uniqueIPs = new Set(visitorsData.map(v => v.ip).filter(Boolean)).size;

      const countryMap = {};
      visitorsData.forEach(v => {
        if (v.country) {
          countryMap[v.country] = (countryMap[v.country] || 0) + 1;
        }
      });

      const countries = Object.entries(countryMap)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        total: visitorsData.length || 0,
        today: todayCount,
        unique: uniqueIPs,
        countries
      });

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch visitors:", err);
      setLoading(false);
    }
  };

  const fetchIpDetails = async (ip) => {
    try {
      setIpDetails(null);
      const response = await fetch(`${API_URL}/api/ip-details/${ip}`);
      const data = await response.json();
      setIpDetails(data);
    } catch (err) {
      console.error("Failed to fetch IP details:", err);
    }
  };

  useEffect(() => {
    fetchVisitors();

    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchVisitors, 30000);
    }

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter, dateRange]);

  // Filter visitors
  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch =
      visitor.ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.browser?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.os?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.page?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (dateRange !== 'all') {
      const now = new Date();
      const visitorDate = new Date(visitor.createdAt);
      const diffDays = Math.floor((now - visitorDate) / (1000 * 60 * 60 * 24));

      switch (dateRange) {
        case 'today':
          if (diffDays > 0) return false;
          break;
        case 'week':
          if (diffDays > 7) return false;
          break;
        case 'month':
          if (diffDays > 30) return false;
          break;
        default:
          break;
      }
    }

    switch (filter) {
      case 'desktop':
        return visitor.device === 'desktop';
      case 'mobile':
        return visitor.device === 'mobile';
      case 'tablet':
        return visitor.device === 'tablet';
      default:
        return true;
    }
  });

  // Pagination calculations
  const totalItems = filteredVisitors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredVisitors.slice(startIndex, endIndex);

  // Pagination controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'mobile':
        return <Smartphone className="h-3 w-3" />;
      case 'tablet':
        return <Tablet className="h-3 w-3" />;
      default:
        return <Laptop className="h-3 w-3" />;
    }
  };

  const getBrowserIcon = (browser) => {
    if (browser?.toLowerCase().includes('chrome')) {
      return <Chrome className="h-3 w-3" />;
    } else if (browser?.toLowerCase().includes('safari')) {
      return <span style={{ fontSize: '12px' }}>🌐</span>;
    } else if (browser?.toLowerCase().includes('firefox')) {
      return <span style={{ fontSize: '12px' }}>🦊</span>;
    }
    return <Globe className="h-3 w-3" />;
  };

  const getOsIcon = (os) => {
    if (os?.toLowerCase().includes('windows')) {
      return <BiWindows className="h-3 w-3" />;
    } else if (os?.toLowerCase().includes('mac')) {
      return <Apple className="h-3 w-3" />;
    } else if (os?.toLowerCase().includes('android')) {
      return <span style={{ fontSize: '12px' }}>🤖</span>;
    } else if (os?.toLowerCase().includes('ios')) {
      return <span style={{ fontSize: '12px' }}>🍎</span>;
    }
    return <Monitor className="h-3 w-3" />;
  };

  const formatTime = (date) => {
    if (!date) return 'N/A';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleViewDetails = (visitor) => {
    setSelectedVisitor(visitor);
    setIsModalOpen(true);
    fetchIpDetails(visitor.ip);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVisitor(null);
    setIpDetails(null);
    document.body.style.overflow = 'auto';
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchVisitors();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted small">Loading visitor data...</p>
        </div>
      </div>
    );
  }

  

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div>
        <section
          className="banner__inner-page bg-image pt-100 pb-100 bg-image"
          style={{
            backgroundImage: `url(${"/assets/images/banner/banner-inner-page.jpg"})`,
          }}
        >
          <div className="container">
            <h2 className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
              Admin Access
            </h2>
            <div className="breadcrumb-list wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
              <Link to="/">Home</Link>
              <span>
                <i className="fa-regular fa-angles-right mx-2" />
                Admin Access
              </span>
            </div>
          </div>
        </section>

        <section className="contact-area pb-20">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-12">
                <div className="password-protection-wrapper p-4 p-md-5 bg-white shadow rounded">
                  <div className="text-center mb-4">
                    <i className="fas fa-lock" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                    <h3 className="mt-3">Admin Authentication Required</h3>
                    <p className="text-muted">Please enter the password to access contact form data.</p>
                  </div>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className={`form-control form-control-lg ${passwordError ? 'is-invalid' : ''}`}
                        id="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                      />
                      {passwordError && (
                        <div className="invalid-feedback d-block mt-2">
                          {passwordError}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                      <i className="fas fa-unlock me-2"></i> Unlock Access
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 p-3 p-md-4">
      <div className="container-fluid px-0">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div>
            <h1 className="h3 fw-bold mb-1">Visitor Analytics</h1>
            <p className="text-muted small mb-0">
              <Activity className="h-3 w-3 d-inline me-1 text-success" />
              Real-time tracking · {stats.total} total visitors
            </p>
          </div>
          <div className="d-flex gap-2 mt-2 mt-md-0">
            <button
              onClick={() => fetchVisitors()}
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Refresh</span>
            </button>
            <label className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 mb-0">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="form-check-input mt-0"
              />
              <span className="small">Auto</span>
            </label>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-2 g-md-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small fw-semibold text-uppercase">Total</div>
                    <h4 className="fw-bold mb-0">{stats.total}</h4>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small fw-semibold text-uppercase">Today</div>
                    <h4 className="fw-bold mb-0">{stats.today}</h4>
                  </div>
                  <div className="bg-success bg-opacity-10 p-2 rounded-circle">
                    <Activity className="h-4 w-4 text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small fw-semibold text-uppercase">Unique</div>
                    <h4 className="fw-bold mb-0">{stats.unique}</h4>
                  </div>
                  <div className="bg-info bg-opacity-10 p-2 rounded-circle">
                    <UserCheck className="h-4 w-4 text-info" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small fw-semibold text-uppercase">Countries</div>
                    <h4 className="fw-bold mb-0">{stats.countries.length}</h4>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-2 rounded-circle">
                    <MapPin className="h-4 w-4 text-warning" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Countries */}
        {stats.countries.length > 0 && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3">
              <h6 className="fw-semibold mb-2 small text-uppercase text-muted">
                <Globe className="h-3 w-3 me-1" /> Top Countries
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {stats.countries.map(({ country, count }) => (
                  <span key={country} className="badge bg-light text-dark border px-3 py-2">
                    {country} <span className="text-muted ms-1">({count})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-3">
            <div className="row g-2">
              <div className="col-12 col-md-5">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white border-end-0">
                    <Search className="h-3 w-3 text-muted" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search visitors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control form-control-sm border-start-0"
                  />
                </div>
              </div>

              <div className="col-6 col-md-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="all">All Devices</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>

              <div className="col-6 col-md-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">7 Days</option>
                  <option value="month">30 Days</option>
                </select>
              </div>

              <div className="col-12 col-md-1 text-end">
                <span className="badge bg-light text-dark border py-1 px-2">
                  {totalItems}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-3 py-2 text-uppercase small fw-semibold text-muted">Time</th>
                    <th className="px-3 py-2 text-uppercase small fw-semibold text-muted">IP</th>
                    <th className="px-3 py-2 text-uppercase small fw-semibold text-muted">Location</th>
                    <th className="px-3 py-2 text-uppercase small fw-semibold text-muted">Device</th>
                    <th className="px-3 py-2 text-uppercase small fw-semibold text-muted">Browser/OS</th>
                    <th className="px-3 py-2 text-uppercase small fw-semibold text-muted">Page</th>
                    <th className="px-3 py-2 text-center text-uppercase small fw-semibold text-muted">View</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        <Users className="h-4 w-4 d-block mx-auto mb-2 opacity-25" />
                        <small>No visitors found</small>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((visitor, index) => (
                      <tr key={visitor._id || index}>
                        <td className="px-3 py-2 align-middle">
                          <div className="d-flex align-items-center gap-1 small text-muted">
                            <Clock className="h-3 w-3" />
                            {formatTime(visitor.createdAt)}
                          </div>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <code className="small bg-light px-2 py-1 rounded">{visitor.ip}</code>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <div>
                            <span className="small fw-semibold">{visitor.country || 'Unknown'}</span>
                            {visitor.city && (
                              <span className="text-muted small d-block">{visitor.city}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <span className="d-flex align-items-center gap-1 small text-muted">
                            {getDeviceIcon(visitor.device)}
                            <span className="text-capitalize">{visitor.device || 'N/A'}</span>
                          </span>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <div className="d-flex align-items-center gap-1 small flex-wrap">
                            {getBrowserIcon(visitor.browser)}
                            <span>{visitor.browser || 'Unknown'}</span>
                            <span className="text-muted">|</span>
                            {getOsIcon(visitor.os)}
                            <span className="text-muted">{visitor.os || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <div className="text-truncate small text-muted" style={{ maxWidth: '120px' }}>
                            {visitor.page || '/'}
                          </div>
                        </td>
                        <td className="px-3 py-2 align-middle text-center">
                          <button
                            onClick={() => handleViewDetails(visitor)}
                            className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                            style={{ width: '28px', height: '28px', padding: 0 }}
                            title="View Details"
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalItems > 0 && (
            <div className="card-footer bg-white border-0 p-3">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">
                    Showing {startIndex + 1} to {endIndex} of {totalItems}
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="form-select form-select-sm w-auto"
                    style={{ width: 'auto' }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={goToFirstPage}>
                        <ChevronsLeft className="h-3 w-3" />
                      </button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={goToPrevPage}>
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                    </li>

                    {getPageNumbers().map((page, index) => (
                      <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
                        {page === '...' ? (
                          <span className="page-link">…</span>
                        ) : (
                          <button className="page-link" onClick={() => goToPage(page)}>
                            {page}
                          </button>
                        )}
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={goToNextPage}>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={goToLastPage}>
                        <ChevronsRight className="h-3 w-3" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedVisitor && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              onClick={closeModal}
            >
              <div
                className="modal-dialog modal-dialog-centered modal-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title d-flex align-items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Visitor Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body pt-3">
                    <div className="row g-3">
                      {/* Basic Info */}
                      <div className="col-12">
                        <div className="row g-2">
                          <div className="col-6">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">IP Address</small>
                              <code className="small">{selectedVisitor.ip}</code>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">Visited</small>
                              <span className="small">{new Date(selectedVisitor.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">Country</small>
                              <span className="small">{selectedVisitor.country || 'Unknown'}</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">City</small>
                              <span className="small">{selectedVisitor.city || 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Device Info */}
                      <div className="col-12">
                        <div className="row g-2">
                          <div className="col-4">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">Device</small>
                              <div className="d-flex align-items-center gap-1">
                                {getDeviceIcon(selectedVisitor.device)}
                                <span className="small text-capitalize">{selectedVisitor.device}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">Browser</small>
                              <div className="d-flex align-items-center gap-1">
                                {getBrowserIcon(selectedVisitor.browser)}
                                <span className="small">{selectedVisitor.browser || 'Unknown'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="bg-light p-2 rounded">
                              <small className="text-muted d-block">OS</small>
                              <div className="d-flex align-items-center gap-1">
                                {getOsIcon(selectedVisitor.os)}
                                <span className="small">{selectedVisitor.os || 'Unknown'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Page Info */}
                      <div className="col-12">
                        <div className="bg-light p-2 rounded">
                          <small className="text-muted d-block">Page</small>
                          <span className="small">{selectedVisitor.page || '/'}</span>
                        </div>
                      </div>

                      {/* IP Details */}
                      {ipDetails && (
                        <div className="col-12 mt-3">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-primary text-white">
                              <h6 className="mb-0">
                                <i className="fas fa-network-wired me-2"></i>
                                IP Information
                              </h6>
                            </div>

                            <div className="card-body">
                              <div className="row g-3">

                                {/* ISP */}
                                <div className="col-md-6 col-lg-6">
                                  <div className="border rounded p-3 h-100 text-center bg-light">
                                    <i className="fas fa-wifi text-primary fs-4 mb-2"></i>
                                    <small className="text-muted d-block">ISP</small>
                                    <strong className="small text-break">
                                      {ipDetails.connection?.isp || "Unknown"}
                                    </strong>
                                  </div>
                                </div>

                                {/* Organization */}
                                <div className="col-md-6 col-lg-6">
                                  <div className="border rounded p-3 h-100 text-center bg-light">
                                    <i className="fas fa-building text-success fs-4 mb-2"></i>
                                    <small className="text-muted d-block">Organization</small>
                                    <strong className="small text-break">
                                      {ipDetails.connection?.org || "Unknown"}
                                    </strong>
                                  </div>
                                </div>

                                {/* Timezone */}
                                <div className="col-md-6 col-lg-6">
                                  <div className="border rounded p-3 h-100 text-center bg-light">
                                    <i className="fas fa-clock text-warning fs-4 mb-2"></i>
                                    <small className="text-muted d-block">Timezone</small>
                                    <strong className="small text-break">
                                      {ipDetails.timezone?.id || "Unknown"}
                                    </strong>
                                  </div>
                                </div>

                                {/* Coordinates */}
                                <div className="col-md-6 col-lg-6">
                                  <div className="border rounded p-3 h-100 text-center bg-light">
                                    <i className="fas fa-map-marker-alt text-danger fs-4 mb-2"></i>

                                    <small className="text-muted d-block">Coordinates</small>

                                    <strong className="small d-block mb-3">
                                      {ipDetails.latitude && ipDetails.longitude
                                        ? `${ipDetails.latitude}, ${ipDetails.longitude}`
                                        : "Unknown"}
                                    </strong>

                                    {ipDetails.latitude && ipDetails.longitude && (
                                      <a
                                        href={`https://www.google.com/maps?q=${ipDetails.latitude},${ipDetails.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline-primary w-100"
                                      >
                                        <i className="fas fa-location-arrow me-2"></i>
                                        View on Google Maps
                                      </a>
                                    )}
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer border-0 pt-0">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminVisitors;