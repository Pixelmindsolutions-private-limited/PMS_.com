import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contactform() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({}); // For form validation errors

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
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post("https://678cb478f067bf9e24e7ff6a.mockapi.io/api/v1/info/contact", formData)
                .then((response) => {
                    console.log("Data submitted successfully:", response.data);
                    toast.success("Message sent successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    setFormData({ name: "", email: "", subject: "", phone: "", message: "" }); // Clear the form
                    setErrors({}); // Clear errors
                })
                .catch((error) => {
                    console.error("Error submitting data:", error);
                    toast.error("An error occurred. Please try again.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                });
        } else {
            toast.warn("Please fix the errors in the form.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <section
                className="contact-form-area pt-60 pb-60"
                style={{
                    backgroundImage: `url(${"/assets/images/bg/testimonial-bg.png"})`,
                }}
            >
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div
                            className="col-lg-8 wow fadeInUp"
                            data-wow-delay="200ms"
                            data-wow-duration="1500ms"
                        >
                            <div className="talk-us__item">
                                <div className="section-header text-center mb-40">
                                    <h5 className="text-white">
                                        <svg
                                            width={28}
                                            height={12}
                                            viewBox="0 0 28 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.75"
                                                y="0.75"
                                                width="18.5"
                                                height="10.5"
                                                rx="5.25"
                                                stroke="white"
                                                strokeWidth="1.5"
                                            />
                                            <rect
                                                x={8}
                                                width={20}
                                                height={12}
                                                rx={6}
                                                fill="white"
                                            />
                                        </svg>
                                        GET IN TOUCH
                                    </h5>
                                    <h2 className="text-white">Let's Start Your Project Today</h2>
                                    <p className="text-white opacity-75 mt-15">
                                        Have a project in mind? Fill out the form below and we'll get back to you 
                                        within 24 hours with a detailed proposal.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        {/* Name Field */}
                                        <div className="col-sm-6">
                                            <label htmlFor="name" className="text-white">Your Name*</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                className={errors.name ? "error" : ""}
                                            />
                                            {errors.name && <small className="error-text">{errors.name}</small>}
                                        </div>

                                        {/* Email Field */}
                                        <div className="col-sm-6">
                                            <label htmlFor="email" className="text-white">Your Email*</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                className={errors.email ? "error" : ""}
                                            />
                                            {errors.email && <small className="error-text">{errors.email}</small>}
                                        </div>

                                        {/* Phone Field */}
                                        <div className="col-sm-6">
                                            <label htmlFor="phone" className="text-white">Your Phone*</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter your phone number"
                                                className={errors.phone ? "error" : ""}
                                            />
                                            {errors.phone && <small className="error-text">{errors.phone}</small>}
                                        </div>

                                        {/* Subject Field */}
                                        <div className="col-sm-6">
                                            <label htmlFor="subject" className="text-white">Subject*</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Enter the subject"
                                                className={errors.subject ? "error" : ""}
                                            />
                                            {errors.subject && <small className="error-text">{errors.subject}</small>}
                                        </div>

                                        {/* Message Field */}
                                        <div className="col-12">
                                            <label htmlFor="message" className="text-white">Message*</label>
                                            <textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Write your message here"
                                                rows="5"
                                                className={errors.message ? "error" : ""}
                                            />
                                            {errors.message && <small className="error-text">{errors.message}</small>}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn-one">
                                                Send Message{" "}
                                                <i className="fa-regular fa-arrow-right-long" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Contactform;