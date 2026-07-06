import React from "react";
import { Link } from "react-router-dom";
import founderImage from "../assets/Founder.png";
import signature from "../assets/signature.svg";

const Founder = () => {
    return (
        <section className="founder-area py-5 py-lg-6 sub-bg position-relative overflow-hidden">
            <div className="container">
                <div className="row g-5 align-items-center">
                    {/* Left - Founder Image */}
                    <div className="col-lg-5 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="position-relative">
                            {/* Premium Border Glow */}
                            <div className="founder-glow-ring position-absolute top-50 start-50 translate-middle rounded-circle"></div>

                            <div className="founder-image-wrapper position-relative rounded-4 overflow-hidden shadow-lg">
                                <img
                                    src={founderImage}
                                    alt="Founder - PixelmindSolutions"
                                    className="w-100 h-auto d-block transition-transform duration-300 hover-scale"
                                />

                                {/* Premium Decorative Dots */}
                                <div className="founder-accent-dots position-absolute top-0 end-0 p-3 d-none d-sm-block">
                                    <span className="d-block w-8 h-8 rounded-circle textcolor opacity-25 mb-2"></span>
                                    <span className="d-block w-8 h-8 rounded-circle textcolor opacity-50 mb-2"></span>
                                    <span className="d-block w-8 h-8 rounded-circle textcolor opacity-75"></span>
                                </div>

                                {/* Experience Badge - Premium Version */}
                                <div className="founder-experience-badge position-absolute bottom-0 start-0 m-4 p-3 rounded-3 d-flex align-items-center gap-3">
                                    <div className="badge-icon bg-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="textcolor">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="d-block fs-2 fw-bold text-white lh-1">10+</span>
                                        <span className="d-block fs-7 text-white opacity-75 fw-medium">Years Excellence</span>
                                    </div>
                                </div>

                                {/* Social Links - Premium Version */}
                                <div className="founder-social-links position-absolute top-0 end-0 m-4 d-flex flex-column gap-2">
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link bg-white bg-opacity-95 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm position-relative">
                                        <i className="fab fa-linkedin-in text-secondary"></i>
                                        <span className="social-tooltip position-absolute bg-dark text-white fs-7 py-1 px-2 rounded opacity-0 transition-opacity">LinkedIn</span>
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link bg-white bg-opacity-95 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm position-relative">
                                        <i className="fab fa-twitter text-secondary"></i>
                                        <span className="social-tooltip position-absolute bg-dark text-white fs-7 py-1 px-2 rounded opacity-0 transition-opacity">Twitter</span>
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link bg-white bg-opacity-95 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm position-relative">
                                        <i className="fab fa-youtube text-secondary"></i>
                                        <span className="social-tooltip position-absolute bg-dark text-white fs-7 py-1 px-2 rounded opacity-0 transition-opacity">YouTube</span>
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-link bg-white bg-opacity-95 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm position-relative">
                                        <i className="fab fa-github text-secondary"></i>
                                        <span className="social-tooltip position-absolute bg-dark text-white fs-7 py-1 px-2 rounded opacity-0 transition-opacity">GitHub</span>
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="founder-trust-badge position-absolute bottom-0 end-0 translate-middle-y bg-white rounded-3 shadow-lg p-3 d-flex align-items-center gap-2 d-none d-lg-flex">
                                <span className="fs-3">🏆</span>
                                <div>
                                    <span className="d-block fw-semibold text-secondary fs-6">Top Rated</span>
                                    <span className="d-block fs-7 text-secondary opacity-75">Digital Partner</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Founder Content */}
                    <div className="col-lg-7">
                        <div className="founder-content">
                            <div className="section-header">
                                <h5
                                    className="textcolor fw-semibold text-uppercase mb-3 d-flex align-items-center gap-2 wow fadeInUp"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms"
                                >
                                    <img
                                        className="me-1"
                                        src="/assets/images/icon/section-title.png"
                                        alt="icon"
                                    />
                                    MEET THE FOUNDER
                                </h5>
                                <h2
                                    className="display-4 fw-bold mb-4 wow fadeInUp"
                                    data-wow-delay="200ms"
                                    data-wow-duration="1500ms"
                                >
                                    Visionary Leader Behind <br />
                                    <span className="textcolor">PixelmindSolutions</span>
                                </h2>
                            </div>

                            <div
                                className="founder-bio wow fadeInUp"
                                data-wow-delay="400ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="mb-4">
                                    <h3 className="display-6 fw-bold text-black mb-1">Narasimha Ganapathi Varma</h3>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="textcolor fw-semibold fs-5">Founder & CEO</span>
                                        <span className="border-start border-2 border-primary opacity-25" style={{ height: "24px" }}></span>
                                        <span className="text-secondary opacity-50 fs-7">10+ Years Experience</span>
                                    </div>
                                </div>

                                <div className="position-relative mb-4">
                                    <div className="position-absolute top-0 start-0 opacity-10">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path d="M12 0L0 20V40H20V20H8L20 0H12ZM32 0L20 20V40H40V20H28L40 0H32Z" fill="#06cabc" />
                                        </svg>
                                    </div>
                                    <p className="ps-5 fs-6 text-secondary opacity-75 lh-lg mb-3">
                                        With over a decade of experience in technology and digital transformation,
                                        <strong> Narasimha Ganapathi Varma</strong> founded <strong>PixelmindSolutions</strong> with a mission to help businesses
                                        harness the power of digital innovation. His vision combines technical
                                        expertise with strategic thinking to deliver solutions that create real
                                        business value.
                                    </p>

                                    <p className="ps-5 fs-6 text-secondary opacity-75 lh-lg mb-0">
                                        Under his leadership, PixelmindSolutions has grown into a trusted digital
                                        partner for businesses across India, delivering exceptional results through
                                        a commitment to quality, innovation, and customer satisfaction.
                                    </p>
                                </div>

                                {/* Signature */}
                                <div className="mb-4">
                                    <img
                                        src={signature}
                                        alt="Founder Signature"
                                        className="h-50px"
                                        style={{ maxHeight: "50px" }}
                                    />
                                </div>
                            </div>

                            {/* Founder Stats */}
                            <div
                                className="row g-3 py-4 border-top border-bottom border-secondary border-opacity-10 wow fadeInUp"
                                data-wow-delay="600ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="col-4 text-center">
                                    <div className="founder-stat">
                                        <span className="d-block display-5 fw-bold text-secondary">50+</span>
                                        <span className="d-block fs-7 text-secondary opacity-75 fw-medium">Projects Delivered</span>
                                    </div>
                                </div>
                                <div className="col-4 text-center border-start border-end border-secondary border-opacity-10">
                                    <div className="founder-stat">
                                        <span className="d-block display-5 fw-bold text-secondary">25+</span>
                                        <span className="d-block fs-7 text-secondary opacity-75 fw-medium">Happy Clients</span>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="founder-stat">
                                        <span className="d-block display-5 fw-bold text-secondary">10+</span>
                                        <span className="d-block fs-7 text-secondary opacity-75 fw-medium">Awards & Recognition</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div
                                className="mt-4 wow fadeInUp"
                                data-wow-delay="800ms"
                                data-wow-duration="1500ms"
                            >
                                <Link to="/contact" className="btn-one">
                                    Connect with Founder{" "}
                                    <i className="fa-regular fa-arrow-right-long" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional CSS */}
            <style jsx>{`
        .textcolor {
          color: #06cabc;
        }

        .founder-area {
          padding: 80px 0;
        }

        /* Glow Ring */
        .founder-glow-ring {
          width: 110%;
          height: 110%;
          background: radial-gradient(circle, rgba(6, 202, 188, 0.08) 0%, transparent 70%);
          animation: pulseGlow 3s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }

        /* Image Hover */
        .hover-scale {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-scale:hover {
          transform: scale(1.03);
        }

        /* Experience Badge */
        .founder-experience-badge {
          background: linear-gradient(135deg, #06cabc 0%, #0f0d1d 100%);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 40px rgba(6, 202, 188, 0.3);
          animation: floatBadge 3s ease-in-out infinite;
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .badge-icon {
          width: 44px;
          height: 44px;
        }

        .w-8 { width: 8px; height: 8px; }

        /* Social Links */
        .founder-social-links .social-link {
          width: 40px;
          height: 40px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .founder-social-links .social-link:hover {
          transform: translateX(-5px) scale(1.1);
          background: var(--gradient-bg) !important;
          color: white !important;
          box-shadow: 0 8px 25px rgba(6, 202, 188, 0.3);
        }

        .founder-social-links .social-link:hover i {
          color: white !important;
        }

        .social-tooltip {
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .social-link:hover .social-tooltip {
          opacity: 1 !important;
          right: calc(100% + 16px);
        }

        /* Trust Badge */
        .founder-trust-badge {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) translateX(20%);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .founder-area {
            padding: 60px 0;
          }

          .founder-experience-badge {
            padding: 12px 16px !important;
            gap: 12px !important;
          }

          .badge-icon {
            width: 36px;
            height: 36px;
          }

          .founder-experience-badge .fs-2 {
            font-size: 24px !important;
          }

          .founder-trust-badge {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .founder-area {
            padding: 40px 0;
          }

          .founder-social-links {
            gap: 8px !important;
            margin: 12px !important;
          }

          .founder-social-links .social-link {
            width: 34px;
            height: 34px;
            font-size: 14px;
          }

          .founder-experience-badge {
            padding: 10px 14px !important;
            margin: 12px !important;
          }

          .badge-icon {
            width: 32px;
            height: 32px;
          }

          .badge-icon svg {
            width: 18px;
            height: 18px;
          }

          .founder-experience-badge .fs-2 {
            font-size: 20px !important;
          }

          .founder-experience-badge .fs-7 {
            font-size: 10px !important;
          }

          .founder-content h2 {
            font-size: 28px !important;
          }

          .founder-content .display-6 {
            font-size: 22px !important;
          }

          .founder-content .ps-5 {
            padding-left: 0 !important;
          }

          .founder-content .position-relative .position-absolute {
            display: none;
          }

          .founder-stat .display-5 {
            font-size: 24px !important;
          }

          .founder-stat .fs-7 {
            font-size: 11px !important;
          }
        }

        @media (max-width: 575px) {
          .founder-social-links .social-link {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }

          .founder-social-links {
            gap: 6px !important;
            margin: 8px !important;
          }

          .founder-experience-badge {
            padding: 8px 12px !important;
            margin: 8px !important;
          }

          .badge-icon {
            width: 28px;
            height: 28px;
          }

          .badge-icon svg {
            width: 14px;
            height: 14px;
          }

          .founder-experience-badge .fs-2 {
            font-size: 16px !important;
          }

          .founder-content h2 {
            font-size: 22px !important;
          }

          .founder-content .display-6 {
            font-size: 18px !important;
          }

          .founder-stat .display-5 {
            font-size: 20px !important;
          }

          .founder-content .fs-6 {
            font-size: 14px !important;
          }
        }

        /* Utility Classes */
        .fs-7 { font-size: 12px; }
        .h-50px { height: 50px; }
        .lh-lg { line-height: 1.8; }
        .transition-opacity { transition: opacity 0.3s ease; }
        .transition-transform { transition: transform 0.3s ease; }
        .duration-300 { transition-duration: 0.3s; }
      `}</style>
        </section>
    );
};

export default Founder;