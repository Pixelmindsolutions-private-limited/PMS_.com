
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaUsers,
  FaBuilding,
  FaArrowRight,
  FaGlobe,
  FaSpinner,
  FaExclamationCircle,
  FaRedo,
  FaExternalLinkAlt,
} from "react-icons/fa";

const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  "https://pmswebbackend.pixelmindsolutions.com"
).replace(/\/+$/, "");

const BRANCHES_API = `${API_BASE_URL}/api/branches`;

const DEFAULT_BRANCH_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";

const DEFAULT_FEATURES = [];

function getImageUrl(image) {
  if (!image) return DEFAULT_BRANCH_IMAGE;

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${API_BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(BRANCHES_API, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load branch information."
        );
      }

      if (!Array.isArray(result.data)) {
        throw new Error("Invalid branch data received from the server.");
      }

      setBranches(result.data);
    } catch (err) {
      console.error("Failed to fetch branches:", err);
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const totalBranches = branches.length;

  const totalTeamSize = branches.reduce((total, branch) => {
    const match = String(branch.teamSize || "").match(/(\d+)/);
    return total + (match ? Number(match[1]) : 0);
  }, 0);

  const renderLoadingState = () => (
    <div className="text-center py-5 my-5">
      <FaSpinner
        className="fa-spin mb-3"
        size={36}
        style={{ color: "#06cabc" }}
      />
      <h4 className="fw-bold">Loading Our Locations</h4>
      <p className="text-muted mb-0">
        Please wait while we fetch our branch information.
      </p>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center py-5 my-5">
      <FaExclamationCircle
        size={40}
        className="mb-3"
        style={{ color: "#dc3545" }}
      />

      <h4 className="fw-bold">Unable to Load Branches</h4>

      <p className="text-muted mx-auto mb-4" style={{ maxWidth: "500px" }}>
        {error}
      </p>

      <button
        type="button"
        onClick={fetchBranches}
        className="btn px-4 py-2 rounded-pill fw-semibold text-white"
        style={{ backgroundColor: "#06cabc" }}
      >
        <FaRedo className="me-2" />
        Try Again
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-5 my-5">
      <FaBuilding
        size={40}
        className="mb-3"
        style={{ color: "#06cabc" }}
      />

      <h4 className="fw-bold">No Branches Available</h4>

      <p className="text-muted mb-0">
        Our office locations will be displayed here soon.
      </p>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <title>
          Our Branches | PixelmindSolutions - Office Locations
        </title>

        <meta
          name="description"
          content="Visit PixelmindSolutions offices and explore our development centers, services, contact information, and office locations."
        />

        <meta
          name="keywords"
          content="pixelmindsolutions branches, Hyderabad office, Vizag office, software company locations, IT company offices"
        />

        <link
          rel="canonical"
          href="https://www.pixelmindsolutions.com/branches"
        />
      </Helmet>

      <Header />

      <main>
        {/* Page Banner */}
        <section
          className="banner__inner-page bg-image pt-120 pb-120"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images/banner/banner-inner-page.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container text-center text-white">
            <h2
              className="display-4 fw-bold mb-3 wow fadeInUp"
              data-wow-duration="1000ms"
            >
              Our Global Presence
            </h2>

            <div
              className="breadcrumb-list d-inline-flex align-items-center wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
              <Link
                to="/"
                className="text-white text-decoration-none opacity-75"
              >
                Home
              </Link>

              <i className="fa-regular fa-angles-right mx-3 opacity-50" />

              <span className="fw-semibold">Branches</span>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-5 my-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <span
                  className="text-uppercase fw-bold tracking-wider mb-2 d-block"
                  style={{
                    color: "#06cabc",
                    letterSpacing: "2px",
                  }}
                >
                  Our Locations
                </span>

                <h2 className="fw-bold mb-4">
                  Serving Clients Across Our Locations
                </h2>

                <p className="text-muted lead">
                  Explore our offices, meet our teams, and discover the
                  capabilities available at each location. Our teams work
                  together to deliver quality digital solutions and
                  exceptional client experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Branch Sections */}
        <section className="pb-5">
          <div className="container">
            {loading ? (
              renderLoadingState()
            ) : error ? (
              renderErrorState()
            ) : branches.length === 0 ? (
              renderEmptyState()
            ) : (
              branches.map((branch, index) => {
                const isEven = index % 2 === 0;

                const branchImage = getImageUrl(branch.image);

                const features = Array.isArray(branch.features)
                  ? branch.features
                  : DEFAULT_FEATURES;

                const phoneNumber = String(branch.phone || "").replace(
                  /[^\d+]/g,
                  ""
                );

                return (
                  <div
                    key={branch._id || branch.id || index}
                    className="row align-items-center g-4 g-lg-5 mb-5 pb-5 border-bottom border-light"
                  >
                    {/* Image Side */}
                    <div
                      className={`col-lg-6 ${
                        isEven ? "order-lg-1" : "order-lg-2"
                      }`}
                    >
                      <div
                        className="position-relative rounded-4 overflow-hidden shadow-lg wow fadeIn"
                        data-wow-duration="1200ms"
                        style={{
                          height: "clamp(280px, 42vw, 450px)",
                          minHeight: "280px",
                        }}
                      >
                        <img
                          src={branchImage}
                          alt={branch.title || branch.city || "Office"}
                          className="w-100 h-100"
                          loading="lazy"
                          style={{
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
                          }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.transform = "scale(1)";
                          }}
                          onError={(event) => {
                            if (
                              event.currentTarget.src !== DEFAULT_BRANCH_IMAGE
                            ) {
                              event.currentTarget.src = DEFAULT_BRANCH_IMAGE;
                            }
                          }}
                        />

                        {/* Branch Badge */}
                        {branch.badge && (
                          <div
                            className="position-absolute top-0 start-0 m-3 m-md-4 px-3 px-md-4 py-2 rounded-pill text-white fw-bold shadow-sm"
                            style={{
                              backgroundColor: "#06cabc",
                              backdropFilter: "blur(10px)",
                              maxWidth: "calc(100% - 32px)",
                              fontSize: "clamp(11px, 2vw, 14px)",
                            }}
                          >
                            <FaBuilding className="me-2" />
                            {branch.badge}
                          </div>
                        )}

                        {/* Floating Branch Stats */}
                        <div
                          className="position-absolute bottom-0 end-0 m-3 m-md-4 p-3 rounded-3 text-white shadow-lg"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(10px)",
                            minWidth: "160px",
                            maxWidth: "calc(100% - 32px)",
                          }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="p-2 rounded-circle flex-shrink-0"
                              style={{
                                backgroundColor: "rgba(6, 202, 188, 0.2)",
                              }}
                            >
                              <FaUsers
                                className="fs-4"
                                style={{ color: "#06cabc" }}
                              />
                            </div>

                            <div>
                              <div className="fw-bold fs-5 mb-0">
                                {branch.teamSize || "Our Team"}
                              </div>

                              <small className="opacity-75">
                                {branch.established || "Our Office"}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Branch Content */}
                    <div
                      className={`col-lg-6 ${
                        isEven ? "order-lg-2" : "order-lg-1"
                      }`}
                    >
                      <div className="wow fadeInUp" data-wow-duration="1000ms">
                        <h3
                          className="display-6 fw-bold mb-4"
                          style={{
                            color: "#1a1a1a",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {branch.title}
                        </h3>

                        {/* Contact Information */}
                        <div className="row g-3 mb-4">
                          <div className="col-sm-6">
                            <div
                              className="d-flex align-items-start h-100 p-3 rounded-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <FaMapMarkerAlt
                                className="fs-4 mt-1 me-3 flex-shrink-0"
                                style={{ color: "#06cabc" }}
                              />

                              <div className="min-w-0">
                                <h6 className="fw-bold mb-1">Visit Us</h6>
                                <p className="text-muted mb-0 small">
                                  {branch.address || "Address not available"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div
                              className="d-flex align-items-start h-100 p-3 rounded-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <FaClock
                                className="fs-4 mt-1 me-3 flex-shrink-0"
                                style={{ color: "#06cabc" }}
                              />

                              <div className="min-w-0">
                                <h6 className="fw-bold mb-1">
                                  Working Hours
                                </h6>

                                <p className="text-muted mb-0 small">
                                  {branch.hours || "Contact us for timings"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div
                              className="d-flex align-items-center h-100 p-3 rounded-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <FaPhoneAlt
                                className="fs-4 me-3 flex-shrink-0"
                                style={{ color: "#06cabc" }}
                              />

                              <div className="min-w-0">
                                <h6 className="fw-bold mb-1">Call Us</h6>

                                {branch.phone ? (
                                  <a
                                    href={`tel:${phoneNumber}`}
                                    className="text-decoration-none text-muted small"
                                  >
                                    {branch.phone}
                                  </a>
                                ) : (
                                  <span className="text-muted small">
                                    Not available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div
                              className="d-flex align-items-center h-100 p-3 rounded-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <FaEnvelope
                                className="fs-4 me-3 flex-shrink-0"
                                style={{ color: "#06cabc" }}
                              />

                              <div className="min-w-0">
                                <h6 className="fw-bold mb-1">Email</h6>

                                {branch.email ? (
                                  <a
                                    href={`mailto:${branch.email}`}
                                    className="text-decoration-none text-muted small"
                                    style={{ overflowWrap: "anywhere" }}
                                  >
                                    {branch.email}
                                  </a>
                                ) : (
                                  <span className="text-muted small">
                                    Not available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Branch Features */}
                        {features.length > 0 && (
                          <div className="mb-4">
                            <h6
                              className="fw-bold text-uppercase mb-3"
                              style={{
                                color: "#06cabc",
                                letterSpacing: "1px",
                                fontSize: "0.85rem",
                              }}
                            >
                              Core Capabilities at This Location
                            </h6>

                            <div className="row g-2">
                              {features.map((feature, featureIndex) => (
                                <div
                                  key={`${branch._id || branch.id}-${featureIndex}`}
                                  className="col-sm-6"
                                >
                                  <div className="d-flex align-items-start p-2">
                                    <i
                                      className={`${
                                        feature.icon || "bi bi-check-circle"
                                      } fs-5 me-2 flex-shrink-0`}
                                      style={{ color: "#06cabc" }}
                                      aria-hidden="true"
                                    />

                                    <span className="text-secondary fw-medium small">
                                      {feature.text}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="d-flex gap-3 flex-wrap">
                          {branch.mapLink && (
                            <a
                              href={branch.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn px-4 py-2 rounded-pill fw-semibold text-decoration-none d-inline-flex align-items-center gap-2"
                              style={{
                                backgroundColor: "#06cabc",
                                color: "#fff",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(event) => {
                                event.currentTarget.style.backgroundColor =
                                  "#05a89c";
                              }}
                              onMouseLeave={(event) => {
                                event.currentTarget.style.backgroundColor =
                                  "#06cabc";
                              }}
                            >
                              <FaMapMarkerAlt />
                              Get Directions
                              <FaExternalLinkAlt size={12} />
                            </a>
                          )}

                          <Link
                            to="/contact"
                            className="btn px-4 py-2 rounded-pill fw-semibold text-decoration-none d-inline-flex align-items-center gap-2"
                            style={{
                              border: "2px solid #06cabc",
                              color: "#06cabc",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(event) => {
                              event.currentTarget.style.backgroundColor =
                                "#06cabc";
                              event.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(event) => {
                              event.currentTarget.style.backgroundColor =
                                "transparent";
                              event.currentTarget.style.color = "#06cabc";
                            }}
                          >
                            Contact This Branch
                            <FaArrowRight className="fs-6" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Connected Network Section */}
        {!loading && !error && branches.length > 0 && (
          <section className="primary-bg py-5 position-relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
              <div
                className="position-absolute"
                style={{
                  top: "-50px",
                  left: "-50px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />

              <div
                className="position-absolute"
                style={{
                  bottom: "-80px",
                  right: "-80px",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />
            </div>

            <div className="container position-relative z-1">
              <div className="row align-items-center">
                <div className="col-lg-6 text-white mb-4 mb-lg-0">
                  <h2 className="fw-bold mb-3">
                    One Vision, Connected Teams
                  </h2>

                  <p className="opacity-75 mb-4">
                    Our teams work together across locations to deliver
                    reliable digital solutions, share expertise, and help
                    clients turn their ideas into reality.
                  </p>

                  <Link
                    to="/contact"
                    className="btn btn-dark px-4 py-2 rounded-pill fw-semibold text-decoration-none"
                  >
                    Start Your Project Today
                  </Link>
                </div>

                <div className="col-lg-6">
                  <div className="row g-3 g-md-4">
                    <div className="col-6">
                      <div className="bg-white bg-opacity-10 p-3 p-md-4 rounded-4 text-center backdrop-blur h-100">
                        <FaGlobe
                          className="fs-1 mb-3"
                          style={{ color: "#fff" }}
                        />

                        <h3 className="text-white fw-bold mb-1">
                          {totalBranches}
                        </h3>

                        <p className="text-white-50 mb-0">
                          {totalBranches === 1
                            ? "Office Location"
                            : "Office Locations"}
                        </p>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="bg-white bg-opacity-10 p-3 p-md-4 rounded-4 text-center backdrop-blur h-100">
                        <FaUsers
                          className="fs-1 mb-3"
                          style={{ color: "#fff" }}
                        />

                        <h3 className="text-white fw-bold mb-1">
                          {totalTeamSize > 0
                            ? `${totalTeamSize}+`
                            : "Our Teams"}
                        </h3>

                        <p className="text-white-50 mb-0">
                          Team Members
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Branches;
