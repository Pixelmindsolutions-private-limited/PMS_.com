import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import offerimage from "../assets/Home/Offer.png";

// ---- API config ----
// Vite: import.meta.env.VITE_API_URL | CRA: process.env.REACT_APP_API_URL
const API_BASE = "http://localhost:4480";

// Used only if the API fails or returns no active banners
const fallbackImages = [{ id: "fallback", src: offerimage, alt: "Special Offer" }];

// Your API returns "https://localhost:5000/..." which fails (localhost has no SSL).
// This normalises it to http and also handles relative paths.
const resolveImageUrl = (url) => {
    if (!url) return "";
    if (/^https?:\/\/localhost/i.test(url)) {
        return url.replace(/^https:\/\//i, "http://");
    }
    if (/^https?:\/\//i.test(url)) return url;
    return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
};

const PopupImage = ({ onClose }) => {
    const location = useLocation();
    const [popupImages, setPopupImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef();
    const timerRef = useRef();
    const autoRotateRef = useRef();

    const isHomeRoute = location.pathname === "/";

    // Fetch banners from API (home route only)
    useEffect(() => {
        if (!isHomeRoute) return;

        const controller = new AbortController();

        const fetchBanners = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/banners`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                const banners = (json?.data || [])
                    .filter((b) => b.isActive && b.image)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((b) => ({
                        id: b._id,
                        src: resolveImageUrl(b.image),
                        alt: b.title || "Special Offer",
                    }));

                setPopupImages(banners.length ? banners : fallbackImages);
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error("Failed to load banners:", err);
                setPopupImages(fallbackImages);
            } finally {
                if (!controller.signal.aborted) setImagesLoaded(true);
            }
        };

        fetchBanners();
        return () => controller.abort();
    }, [isHomeRoute]);

    // Close popup
    const closePopup = useCallback(() => {
        setIsOpen(false);
        document.body.classList.remove("overflow-hidden");
        if (timerRef.current) clearTimeout(timerRef.current);
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        if (onClose) onClose();
    }, [onClose]);

    // Start auto-rotate (2s) when multiple images
    const startAutoRotate = useCallback(() => {
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        if (popupImages.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
            }, 2000);
        }
    }, [popupImages.length]);

    // Outside click, scroll lock, auto-rotate
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closePopup();
            }
        };

        if (isOpen) {
            document.body.classList.add("overflow-hidden");
            document.addEventListener("mousedown", handleOutsideClick);
            startAutoRotate();
        } else {
            document.body.classList.remove("overflow-hidden");
            if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.body.classList.remove("overflow-hidden");
            if (autoRotateRef.current) clearInterval(autoRotateRef.current);
        };
    }, [isOpen, closePopup, startAutoRotate]);

    // Show popup on home route after banners are loaded - limited to 5 times per session
    useEffect(() => {
        if (!isHomeRoute || !imagesLoaded || popupImages.length === 0) return;

        let popupCount = parseInt(sessionStorage.getItem("popupImageCount") || "0", 10);

        if (popupCount < 5) {
            const timer = setTimeout(() => {
                setCurrentImageIndex(0);
                setIsOpen(true);
                popupCount += 1;
                sessionStorage.setItem("popupImageCount", popupCount.toString());
                sessionStorage.setItem("popupImageShown", "true");
            }, 3000); // Show after 3 seconds

            timerRef.current = timer;
            return () => clearTimeout(timer);
        }
    }, [isHomeRoute, imagesLoaded, popupImages.length]);

    // Next / previous image
    const nextImage = useCallback(
        (e) => {
            e.stopPropagation();
            if (popupImages.length > 1) {
                setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
                startAutoRotate();
            }
        },
        [popupImages.length, startAutoRotate]
    );

    const prevImage = useCallback(
        (e) => {
            e.stopPropagation();
            if (popupImages.length > 1) {
                setCurrentImageIndex(
                    (prev) => (prev - 1 + popupImages.length) % popupImages.length
                );
                startAutoRotate();
            }
        },
        [popupImages.length, startAutoRotate]
    );

    // Pause on hover / resume on leave
    const pauseAutoRotate = useCallback(() => {
        if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    }, []);

    const resumeAutoRotate = useCallback(() => {
        if (isOpen) startAutoRotate();
    }, [isOpen, startAutoRotate]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (autoRotateRef.current) clearInterval(autoRotateRef.current);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    if (!isOpen || popupImages.length === 0 || !isHomeRoute) return null;

    const currentImage = popupImages[currentImageIndex] || popupImages[0];
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
                    cursor: "pointer",
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
                        cursor: "default",
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
                            backdropFilter: "blur(4px)",
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
                            transition: "opacity 0.5s ease-in-out",
                        }}
                    >
                        <img
                            key={currentImage.id}
                            src={currentImage.src}
                            alt={currentImage.alt}
                            className="w-100 h-auto d-block"
                            style={{
                                maxHeight: "70vh",
                                objectFit: "contain",
                                animation: "fadeInImage 0.5s ease-in-out",
                            }}
                            onError={(e) => {
                                // If the API image fails to load, fall back to the local one
                                if (e.currentTarget.src !== offerimage) {
                                    e.currentTarget.src = offerimage;
                                }
                            }}
                        />

                        {/* Dot Indicators */}
                        {isMultiple && (
                            <div
                                className="position-absolute d-flex gap-2"
                                style={{
                                    bottom: "16px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 5,
                                }}
                            >
                                {popupImages.map((img, index) => (
                                    <button
                                        key={img.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                            startAutoRotate();
                                        }}
                                        aria-label={`Go to image ${index + 1}`}
                                        className="border-0 p-0"
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            backgroundColor:
                                                index === currentImageIndex
                                                    ? "#fff"
                                                    : "rgba(255,255,255,0.5)",
                                            transition: "all 0.3s",
                                            transform:
                                                index === currentImageIndex
                                                    ? "scale(1.2)"
                                                    : "scale(1)",
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Auto-rotate progress indicator */}
                        {isMultiple && (
                            <div
                                className="position-absolute"
                                style={{
                                    bottom: "40px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    gap: "4px",
                                    zIndex: 5,
                                }}
                            >
                                <div
                                    style={{
                                        width: "30px",
                                        height: "2px",
                                        backgroundColor: "rgba(255,255,255,0.3)",
                                        borderRadius: "2px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        key={currentImageIndex}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "#fff",
                                            animation: "progressBar 2s linear infinite",
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
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes scaleUp {
            from { transform: scale(0.8) translateY(20px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
          }

          @keyframes fadeInImage {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
            </style>
        </>
    );
};

export default PopupImage;