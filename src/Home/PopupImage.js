import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import offerimage from '../assets/Home/Offer.png';
// Array of images - add your images here
const popupImages = [
    {
        id: 1,
        src: offerimage,
        alt: "Special Offer 1"
    },
    // {
    //     id: 2,
    //     src: offerimage1,
    //     alt: "Special Offer 2"
    // }
];

const PopupImage = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef();
    const timerRef = useRef();
    const autoRotateRef = useRef();

    // Check if we're on the home route
    const isHomeRoute = location.pathname === '/';

    // Close popup function
    const closePopup = useCallback(() => {
        setIsOpen(false);
        document.body.classList.remove('overflow-hidden');
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }
    }, []);

    // Handle outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closePopup();
            }
        };

        if (isOpen) {
            document.body.classList.add('overflow-hidden');
            document.addEventListener("mousedown", handleOutsideClick);

            // Auto-rotate images every 2 seconds if multiple images
            if (popupImages.length > 1) {
                autoRotateRef.current = setInterval(() => {
                    setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
                }, 2000);
            }
        } else {
            document.body.classList.remove('overflow-hidden');
            if (autoRotateRef.current) {
                clearInterval(autoRotateRef.current);
            }
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.body.classList.remove('overflow-hidden');
            if (autoRotateRef.current) {
                clearInterval(autoRotateRef.current);
            }
        };
    }, [isOpen, closePopup]);

    // Show popup on home route only - limited to 3 times
    useEffect(() => {
        // Only show on home route
        if (!isHomeRoute) return;

        // Get the current count from sessionStorage
        let popupCount = parseInt(sessionStorage.getItem("popupImageCount") || "0");

        // Check if we've shown it less than 3 times
        if (popupCount < 5) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                // Increment the count
                popupCount += 1;
                sessionStorage.setItem("popupImageCount", popupCount.toString());
                // Also set a flag for current session
                sessionStorage.setItem("popupImageShown", "true");
            }, 2000); // Show after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [isHomeRoute]);

    // Navigate to next/previous image
    const nextImage = useCallback((e) => {
        e.stopPropagation();
        if (popupImages.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
            resetAutoRotate();
        }
    }, []);

    const prevImage = useCallback((e) => {
        e.stopPropagation();
        if (popupImages.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + popupImages.length) % popupImages.length);
            resetAutoRotate();
        }
    }, []);

    // Reset auto-rotate timer
    const resetAutoRotate = useCallback(() => {
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }
        if (isOpen && popupImages.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
            }, 2000);
        }
    }, [isOpen]);

    // Pause auto-rotate on hover
    const pauseAutoRotate = useCallback(() => {
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }
    }, []);

    // Resume auto-rotate on mouse leave
    const resumeAutoRotate = useCallback(() => {
        if (isOpen && popupImages.length > 1) {
            if (autoRotateRef.current) {
                clearInterval(autoRotateRef.current);
            }
            autoRotateRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
            }, 2000);
        }
    }, [isOpen]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (autoRotateRef.current) {
                clearInterval(autoRotateRef.current);
            }
        };
    }, []);

    if (!isOpen || popupImages.length === 0 || !isHomeRoute) return null;

    const currentImage = popupImages[currentImageIndex];
    const isMultiple = popupImages.length > 1;

    return (
        <>
            {/* Overlay */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.28)",
                    backdropFilter: "blur(2px)",
                    zIndex: 99999,
                    padding: "20px",
                    animation: "fadeIn 0.3s ease-out",
                    cursor: "pointer"
                }}
                onClick={closePopup}
            >
                {/* Modal */}
                <div
                    ref={modalRef}
                    className="position-relative"
                    style={{
                        maxWidth: "500px",
                        width: "100%",
                        maxHeight: "90vh",
                        borderRadius: "16px",
                        backgroundColor: "#fff",
                        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                        overflow: "hidden",
                        animation: "scaleUp 0.3s ease-out",
                        transformOrigin: "center",
                        cursor: "default"
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={pauseAutoRotate}
                    onMouseLeave={resumeAutoRotate}
                >
                    {/* Close Button */}
                    <button
                        onClick={closePopup}
                        aria-label="Close popup"
                        className="position-absolute d-flex align-items-center justify-content-center border-0"
                        style={{
                            top: "12px",
                            right: "12px",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "#fff",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            zIndex: 10,
                            backdropFilter: "blur(4px)"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                            e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>

                    {/* Image Container */}
                    <div
                        className="position-relative w-100 d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: "#f5f5f5",
                            minHeight: "300px",
                            transition: "opacity 0.5s ease-in-out"
                        }}
                    >
                        <img
                            key={currentImageIndex}
                            src={currentImage.src}
                            alt={currentImage.alt}
                            className="w-100 h-auto d-block"
                            style={{
                                maxHeight: "70vh",
                                objectFit: "contain",
                                animation: "fadeInImage 0.5s ease-in-out"
                            }}
                            loading="lazy"
                        />



                        {/* Dot Indicators (if multiple images) */}
                        {isMultiple && (
                            <div
                                className="position-absolute d-flex gap-2"
                                style={{
                                    bottom: "16px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 5
                                }}
                            >
                                {popupImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                            resetAutoRotate();
                                        }}
                                        aria-label={`Go to image ${index + 1}`}
                                        className="border-0 p-0"
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            backgroundColor: index === currentImageIndex ? "#fff" : "rgba(255,255,255,0.5)",
                                            transition: "all 0.3s",
                                            transform: index === currentImageIndex ? "scale(1.2)" : "scale(1)"
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Auto-rotate indicator */}
                        {isMultiple && (
                            <div
                                className="position-absolute"
                                style={{
                                    bottom: "40px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    gap: "4px",
                                    zIndex: 5
                                }}
                            >
                                <div
                                    style={{
                                        width: "30px",
                                        height: "2px",
                                        backgroundColor: "rgba(255,255,255,0.3)",
                                        borderRadius: "2px",
                                        overflow: "hidden"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "#fff",
                                            animation: "progressBar 2s linear infinite"
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style>
                {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scaleUp {
            from {
              transform: scale(0.8) translateY(20px);
              opacity: 0;
            }
            to {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeInImage {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes progressBar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }

          @media (max-width: 768px) {
            .popup-modal {
              max-width: 100% !important;
              border-radius: 16px !important;
              margin: 10px !important;
            }
            .popup-image {
              max-height: 50vh !important;
            }
          }
        `}
            </style>
        </>
    );
};

export default PopupImage;