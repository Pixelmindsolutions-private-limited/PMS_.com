
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {
  FaSearchPlus,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaExpand,
  FaImages,
  FaSpinner,
  FaCalendarAlt,
} from "react-icons/fa";

const API_BASE_URL = (
  process.env.REACT_APP_API_URL ||
  "https://pmswebbackend.pixelmindsolutions.com"
).replace(/\/+$/, "");

const GALLERY_API = `${API_BASE_URL}/api/galleries`;

const getImageUrl = (url) => {
  if (!url) return "";

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${API_BASE_URL}/${url.replace(/^\/+/, "")}`;
};

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [galleries, setGalleries] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { id: "all", name: "All Moments" },
    { id: "office", name: "Office" },
    { id: "festival", name: "Festivals" },
    { id: "celebration", name: "Celebrations" },    
  ];

  const fetchGalleries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(GALLERY_API);
      const result = response.data;

      const galleryList = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      setGalleries(galleryList);

      // Convert the API gallery structure into the format
      // expected by the existing gallery grid and lightbox.
      const formattedImages = galleryList.flatMap((gallery) =>
        (gallery.images || []).map((image, index) => ({
          id: image._id || `${gallery._id}-${index}`,
          src: getImageUrl(image.url),
          category: gallery.galleryType,
          title:
            image.originalName?.replace(/\.[^/.]+$/, "") ||
            `${gallery.galleryType} Moment ${index + 1}`,
          alt:
            image.originalName ||
            `${gallery.galleryType} gallery image`,
          desc: `${gallery.galleryType.charAt(0).toUpperCase()}${gallery.galleryType.slice(1)} ${
            gallery.galleryType === "anniversary"
              ? "Anniversary"
              : gallery.galleryType === "festival"
                ? "Celebration"
                : "Moment"
          }`,
          createdAt: image.createdAt || gallery.createdAt,
          ratio: "normal",
          galleryId: gallery._id,
        }))
      );

      setGalleryImages(formattedImages);
    } catch (err) {
      console.error("Failed to fetch galleries:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load gallery images. Please try again later."
      );
    } finally {
      setLoading(false);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter(
          (image) => image.category === selectedCategory
        );

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  }, []);

  const navigateImage = useCallback(
    (direction) => {
      if (!selectedImage || filteredImages.length <= 1) return;

      const currentIndex = filteredImages.findIndex(
        (image) => image.id === selectedImage.id
      );

      if (currentIndex === -1) return;

      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredImages.length
          : (currentIndex - 1 + filteredImages.length) %
            filteredImages.length;

      setSelectedImage(filteredImages[newIndex]);
    },
    [selectedImage, filteredImages]
  );

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") navigateImage("next");
      if (event.key === "ArrowLeft") navigateImage("prev");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, closeLightbox, navigateImage]);

  // Restore body scrolling if the page unmounts with the lightbox open.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const categoryLabel = (category) => {
    const labels = {
      festival: "Festival",
      celebration: "Celebration",
      anniversary: "Anniversary",
    };

    return labels[category] || category;
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <title>Gallery | PixelmindSolutions - Life at PMS</title>
        <meta
          name="description"
          content="Explore the festivals, celebrations, anniversaries, and memorable moments of PixelmindSolutions through our photo gallery."
        />
        <link
          rel="canonical"
          href="https://www.pixelmindsolutions.com/gallery"
        />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section
          className="banner__inner-page bg-image pt-100 pb-100"
          style={{
            backgroundImage:
              'url("/assets/images/banner/banner-inner-page.jpg")',
          }}
        >
          <div
            className="shape2 wow slideInLeft"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <img
              src="/assets/images/banner/inner-banner-shape2.png"
              alt=""
            />
          </div>

          <div
            className="shape1 wow slideInLeft"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <img
              src="/assets/images/banner/inner-banner-shape1.png"
              alt=""
            />
          </div>

          <div
            className="shape3 wow slideInRight"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <img
              className="sway__animationX"
              src="/assets/images/banner/inner-banner-shape3.png"
              alt=""
            />
          </div>

          <div className="container">
            <h2
              className="wow fadeInUp"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              Gallery
            </h2>

            <div
              className="breadcrumb-list wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <Link to="/">Home</Link>
              <span>
                <i className="fa-regular fa-angles-right mx-2" />
                Gallery
              </span>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-5 my-5">
          <div className="container">
            {/* Gallery introduction */}
            <div className="text-center mb-5">
              <span
                className="d-inline-block text-uppercase fw-bold mb-2"
                style={{
                  color: "#06b9aa",
                  letterSpacing: "2px",
                  fontSize: "13px",
                }}
              >
                Life at PixelmindSolutions
              </span>

              <h2 className="fw-bold mb-3">Our Memorable Moments</h2>

              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "650px" }}
              >
                From festivals and celebrations to company anniversaries,
                explore the moments that bring our team together.
              </p>

              {!loading && (
                <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <FaImages style={{ color: "#06b9aa" }} />
                    <span className="text-muted">
                      <strong>{galleryImages.length}</strong> Photos
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <FaCalendarAlt style={{ color: "#06b9aa" }} />
                    <span className="text-muted">
                      <strong>{galleries.length}</strong> Galleries
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="d-flex flex-wrap justify-content-center gap-2 p-2 bg-light rounded-pill shadow-sm">
                  {categories.map((category) => {
                    const isActive =
                      selectedCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedImage(null);
                        }}
                        className="btn px-3 px-md-4 py-2 rounded-pill fw-medium"
                        style={{
                          backgroundColor: isActive
                            ? "#06cabc"
                            : "transparent",
                          color: isActive ? "#fff" : "#6c757d",
                          border: "none",
                          boxShadow: isActive
                            ? "0 4px 10px rgba(6, 202, 188, 0.3)"
                            : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-5">
                <FaSpinner
                  className="mb-3"
                  size={32}
                  style={{
                    color: "#06cabc",
                    animation: "gallerySpin 1s linear infinite",
                  }}
                />

                <h5 className="fw-semibold">Loading gallery...</h5>

                <p className="text-muted mb-0">
                  Please wait while we load our memorable moments.
                </p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="text-center py-5">
                <div className="mb-3">
                  <FaImages size={42} className="text-muted opacity-50" />
                </div>

                <h4 className="text-dark">Unable to load gallery</h4>

                <p className="text-muted">{error}</p>

                <button
                  type="button"
                  className="btn btn-one px-4 py-2 rounded-pill"
                  onClick={fetchGalleries}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Gallery Grid */}
            {!loading && !error && (
              <>
                <div className="row g-4">
                  {filteredImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="col-12 col-md-6 col-lg-4"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded
                          ? "translateY(0)"
                          : "translateY(20px)",
                        transition: `all 0.6s ease ${Math.min(
                          index * 0.06,
                          0.5
                        )}s`,
                      }}
                    >
                      <button
                        type="button"
                        className="gallery-card position-relative overflow-hidden rounded-3 shadow-sm w-100 p-0 text-start"
                        onClick={() => openLightbox(image)}
                        aria-label={`View ${image.title}`}
                        style={{
                          display: "block",
                          border: "none",
                          background: "#f2f4f7",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className="position-relative w-100 overflow-hidden"
                          style={{ paddingBottom: "75%" }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              objectFit: "cover",
                              transition:
                                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            }}
                            onMouseEnter={(event) => {
                              event.currentTarget.style.transform =
                                "scale(1.08)";
                            }}
                            onMouseLeave={(event) => {
                              event.currentTarget.style.transform =
                                "scale(1)";
                            }}
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.style.display = "none";
                            }}
                          />

                          
                          {/* Expand icon */}
                          <div
                            className="position-absolute top-0 end-0 m-3 p-2 rounded-circle text-white"
                            style={{
                              background: "rgba(255,255,255,0.2)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            <FaSearchPlus />
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredImages.length === 0 && (
                  <div className="text-center py-5">
                    <div className="mb-3 text-muted opacity-50">
                      <FaImages size={48} />
                    </div>

                    <h4 className="text-muted">
                      {galleryImages.length === 0
                        ? "Our gallery is coming soon!"
                        : "No images found in this category."}
                    </h4>

                    <p className="text-muted mb-0">
                      {galleryImages.length === 0
                        ? "Please visit again soon to explore our memorable moments."
                        : "Choose another category to explore more photos."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="lightbox-modal position-fixed top-0 start-0 w-100 h-100"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(15px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "galleryFadeIn 0.3s ease-out",
            }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image preview"
              className="position-absolute top-0 end-0 m-4 btn btn-link text-white p-0"
              style={{
                fontSize: "2rem",
                zIndex: 10000,
                opacity: 0.8,
              }}
            >
              <FaTimes />
            </button>

            <div
              className="position-relative w-100 h-100 d-flex align-items-center justify-content-center"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Previous */}
              <button
                type="button"
                onClick={() => navigateImage("prev")}
                aria-label="Previous image"
                disabled={filteredImages.length <= 1}
                className="position-absolute start-0 top-50 translate-middle-y ms-2 ms-md-5 btn btn-link text-white p-0"
                style={{
                  fontSize: "2rem",
                  opacity: 0.8,
                  zIndex: 2,
                }}
              >
                <FaArrowLeft />
              </button>

              {/* Selected image */}
              <div
                className="text-center px-4 px-md-5"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="img-fluid rounded shadow-lg"
                  style={{
                    maxHeight: "75vh",
                    maxWidth: "100%",
                    objectFit: "contain",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />

                {/* <div className="mt-3 text-white">
                  <span
                    className="badge mb-2"
                    style={{ backgroundColor: "#06b9aa" }}
                  >
                    {categoryLabel(selectedImage.category)}
                  </span>

                  <h3 className="fw-bold mb-1">
                    {selectedImage.title}
                  </h3>

                  <p className="text-white-50 mb-1">
                    {selectedImage.desc}
                  </p>

                  {selectedImage.createdAt && (
                    <small className="text-white-50">
                      {formatDate(selectedImage.createdAt)}
                    </small>
                  )}

                  <div className="mt-2 small text-white-50">
                    {filteredImages.findIndex(
                      (image) => image.id === selectedImage.id
                    ) + 1}{" "}
                    / {filteredImages.length}
                  </div>
                </div> */}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={() => navigateImage("next")}
                aria-label="Next image"
                disabled={filteredImages.length <= 1}
                className="position-absolute end-0 top-50 translate-middle-y me-2 me-md-5 btn btn-link text-white p-0"
                style={{
                  fontSize: "2rem",
                  opacity: 0.8,
                  zIndex: 2,
                }}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-5 bg-light">
          <div className="container text-center">
            <h3 className="fw-bold mb-3">
              Want to be part of our story?
            </h3>

            <p className="text-muted mb-4">
              We are always looking for talented individuals to join our
              growing family.
            </p>

            <Link
              to="/contact"
              className="btn btn-one px-5 py-3 rounded-pill fw-bold shadow-sm"
            >
              Join Our Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gallerySpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .gallery-card:focus-visible {
          outline: 3px solid #06cabc;
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-card,
          .gallery-card img {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Gallery;
