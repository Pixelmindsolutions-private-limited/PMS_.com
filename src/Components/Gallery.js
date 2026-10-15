import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  FaImages,
  FaSpinner,
  FaCalendarAlt,
  FaPlay,
  FaVideo,
} from "react-icons/fa";

const API_BASE_URL = "http://localhost:4480";

const GALLERY_API = `${API_BASE_URL}/api/galleries`;

const getMediaUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
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

const titleFromFilename = (filename, fallback) => {
  if (!filename) return fallback;
  return filename.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
};

const getGalleryMedia = (gallery) => {
  // New API stores both images and videos in `media`.
  // Keep compatibility with older records that store images in `images`.
  const items = Array.isArray(gallery.media)
    ? gallery.media
    : Array.isArray(gallery.images)
      ? gallery.images
      : [];

  return items.map((item, index) => {
    const mediaType = item.mediaType || (item.mimetype?.startsWith("video/") ? "video" : "image");
    const originalName = item.originalName || item.filename || "";
    return {
      id: item._id || `${gallery._id}-${index}`,
      src: getMediaUrl(item.url),
      mediaType,
      category: gallery.galleryType,
      title: titleFromFilename(originalName, `${gallery.galleryType} Moment ${index + 1}`),
      alt: originalName || `${gallery.galleryType} gallery ${mediaType}`,
      desc: `${gallery.galleryType?.charAt(0).toUpperCase()}${gallery.galleryType?.slice(1)} moment`,
      createdAt: item.createdAt || gallery.createdAt,
      galleryId: gallery._id,
      filename: item.filename,
    };
  });
};

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = useMemo(
    () => [
      { id: "all", name: "All Moments" },
      { id: "office", name: "Office" },
      { id: "festival", name: "Festivals" },
      { id: "celebration", name: "Celebrations" },
    ],
    []
  );

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
      setGalleryMedia(galleryList.flatMap(getGalleryMedia));
    } catch (err) {
      console.error("Failed to fetch galleries:", err);
      setError(
        err.response?.data?.message ||
        "Unable to load gallery media. Please try again later."
      );
    } finally {
      setLoading(false);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const filteredMedia = useMemo(
    () =>
      selectedCategory === "all"
        ? galleryMedia
        : galleryMedia.filter((item) => item.category === selectedCategory),
    [galleryMedia, selectedCategory]
  );

  const photosCount = galleryMedia.filter((item) => item.mediaType !== "video").length;
  const videosCount = galleryMedia.filter((item) => item.mediaType === "video").length;

  const openLightbox = (item) => {
    setSelectedMedia(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setSelectedMedia(null);
    document.body.style.overflow = "";
  }, []);

  const navigateMedia = useCallback(
    (direction) => {
      if (!selectedMedia || filteredMedia.length <= 1) return;
      const currentIndex = filteredMedia.findIndex((item) => item.id === selectedMedia.id);
      if (currentIndex === -1) return;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredMedia.length
          : (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
      setSelectedMedia(filteredMedia[newIndex]);
    },
    [selectedMedia, filteredMedia]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedMedia) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") navigateMedia("next");
      if (event.key === "ArrowLeft") navigateMedia("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, closeLightbox, navigateMedia]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  const categoryLabel = (category) => {
    const labels = {
      festival: "Festival",
      celebration: "Celebration",
      office: "Office",
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
          content="Explore festivals, celebrations, office events, and memorable moments of PixelmindSolutions through our photo and video gallery."
        />
        <link rel="canonical" href="https://www.pixelmindsolutions.com/gallery" />
      </Helmet>

      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="banner__inner-page bg-image pt-100 pb-100"
          style={{ backgroundImage: 'url("/assets/images/banner/banner-inner-page.jpg")' }}
        >
          <div className="shape2 wow slideInLeft" data-wow-delay="00ms" data-wow-duration="1500ms">
            <img src="/assets/images/banner/inner-banner-shape2.png" alt="" />
          </div>
          <div className="shape1 wow slideInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
            <img src="/assets/images/banner/inner-banner-shape1.png" alt="" />
          </div>
          <div className="shape3 wow slideInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
            <img className="sway__animationX" src="/assets/images/banner/inner-banner-shape3.png" alt="" />
          </div>
          <div className="container">
            <h2 className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">Gallery</h2>
            <div className="breadcrumb-list wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
              <Link to="/">Home</Link>
              <span><i className="fa-regular fa-angles-right mx-2" /> Gallery</span>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-5 my-5">
          <div className="container">
            <div className="text-center mb-5">
              <span
                className="d-inline-block text-uppercase fw-bold mb-2"
                style={{ color: "#06b9aa", letterSpacing: "2px", fontSize: "13px" }}
              >
                Life at PixelmindSolutions
              </span>
              <h2 className="fw-bold mb-3">Our Memorable Moments</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
                From festivals and celebrations to office events, explore the photos and videos that bring our team together.
              </p>
              {!loading && (
                <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <FaImages style={{ color: "#06b9aa" }} />
                    <span className="text-muted"><strong>{photosCount}</strong> Photos</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FaVideo style={{ color: "#06b9aa" }} />
                    <span className="text-muted"><strong>{videosCount}</strong> Videos</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <FaCalendarAlt style={{ color: "#06b9aa" }} />
                    <span className="text-muted"><strong>{galleries.length}</strong> Galleries</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-10">
                <div className="d-flex flex-wrap justify-content-center gap-2 p-2 bg-light rounded-pill shadow-sm">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedMedia(null);
                        }}
                        className="btn px-3 px-md-4 py-2 rounded-pill fw-medium"
                        style={{
                          backgroundColor: isActive ? "#06cabc" : "transparent",
                          color: isActive ? "#fff" : "#6c757d",
                          border: "none",
                          boxShadow: isActive ? "0 4px 10px rgba(6, 202, 188, 0.3)" : "none",
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

            {loading && (
              <div className="text-center py-5">
                <FaSpinner className="mb-3 gallery-spinner" size={32} style={{ color: "#06cabc" }} />
                <h5 className="fw-semibold">Loading gallery...</h5>
                <p className="text-muted mb-0">Please wait while we load our memorable moments.</p>
              </div>
            )}

            {!loading && error && (
              <div className="text-center py-5">
                <FaImages size={42} className="text-muted opacity-50 mb-3" />
                <h4 className="text-dark">Unable to load gallery</h4>
                <p className="text-muted">{error}</p>
                <button type="button" className="btn btn-one px-4 py-2 rounded-pill" onClick={fetchGalleries}>Try Again</button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="row g-4">
                  {filteredMedia.map((item, index) => (
                    <div
                      key={item.id}
                      className="col-12 col-md-6 col-lg-4"
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                        transition: `all 0.6s ease ${Math.min(index * 0.06, 0.5)}s`,
                      }}
                    >
                      <button
                        type="button"
                        className="gallery-card position-relative overflow-hidden rounded-3 shadow-sm w-100 p-0 text-start"
                        onClick={() => openLightbox(item)}
                        aria-label={`View ${item.mediaType}: ${item.title}`}
                        style={{ display: "block", border: "none", background: "#f2f4f7", cursor: "pointer" }}
                      >
                        <div className="position-relative w-100 overflow-hidden" style={{ paddingBottom: "75%" }}>
                          {item.mediaType === "video" ? (
                            <video
                              src={item.src}
                              className="position-absolute top-0 start-0 w-100 h-100 gallery-media-thumb"
                              muted
                              playsInline
                              preload="metadata"
                              aria-label={item.alt}
                              onMouseEnter={(event) => event.currentTarget.play().catch(() => { })}
                              onMouseLeave={(event) => {
                                event.currentTarget.pause();
                                event.currentTarget.currentTime = 0;
                              }}
                              onError={(event) => { event.currentTarget.style.opacity = "0.3"; }}
                            />
                          ) : (
                            <img
                              src={item.src}
                              alt={item.alt}
                              loading="lazy"
                              className="position-absolute top-0 start-0 w-100 h-100 gallery-media-thumb"
                              onError={(event) => { event.currentTarget.style.opacity = "0.3"; }}
                            />
                          )}
                          {item.mediaType === "video" && (
                            <span
                              className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center text-white gallery-play-icon"
                              aria-hidden="true"
                            >
                              <FaPlay />
                            </span>
                          )}
                          <span className="position-absolute top-0 start-0 m-3 badge rounded-pill text-white" style={{ background: item.mediaType === "video" ? "#7149d8" : "#06b9aa" }}>
                            {item.mediaType === "video" ? <><FaVideo className="me-1" /> Video</> : <><FaImages className="me-1" /> Photo</>}
                          </span>
                          <div className="position-absolute top-0 end-0 m-3 p-2 rounded-circle text-white" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                            <FaSearchPlus />
                          </div>
                        </div>

                      </button>
                    </div>
                  ))}
                </div>

                {filteredMedia.length === 0 && (
                  <div className="text-center py-5">
                    <div className="mb-3 text-muted opacity-50"><FaImages size={48} /></div>
                    <h4 className="text-muted">
                      {galleryMedia.length === 0 ? "Our gallery is coming soon!" : "No media found in this category."}
                    </h4>
                    <p className="text-muted mb-0">
                      {galleryMedia.length === 0
                        ? "Please visit again soon to explore our memorable moments."
                        : "Choose another category to explore more photos and videos."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Media Lightbox */}
        {selectedMedia && (
          <div
            className="lightbox-modal position-fixed top-0 start-0 w-100 h-100"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMedia.mediaType} preview`}
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
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close media preview"
              className="position-absolute top-0 end-0 m-4 btn btn-link text-white p-0"
              style={{ fontSize: "2rem", zIndex: 10000, opacity: 0.8 }}
            >
              <FaTimes />
            </button>

            <div
              className="position-relative w-100 h-100 d-flex align-items-center justify-content-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => navigateMedia("prev")}
                aria-label="Previous media"
                disabled={filteredMedia.length <= 1}
                className="position-absolute start-0 top-50 translate-middle-y ms-2 ms-md-5 btn btn-link text-white p-0 gallery-nav-button"
              >
                <FaArrowLeft />
              </button>

              <div className="text-center px-4 px-md-5" style={{ maxWidth: "90vw", maxHeight: "90vh", width: "100%" }}>
                {selectedMedia.mediaType === "video" ? (
                  <video
                    key={selectedMedia.id}
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    playsInline
                    className="rounded shadow-lg gallery-lightbox-media"
                    style={{ maxHeight: "75vh", maxWidth: "100%", width: "auto", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="img-fluid rounded shadow-lg gallery-lightbox-media"
                    style={{ maxHeight: "75vh", maxWidth: "100%", objectFit: "contain", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                )}
                <div className="mt-3 text-white">
                  <span className="badge mb-2" style={{ backgroundColor: selectedMedia.mediaType === "video" ? "#7149d8" : "#06b9aa" }}>
                    {categoryLabel(selectedMedia.category)} · {selectedMedia.mediaType === "video" ? "Video" : "Photo"}
                  </span>
                  <h5 className="fw-bold mb-1">{selectedMedia.title}</h5>
                  {selectedMedia.createdAt && <small className="text-white-50">{formatDate(selectedMedia.createdAt)}</small>}
                  <div className="mt-2 small text-white-50">
                    {filteredMedia.findIndex((item) => item.id === selectedMedia.id) + 1} / {filteredMedia.length}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateMedia("next")}
                aria-label="Next media"
                disabled={filteredMedia.length <= 1}
                className="position-absolute end-0 top-50 translate-middle-y me-2 me-md-5 btn btn-link text-white p-0 gallery-nav-button"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-5 bg-light">
          <div className="container text-center">
            <h3 className="fw-bold mb-3">Want to be part of our story?</h3>
            <p className="text-muted mb-4">We are always looking for talented individuals to join our growing family.</p>
            <Link to="/contact" className="btn btn-one px-5 py-3 rounded-pill fw-bold shadow-sm">Join Our Team</Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @keyframes galleryFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gallerySpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .gallery-spinner { animation: gallerySpin 1s linear infinite; }
        .gallery-card { transition: box-shadow .25s ease, transform .25s ease; }
        .gallery-card:hover { box-shadow: 0 12px 30px rgba(0,0,0,.12) !important; }
        .gallery-card:focus-visible { outline: 3px solid #06cabc; outline-offset: 4px; }
        .gallery-media-thumb { object-fit: cover; transition: transform .6s cubic-bezier(.25,.46,.45,.94); }
        .gallery-card:hover .gallery-media-thumb { transform: scale(1.06); }
        .gallery-play-icon {
          width: 54px;
          height: 54px;
          background: rgba(0, 0, 0, 0.65);
          border: 2px solid rgba(255, 255, 255, 0.9);
          padding-left: 4px;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .gallery-card:hover .gallery-play-icon {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }

        .gallery-card .gallery-play-icon {
          pointer-events: none;
        }
        .gallery-nav-button { font-size: 2rem; opacity: .85; z-index: 2; }
        .gallery-nav-button:disabled { opacity: .25; }
        @media (max-width: 576px) {
          .gallery-nav-button { font-size: 1.35rem; }
          .gallery-lightbox-media { max-width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-card, .gallery-media-thumb { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Gallery;
