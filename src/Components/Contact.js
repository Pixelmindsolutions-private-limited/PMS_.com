import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

// Vite: import.meta.env.VITE_API_URL | CRA: process.env.REACT_APP_API_URL
const API_BASE = "https://pmswebbackend.pixelmindsolutions.com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({}); // For form validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for map selection
  const [activeMap, setActiveMap] = useState("hyderabad");

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;

    if (!formData.name.trim()) formErrors.name = "Name is required.";
    if (!formData.email.trim() || !emailPattern.test(formData.email))
      formErrors.email = "Valid email is required.";
    if (!formData.subject.trim()) formErrors.subject = "Subject is required.";
    if (!formData.phone.trim() || !phonePattern.test(formData.phone))
      formErrors.phone = "Valid phone number is required.";
    if (!formData.message.trim())
      formErrors.message = "Message cannot be empty.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warn("Please fix the errors in the form.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.phone.trim(), // API expects "mobile"
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const response = await axios.post(`${API_BASE}/api/contact-us`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Data submitted successfully:", response.data);
      toast.success(response.data?.message || "Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" }); // Clear the form
      setErrors({});
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact PixelmindSolutions | Web Development, Mobile Apps & Digital Marketing</title>
        <meta name="description" content="Get in touch with PixelmindSolutions Pvt Ltd in Hyderabad and Vizag for professional web development, mobile app development, UI/UX design, digital marketing, website maintenance, and custom software solutions. Contact our experts today." />
        <meta name="keywords" content="contact pixelmindsolutions, contact software company hyderabad, contact software company vizag, web development company contact, mobile app development company hyderabad, digital marketing company contact, ui ux design company hyderabad, website development services, custom software development, website maintenance company, IT company contact hyderabad" />
        <link rel="canonical" href="https://www.pixelmindsolutions.com/contact" />
      </Helmet>

      <Header />
      <main>
        {/* Page banner area start here */}
        <section
          className="banner__inner-page bg-image pt-100 pb-100 bg-image"
          style={{
            backgroundImage: `url(${"/assets/images/banner/banner-inner-page.jpg"})`,
          }}
        >
          <div
            className="shape2 wow slideInLeft"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <img src="/assets/images/banner/inner-banner-shape2.png" alt="shape" />
          </div>
          <div
            className="shape1 wow slideInLeft"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <img src="/assets/images/banner/inner-banner-shape1.png" alt="shape" />
          </div>
          <div
            className="shape3 wow slideInRight"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <img
              className="sway__animationX"
              src="/assets/images/banner/inner-banner-shape3.png"
              alt="shape"
            />
          </div>
          <div className="container">
            <h2
              className="wow fadeInUp"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              Contact
            </h2>
            <div
              className="breadcrumb-list wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <Link to="/">Home</Link>
              <span>
                <i className="fa-regular fa-angles-right mx-2" />
                Contact
              </span>
            </div>
          </div>
        </section>
        <>
          {/* Contact area start here */}
          <section className="contact-area pt-80 pb-80">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-5">
                  <div className="contact__left-item primary-bg p-4">
                    <h3 className="text-white mb-3">Contact Information</h3>
                    <p className="text-white">
                      Whether you're looking for a full-scale digital transformation, need help with web or mobile development, or simply want to say hello, our team is ready to connect.
                    </p>

                    <ul className="mt-4 mb-4 list-unstyled">
                      
                      {/* HYDERABAD BRANCH */}
                      <li className="mb-4">
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <i className="bi bi-geo-alt-fill fs-4" style={{ color: "#06cabc" }}></i>
                          </div>
                          <div>
                            <span className="text-white fw-bold">Hyderabad Office</span>
                            <h5 className="mt-1 text-white">
                              <a className="text-white" href="https://maps.app.goo.gl/GkfdjzVF9vguB2Dd8" target="_blank" rel="noopener noreferrer">
                                Plot No 63, Sri Residency, 1st Floor 101, KPHB 5th Phase, Kukatpally, Hyderabad, Telangana 500085
                              </a>
                            </h5>
                          </div>
                        </div>
                      </li>

                      {/* VIZAG BRANCH */}
                      <li className="mb-4">
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <i className="bi bi-geo-alt-fill fs-4" style={{ color: "#06cabc" }}></i>
                          </div>
                          <div>
                            <span className="text-white fw-bold">Vizag Office</span>
                            <h5 className="mt-1 text-white">
                              <a className="text-white" href="https://maps.app.goo.gl/q3BP3vHcyBngPiQQ9" target="_blank" rel="noopener noreferrer">
                                Beach Road, behind Ambica Sea Green, Visakhapatnam 530017
                              </a>
                            </h5>
                          </div>
                        </div>
                      </li>

                      <li className="mb-4">
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <i className="bi bi-telephone-fill fs-4" style={{ color: "#06cabc" }}></i>
                          </div>
                          <div>
                            <span className="text-white">Call Us 24/7</span>
                            <h5 className="mt-1">
                              <a href="tel:+919666317749" className="text-white">+91 9666317749</a>
                            </h5>
                          </div>
                        </div>
                      </li>

                      <li className="mb-4">
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <i className="bi bi-envelope-fill fs-4" style={{ color: "#06cabc" }}></i>
                          </div>
                          <div>
                            <span className="text-white">Make a Quote</span>
                            <h5 className="mt-1">
                              <a
                                className="text-white"
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=info@pixelmindsolutions.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                info@pixelmindsolutions.com
                              </a>
                            </h5>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <h4 className="text-white mb-3">Follow Social:</h4>
                    <div className="social d-flex gap-3">
                      <a href="https://www.facebook.com/share/1E6gPK4vhm/" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook fs-5 " style={{ color: "#06cabc" }}></i>
                      </a>
                      <a href="https://www.instagram.com/pixelmindsolutions?igsh=ZmQ1c2c0b2twdTd1" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram fs-5 " style={{ color: "#06cabc" }}></i>
                      </a>
                      <a href="https://x.com/PIXELMINDS41249" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter-x fs-5" style={{ color: "#06cabc" }}></i>
                      </a>
                      <a href="https://www.linkedin.com/company/pixelmindsolutions-pvt-ltd/" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin fs-5 " style={{ color: "#06cabc" }}></i>
                      </a>
                    </div>
                  </div>
                </div>


                <div className="col-lg-6">
                  <div className="contact__right-item">
                    <div className="section-header mb-20">
                      <h5
                        className="wow fadeInUp pb-2"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms"
                      >
                        <img
                          className="me-1"
                          src="/assets/images/icon/section-title.png"
                          alt="icon"
                        />
                        GET IN TOUCH
                      </h5>
                      <h2
                        className="wow fadeInUp"
                        data-wow-delay="200ms"
                        data-wow-duration="1500ms"
                      >
                        Ready to Get Started?
                      </h2>
                      <p
                        className="wow fadeInUp mt-3"
                        data-wow-delay="400ms"
                        data-wow-duration="1500ms"
                      >
                        Whether you're looking for a full-scale digital transformation, need help with web or mobile development, or simply want to say hello our team is ready to connect.
                      </p>
                    </div>
                    <div className="contact__form">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          {/* Name Field */}
                          <div className="col-sm-6 mt-0">
                            <label htmlFor="name">Your Name*</label>
                            <input
                              type="text"
                              id="name"
                              className='bg-transparent bor mb-2'
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              required
                            />
                            {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
                          </div>

                          {/* Email Field */}
                          <div className="col-sm-6 mt-0">
                            <label htmlFor="email">Your Email*</label>
                            <input
                              type="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                              className='bg-transparent bor mb-2'
                              placeholder="Enter your email "
                              required
                              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            />
                            {errors.email && (
                              <small style={{ color: "red" }}>{errors.email}</small>
                            )}
                          </div>

                          {/* Subject Field */}
                          <div className="col-sm-6 mt-0">
                            <label htmlFor="subject">Subject*</label>
                            <input
                              type="text"
                              id="subject"
                              className='bg-transparent bor mb-2'
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder="Enter the subject"
                              required
                            />
                            {errors.subject && (
                              <small style={{ color: "red" }}>{errors.subject}</small>
                            )}
                          </div>

                          {/* Phone Field */}
                          <div className="col-sm-6 mt-0">
                            <label htmlFor="phone">Your Phone*</label>
                            <input
                              type="text"
                              id="phone"
                              value={formData.phone}
                              className='bg-transparent bor mb-2'
                              onChange={handleChange}
                              placeholder="Enter your phone number"
                              required
                              pattern="^\+?\d{10,15}$"
                            />
                            {errors.phone && (
                              <small style={{ color: "red" }}>{errors.phone}</small>
                            )}
                          </div>

                          {/* Message Field */}
                          <div className="col-12 mt-0">
                            <label htmlFor="message">Message*</label>
                            <textarea
                              id="message"
                              value={formData.message}
                              onChange={handleChange}
                              className='bg-transparent bor mb-0'
                              placeholder="Write your message here"
                              required
                            />
                            {errors.message && (
                              <small style={{ color: "red" }}>{errors.message}</small>
                            )}
                          </div>
                        </div>
                        <button type="submit" className="btn-one mt-3" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}{" "}
                          {!isSubmitting && <i className="fa-regular fa-arrow-right-long"></i>}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Contact area end here */}

          {/* Embedded Map Section with Selection Tabs */}
          <section className="map-area pb-80">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  
                  {/* Map Selection Tabs */}
                  <div className="text-center mb-4">
                    <div className="d-inline-flex p-1 rounded-pill" style={{ backgroundColor: '#f1f1f1' }}>
                      <button
                        className="btn px-4 py-2 rounded-pill fw-bold"
                        onClick={() => setActiveMap("hyderabad")}
                        style={{
                          backgroundColor: activeMap === "hyderabad" ? "#06cabc" : "transparent",
                          color: activeMap === "hyderabad" ? "#fff" : "#333",
                          border: "none",
                          transition: "all 0.3s ease",
                          boxShadow: activeMap === "hyderabad" ? "0 4px 6px rgba(6, 202, 188, 0.3)" : "none"
                        }}
                      >
                        <i className="bi bi-geo-alt-fill me-2"></i>Hyderabad Office
                      </button>
                      <button
                        className="btn px-4 py-2 rounded-pill fw-bold"
                        onClick={() => setActiveMap("vizag")}
                        style={{
                          backgroundColor: activeMap === "vizag" ? "#06cabc" : "transparent",
                          color: activeMap === "vizag" ? "#fff" : "#333",
                          border: "none",
                          transition: "all 0.3s ease",
                          boxShadow: activeMap === "vizag" ? "0 4px 6px rgba(6, 202, 188, 0.3)" : "none"
                        }}
                      >
                        <i className="bi bi-geo-alt-fill me-2"></i>Vizag Office
                      </button>
                    </div>
                  </div>

                  {/* Conditional Map Rendering */}
                  <div className="map-container rounded overflow-hidden shadow-sm">
                    {activeMap === "hyderabad" ? (
                      <iframe
                        key="hyderabad-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4514.143746212494!2d78.3941646!3d17.480906400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc3f9ee6211d7041%3A0x57e8ab2675c2f578!2sPIXELMINDSOLUTIONS%20PVT.LTD%20-%20Software%20Company%20in%20Hyderabad!5e1!3m2!1sen!2sin!4v1772010688017!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="PixelMind Solutions Hyderabad Location"
                      ></iframe>
                    ) : (
                      <iframe
                        key="vizag-map"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d244.64829695299767!2d83.33114982306584!3d17.718513489109903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1792041391531!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="PixelMind Solutions Vizag Location"
                      ></iframe>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  )
}

export default Contact