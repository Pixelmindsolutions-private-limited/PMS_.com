import React from "react";
import { Link } from "react-router-dom";

const WhyUs = () => {
    return (
        <section className="why-us-area pt-60 pb-120 sub-bg">
            <div className="container">
                <div className="row g-4 align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6">
                        <div className="section-header">
                            <h5
                                className="wow fadeInUp"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms"
                            >
                                <img
                                    className="me-1"
                                    src="/assets/images/icon/section-title.png"
                                    alt="icon"
                                />
                                Why Us
                            </h5>
                            <h2
                                className="wow fadeInUp"
                                data-wow-delay="200ms"
                                data-wow-duration="1500ms"
                            >
                                Built for Results, Not Just Code
                            </h2>
                            <p
                                className="wow fadeInUp mt-20"
                                data-wow-delay="400ms"
                                data-wow-duration="1500ms"
                            >
                                We don't just write software — we solve problems. Our approach
                                combines technical excellence with deep business understanding
                                to deliver solutions that move the needle.
                            </p>
                        </div>

                        {/* Features Grid - Two Columns */}
                        <div className="row g-4 mt-10">
                            {/* Card 1 - Fast Delivery */}
                            <div
                                className="col-sm-6 wow fadeInUp"
                                data-wow-delay="100ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="why-us__feature d-flex align-items-start gap-4">
                                    {/* Left Icon */}
                                    <div className="why-us__icon-wrapper flex-shrink-0">
                                        <div className="why-us__icon">
                                            <svg
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M13 2L4 14h6l-1 8 11-14h-6l1-6z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="flex-grow-1">
                                        <h4 className="mb-2">Fast Delivery</h4>
                                        <p className="mb-0">
                                            Agile methodologies ensure rapid iteration and on-time project delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 - Scalable Solutions */}
                            <div
                                className="col-sm-6 wow fadeInUp"
                                data-wow-delay="200ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="why-us__feature d-flex align-items-start gap-4">
                                    {/* Left Icon */}
                                    <div className="why-us__icon-wrapper flex-shrink-0">
                                        <div className="why-us__icon">
                                            <svg
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M18 10a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3" />
                                                <path d="M9 13v5a3 3 0 0 0 6 0v-5" />
                                                <path d="M3 8l3-3 3 3" />
                                                <path d="M21 8l-3-3-3 3" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="flex-grow-1">
                                        <h4 className="mb-2">Scalable Solutions</h4>
                                        <p className="mb-0">
                                            Architecture designed to grow with your business from startup to enterprise.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 - Quality Assured */}
                            <div
                                className="col-sm-6 wow fadeInUp"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="why-us__feature d-flex align-items-start gap-4">
                                    {/* Left Icon */}
                                    <div className="why-us__icon-wrapper flex-shrink-0">
                                        <div className="why-us__icon">
                                            <svg
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="flex-grow-1">
                                        <h4 className="mb-2">Quality Assured</h4>
                                        <p className="mb-0">
                                            Rigorous testing and code review processes guarantee robust, reliable software.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4 - Expert Team */}
                            <div
                                className="col-sm-6 wow fadeInUp"
                                data-wow-delay="400ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="why-us__feature d-flex align-items-start gap-4">
                                    {/* Left Icon */}
                                    <div className="why-us__icon-wrapper flex-shrink-0">
                                        <div className="why-us__icon">
                                            <svg
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="flex-grow-1">
                                        <h4 className="mb-2">Expert Team</h4>
                                        <p className="mb-0">
                                            Skilled developers, designers, and consultants with deep industry knowledge.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - CTA Card */}
                    <div
                        className="col-lg-6 wow fadeInRight"
                        data-wow-delay="300ms"
                        data-wow-duration="1500ms"
                    >
                        <div className="why-us__cta-card">
                            <div className="why-us__cta-content">
                                <h3>Ready to build something great?</h3>
                                <p>
                                    Tell us about your project and we'll get back to you within
                                    24 hours with a detailed proposal and timeline.
                                </p>

                                <ul className="why-us__benefits">
                                    <li>
                                        <span className="benefit-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </span>
                                        Free initial consultation
                                    </li>
                                    <li>
                                        <span className="benefit-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </span>
                                        Detailed project proposal
                                    </li>
                                    <li>
                                        <span className="benefit-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </span>
                                        Transparent pricing
                                    </li>
                                    <li>
                                        <span className="benefit-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </span>
                                        Dedicated project manager
                                    </li>
                                </ul>

                                <Link to="/contact" className="btn-one">
                                    Schedule a Call{" "}
                                    <i className="fa-regular fa-arrow-right-long" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
        .why-us-area {
          position: relative;
          overflow: hidden;
        }

        /* Feature Card - Horizontal Layout with Icon Left */
        .why-us__feature {
          padding: 22px 12px;
          background: var(--white);
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.06);
          transition: var(--transition);
          height: 100%;
          border: 1px solid rgba(0, 0, 0, 0.04);
          position: relative;
          min-height: 110px;
        }

        .why-us__feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          border-color: var(--primary-color);
        }

        .why-us__icon-wrapper {
          margin-top: 4px;
        }

        .why-us__icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 202, 188, 0.08);
          border-radius: 10px;
          color: var(--primary-color);
          transition: var(--transition);
          flex-shrink: 0;
        }

        .why-us__feature:hover .why-us__icon {
          background: var(--gradient-bg);
          color: var(--white);
          transform: rotateY(360deg);
        }

        .why-us__feature h4 {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 5px;
          color: var(--heading-color);
          line-height: 1.3;
        }

        .why-us__feature p {
          font-size: 13.5px;
          line-height: 22px;
          opacity: 0.8;
          margin-bottom: 0;
          color: var(--paragraph);
        }

        /* CTA Card */
        .why-us__cta-card {
          background: linear-gradient(135deg, #0f0d1d 0%, #06cabc 100%);
          padding: 50px 45px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        .why-us__cta-card::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 50%;
        }

        .why-us__cta-card::after {
          content: "";
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
        }

        .why-us__cta-content {
          position: relative;
          z-index: 1;
        }

        .why-us__cta-content h3 {
          font-size: 28px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .why-us__cta-content > p {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 28px;
          font-size: 15px;
          line-height: 26px;
        }

        .why-us__benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }

        .why-us__benefits li {
          display: flex;
          align-items: center;
          gap: 14px;
          color: rgba(255, 255, 255, 0.9);
          padding: 8px 0;
          font-size: 15px;
          font-weight: 500;
        }

        .benefit-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          flex-shrink: 0;
          color: var(--white);
        }

        .benefit-icon svg {
          width: 14px;
          height: 14px;
        }

        .why-us__cta-content .btn-one {
          background: var(--white);
          color: var(--secondary-color);
          padding: 14px 35px;
          font-weight: 600;
        }

        .why-us__cta-content .btn-one:hover {
          background: var(--secondary-color);
          color: var(--white);
        }

        .why-us__cta-content .btn-one::after,
        .why-us__cta-content .btn-one::before {
          background: var(--secondary-color);
        }

        .why-us__cta-content .btn-one:hover::before,
        .why-us__cta-content .btn-one:hover::after {
          height: 100%;
        }

        /* Dark Theme Support */
        :root[data-theme="dark"] .why-us__feature {
          background: var(--sub-bg);
          border-color: rgba(255, 255, 255, 0.06);
        }

        :root[data-theme="dark"] .why-us__feature h4 {
          color: var(--white);
        }

        /* Responsive */
        @media (max-width: 1199px) {
          .why-us__cta-card {
            padding: 40px 35px;
          }
        }

        @media (max-width: 991px) {
          .why-us__cta-card {
            padding: 40px 30px;
          }

          .why-us__cta-content h3 {
            font-size: 24px;
          }

          .why-us__feature {
            min-height: 100px;
            padding: 20px;
          }
        }

        @media (max-width: 767px) {
          .why-us-area {
            padding: 60px 0;
          }

          .why-us__feature {
            padding: 18px 16px;
            min-height: 90px;
            gap: 16px !important;
          }

          .why-us__icon {
            width: 44px;
            height: 44px;
          }

          .why-us__icon svg {
            width: 22px;
            height: 22px;
          }

          .why-us__feature h4 {
            font-size: 16px;
          }

          .why-us__feature p {
            font-size: 13px;
            line-height: 20px;
          }

          .why-us__cta-card {
            padding: 30px 24px;
            margin-top: 30px;
          }

          .why-us__cta-content h3 {
            font-size: 22px;
          }

          .why-us__benefits li {
            font-size: 14px;
            padding: 6px 0;
          }
        }

        @media (max-width: 575px) {
          .why-us__feature {
            padding: 16px 14px;
            min-height: 80px;
            gap: 12px !important;
          }

          .why-us__icon {
            width: 38px;
            height: 38px;
          }

          .why-us__icon svg {
            width: 18px;
            height: 18px;
          }

          .why-us__feature h4 {
            font-size: 15px;
          }

          .why-us__feature p {
            font-size: 12.5px;
            line-height: 19px;
          }

          .why-us__cta-card {
            padding: 25px 20px;
          }

          .why-us__cta-content h3 {
            font-size: 20px;
          }
        }
      `}</style>
        </section>
    );
};

export default WhyUs;