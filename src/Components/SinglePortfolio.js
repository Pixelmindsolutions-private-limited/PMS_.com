import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import bannerImage from '../assets/bg.png';

// Vite: import.meta.env.VITE_API_URL | CRA: process.env.REACT_APP_API_URL
const API_BASE = "https://pmswebbackend.pixelmindsolutions.com";

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

// Map an API portfolio object to what the UI uses
const normalizeProject = (p, fallbackType) => ({
    ...p,
    id: p._id,
    type: p.type || fallbackType,
    image: resolveImageUrl(p.image),
    icon: resolveImageUrl(p.icon),
    BackgroundImage: resolveImageUrl(p.BackgroundImage),
    gallery: (p.gallery || []).map(resolveImageUrl),
});

// Styles per API type
const typeMeta = {
    "website": {
        label: "Website",
        icon: "fa-globe",
        color: "#06cabc",
        colorDark: "#06cabc",
        lightBg: "#eff6ff",
        emoji: "🌐",
        screenshotLabel: "Website Screenshots",
        videoLabel: "Website Demo"
    },
    "mobile-app": {
        label: "Mobile App",
        icon: "fa-mobile-screen-button",
        color: "#06cabc",
        colorDark: "#06cabc",
        lightBg: "#eff6ff",
        emoji: "📱",
        screenshotLabel: "App Screenshots",
        videoLabel: "App Demo Video"
    },
    "web-app": {
        label: "Web App",
        icon: "fa-laptop-code",
        color: "#06cabc",
        colorDark: "#06cabc",
        lightBg: "#f5f3ff",
        emoji: "💻",
        screenshotLabel: "Web App Screenshots",
        videoLabel: "Web App Demo"
    },
    "other": {
        label: "Other",
        icon: "fa-layer-group",
        color: "#db2777",
        colorDark: "#be185d",
        lightBg: "#fdf2f8",
        emoji: "📊",
        screenshotLabel: "Project Materials",
        videoLabel: "Project Video"
    },
};

function SinglePortfolio() {
    const { id } = useParams();
    const [expanded, setExpanded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const scrollContainerRef = useRef(null);

    // Fetch the project + related projects whenever the id changes
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadProject = async () => {
            try {
                setLoading(true);
                setError("");
                setProject(null);
                setRelatedProjects([]);
                setExpanded(false);
                setActiveImage(0);

                const res = await fetch(`${API_BASE}/api/portfolios/${id}`, { signal });
                if (res.status === 404) {
                    setProject(null);
                    return;
                }
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();

                if (!json?.data) {
                    setProject(null);
                    return;
                }

                const current = normalizeProject(json.data);
                setProject(current);
                setLoading(false);

                // Related projects: same type, excluding the current one
                try {
                    const relRes = await fetch(`${API_BASE}/api/portfolios/get-portfolios`, { signal });
                    if (relRes.ok) {
                        const relJson = await relRes.json();
                        const grouped = relJson?.data || {};
                        const flat = Object.entries(grouped).flatMap(([type, list]) =>
                            (Array.isArray(list) ? list : []).map((p) => normalizeProject(p, type))
                        );
                        setRelatedProjects(
                            flat
                                .filter((item) => item.id !== current.id && item.type === current.type)
                                .slice(0, 6)
                        );
                    }
                } catch (relErr) {
                    if (relErr.name !== "AbortError") {
                        console.error("Failed to load related projects:", relErr);
                    }
                }
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error("Failed to load project:", err);
                setError("Unable to load this project. Please try again.");
            } finally {
                if (!signal.aborted) setLoading(false);
            }
        };

        loadProject();
        return () => controller.abort();
    }, [id]);

    // Safe defaults while project is null
    const meta = typeMeta[project?.type] || typeMeta.website;

    const screenshots =
        project?.gallery?.length > 0
            ? project.gallery
            : project?.image
                ? [project.image]
                : [];

    const isApp = project?.type === "mobile-app";
    const isWebsite = project?.type === "website" || project?.type === "web-app";

    const displayUrl = project?.websiteLink
        ? project.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "")
        : project?.title
            ? `www.${project.title.toLowerCase().replace(/\s+/g, "")}.com`
            : "";

    const description = project?.description || "";

    // ✅ Hook stays BEFORE any return
    useEffect(() => {
        if (!project) return;
        if (screenshots.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % screenshots.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [project, screenshots.length, isPaused]);

    const goToSlide = (index) => {
        setActiveImage(index);
    };

    // Scroll functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <h2>Something went wrong</h2>
                    <p className="text-secondary">{error}</p>
                    <button className="btn btn-primary mt-3 me-2" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                    <Link to="/portfolio" className="btn btn-outline-secondary mt-3">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <h2>Project not found</h2>
                    <Link to="/portfolio" className="btn btn-primary mt-3">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>{project.title} | Project Details - PixelMindSolutions</title>
                <meta name="description" content={description} />
            </Helmet>

            <Header />

            <main>

                {/* ── Premium Hero Banner ── */}
                <section
                    className="position-relative overflow-hidden"
                    style={{
                        backgroundImage: `url(${project.BackgroundImage || bannerImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        minHeight: "380px",
                        paddingTop: "80px",
                        paddingBottom: "60px"
                    }}
                >
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                            background: "rgba(15, 23, 42, 0.45)",
                            backdropFilter: "blur(15px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            zIndex: 1,
                        }}
                    ></div>
                    <div className="container position-relative" style={{ zIndex: 2 }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <div className="hero-content">

                                    <span className="d-inline-flex align-items-center rounded-pill px-4 py-2 mb-3" style={{ background: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>
                                        <i className={`fa-solid ${meta.icon} me-2`} style={{ color: "#06cabc" }}></i>
                                        <span className="fw-semibold text-white">
                                            {meta.label}
                                        </span>
                                    </span>

                                    <h1
                                        className="fw-bold display-4 mb-3"
                                        style={{
                                            color: "#fff",
                                            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {project.title}
                                    </h1>

                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                        {project.client && (
                                            <span className="text-white" style={{ color: "#06cabc" }}>
                                                <i className="fa-regular fa-user me-2" style={{ color: "#06cabc" }}></i>
                                                {project.client}
                                            </span>
                                        )}

                                        {project.category && (
                                            <span className="text-white">
                                                <i className="fa-regular fa-folder me-2" style={{ color: "#06cabc" }}></i>
                                                {project.category}
                                            </span>
                                        )}

                                        {project.year && (
                                            <span className="text-white">
                                                <i className="fa-regular fa-calendar me-2" style={{ color: "#06cabc" }}></i>
                                                {project.year}
                                            </span>
                                        )}

                                        {project.duration && (
                                            <span className="text-white">
                                                <i className="fa-regular fa-clock me-2" style={{ color: "#06cabc" }}></i>
                                                {project.duration}
                                            </span>
                                        )}
                                    </div>

                                    <nav aria-label="breadcrumb">
                                        <div className="d-flex align-items-center flex-wrap">
                                            <Link
                                                to="/"
                                                className="text-white text-decoration-none fw-semibold"
                                            >
                                                Home
                                            </Link>
                                            <span className="mx-2" style={{ color: "#06cabc" }}>/</span>
                                            <Link
                                                to="/portfolio"
                                                className="text-white text-decoration-none"
                                                style={{ color: "#06cabc" }}
                                            >
                                                Portfolio
                                            </Link>
                                            <span className="mx-2" style={{ color: "#06cabc" }}>/</span>
                                            <span className="fw-bold" style={{ color: "#06cabc" }}>
                                                {project.title}
                                            </span>
                                        </div>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Back Button ── */}
                <div className="container mt-4">
                    <Link to="/portfolio" className="btn rounded-pill px-4 py-2 shadow-sm" style={{ background: "#f8fafc", color: "#1e293b", border: "2px solid #e2e8f0" }}>
                        <i className="fa-solid fa-arrow-left me-2"></i>Back to Portfolio
                    </Link>
                </div>

                {/* ── Main Content ── */}
                <section className="py-4">
                    <div className="container">

                        <div className="row g-4">

                            {/* ── Left Column: Device Preview ── */}
                            <div className="col-lg-7">

                                {/* Type badge sits above the frame — no overlap with the screenshot */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="rounded-pill px-3 py-2 text-white" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.colorDark})`, fontSize: "13px", fontWeight: "600" }}>
                                        <i className={`fa-solid ${meta.icon} me-1`}></i>
                                        {meta.label}
                                    </span>
                                </div>

                                {/* Device Mockup */}
                                <div
                                    className={`rounded-4 shadow-lg p-3 p-md-4 text-center ${isApp ? 'bg-gradient' : ''}`}
                                    style={{
                                        background: isApp ? 'radial-gradient(circle at 50% 15%, #eef2ff, #dbeafe 60%, #e0f2fe)' : 'linear-gradient(150deg, #f1f5f9, #e2e8f0)',
                                        border: '1px solid rgba(15,23,42,0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >

                                    {isApp ? (
                                        /* ── Mobile / App Mockup ── */
                                        <div className="mx-auto" style={{ width: "240px", height: "490px", background: "#111827", borderRadius: "38px", padding: "12px", boxShadow: "0 20px 45px rgba(15, 23, 42, 0.3)", position: "relative" }}>
                                            <div className="position-absolute top-0 start-50 translate-middle-x" style={{ width: "90px", height: "18px", background: "#111827", borderBottomLeftRadius: "14px", borderBottomRightRadius: "14px", zIndex: 2, top: "12px" }}></div>
                                            <div className="w-100 h-100 rounded-4 overflow-hidden" style={{ background: "#000" }}>
                                                <img
                                                    key={activeImage}
                                                    src={screenshots[activeImage] || project.image}
                                                    alt={project.title}
                                                    className="w-100 h-100"
                                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                                />
                                            </div>
                                            <div className="position-absolute start-50 translate-middle-x" style={{ bottom: "14px", width: "80px", height: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.6)" }}></div>
                                        </div>
                                    ) : isWebsite ? (
                                        /* ── Desktop / Website Mockup ── */
                                        <div className="w-100 rounded-4 overflow-hidden" style={{ background: "#fff", boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)", border: "1px solid rgba(15,23,42,0.06)" }}>
                                            <div className="d-flex align-items-center gap-2 px-3 py-2" style={{ background: "linear-gradient(180deg, #f4f6f8, #e9edf1)", borderBottom: "1px solid #e2e8f0" }}>
                                                <span className="rounded-circle" style={{ width: "11px", height: "11px", background: "#ff5f57" }}></span>
                                                <span className="rounded-circle" style={{ width: "11px", height: "11px", background: "#febc2e" }}></span>
                                                <span className="rounded-circle" style={{ width: "11px", height: "11px", background: "#28c840" }}></span>
                                                <div className="flex-grow-1 ms-2 px-3 py-1 rounded-pill small text-truncate d-flex align-items-center" style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#64748b", fontSize: "12px" }}>
                                                    <i className="fa-solid fa-lock me-2" style={{ fontSize: "10px" }}></i>
                                                    {displayUrl}
                                                </div>
                                            </div>
                                            <div className="position-relative" style={{ width: "100%", height: "500px", overflowY: "auto", overflowX: "hidden", background: "#fff" }}>
                                                <img
                                                    key={activeImage}
                                                    src={screenshots[activeImage] || project.image}
                                                    alt={project.title}
                                                    className="w-100"
                                                    style={{ display: "block", height: "auto", objectFit: "contain" }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        /* ── Generic Frame ── */
                                        <div className="position-relative" style={{ width: "100%", height: "500px", overflowY: "auto", overflowX: "hidden", background: "#fff" }}>
                                            <img
                                                key={activeImage}
                                                src={screenshots[activeImage] || project.image}
                                                alt={project.title}
                                                className="w-100"
                                                style={{ display: "block", height: "auto", objectFit: "contain" }}
                                            />
                                        </div>
                                    )}

                                    {/* ── Gallery Player Dots ── */}
                                    {screenshots.length > 1 && (
                                        <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
                                            {screenshots.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    aria-label={`Go to slide ${index + 1}`}
                                                    className="border-0 p-0 rounded-pill position-relative overflow-hidden"
                                                    style={{
                                                        width: activeImage === index ? "34px" : "28px",
                                                        height: "6px",
                                                        background: activeImage === index ? meta.color : "rgba(15, 23, 42, 0.15)",
                                                        cursor: "pointer",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    onClick={() => goToSlide(index)}
                                                >
                                                    {activeImage === index && (
                                                        <span
                                                            key={`progress-${activeImage}-${isPaused}`}
                                                            className="position-absolute top-0 start-0 h-100 rounded-pill"
                                                            style={{
                                                                background: meta.color,
                                                                width: "0%",
                                                                animation: `galleryProgress 3s linear ${isPaused ? 'paused' : 'forwards'}`,
                                                                borderRadius: "6px"
                                                            }}
                                                        ></span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Screenshot Gallery */}
                                {screenshots.length > 0 && (
                                    <div className="card border-0 rounded-4 shadow-sm mt-3 p-3">
                                        <h6 className="fw-bold mb-3" style={{ color: meta.color }}>
                                            <i className={`fa-solid ${meta.icon} me-2`}></i>
                                            {meta.screenshotLabel}
                                        </h6>
                                        <div className="row g-2">
                                            {screenshots.map((img, index) => (
                                                <div className={isApp ? 'col-3 col-sm-2' : 'col-3'} key={index}>
                                                    {isApp ? (
                                                        <div
                                                            className="mx-auto position-relative rounded-4"
                                                            style={{
                                                                aspectRatio: "9/17",
                                                                background: "#111827",
                                                                padding: "4px",
                                                                border: `3px solid ${activeImage === index ? meta.color : 'transparent'}`,
                                                                borderRadius: "16px",
                                                                cursor: "pointer",
                                                                transition: "all 0.3s ease"
                                                            }}
                                                            onClick={() => goToSlide(index)}
                                                        >
                                                            <div className="position-absolute top-0 start-50 translate-middle-x" style={{ width: "26px", height: "5px", borderRadius: "4px", background: "#111827", zIndex: 2, top: "6px" }}></div>
                                                            <img src={img} alt={`${project.title} ${index + 1}`} className="w-100 h-100 rounded-3" style={{ objectFit: "cover", objectPosition: "top" }} />
                                                        </div>
                                                    ) : isWebsite ? (
                                                        <div
                                                            className="w-100 rounded-3 overflow-hidden"
                                                            style={{
                                                                border: `3px solid ${activeImage === index ? meta.color : 'transparent'}`,
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                transition: "all 0.3s ease",
                                                                background: "#fff",
                                                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                                                            }}
                                                            onClick={() => goToSlide(index)}
                                                        >
                                                            <div className="d-flex align-items-center gap-1 px-2" style={{ height: "12px", background: "#f1f5f9" }}>
                                                                <span className="rounded-circle" style={{ width: "4px", height: "4px", background: "#cbd5e1" }}></span>
                                                                <span className="rounded-circle" style={{ width: "4px", height: "4px", background: "#cbd5e1" }}></span>
                                                                <span className="rounded-circle" style={{ width: "4px", height: "4px", background: "#cbd5e1" }}></span>
                                                            </div>
                                                            <img src={img} alt={`${project.title} ${index + 1}`} className="w-100" style={{ height: "58px", objectFit: "cover", objectPosition: "top" }} />
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={img}
                                                            alt={`${project.title} ${index + 1}`}
                                                            className="w-100 rounded-3"
                                                            style={{
                                                                height: "80px",
                                                                objectFit: "cover",
                                                                objectPosition: "top",
                                                                border: `3px solid ${activeImage === index ? meta.color : 'transparent'}`,
                                                                borderRadius: "10px",
                                                                cursor: "pointer",
                                                                transition: "all 0.3s ease"
                                                            }}
                                                            onClick={() => goToSlide(index)}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="card border-0 rounded-4 shadow-sm mt-3 p-3">
                                        <h6 className="fw-bold mb-3" style={{ color: meta.color }}>
                                            <i className="fa-solid fa-code me-2"></i>
                                            Technologies Used
                                        </h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {project.technologies.map((tech, index) => (
                                                <span key={index} className="bg-light border rounded-pill px-3 py-2" style={{ fontSize: "13px", fontWeight: "500", borderColor: "#e2e8f0 !important" }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Right Column: Project Details ── */}
                            <div className="col-lg-5">
                                <div className="card border-0 rounded-4 shadow-lg p-4" style={{ border: "1px solid #e8edf2" }}>

                                    <div className="d-flex align-items-start justify-content-between mb-2">
                                        <h3 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                                            {project.title}
                                        </h3>
                                        <span className="d-inline-flex align-items-center gap-1 rounded-pill px-2 py-1" style={{ background: "#fff7ed", color: "#d97706", fontWeight: "700", fontSize: "13px", border: "1px solid #fde68a" }}>
                                            <i className="fa-solid fa-star"></i> 4.9
                                        </span>
                                    </div>
                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                        {project.client && (
                                            <span className="small text-secondary">
                                                <i className="fa-regular fa-user me-1" style={{ color: meta.color }}></i>
                                                {project.client}
                                            </span>
                                        )}
                                        {project.category && (
                                            <span className="small text-secondary">
                                                <i className="fa-regular fa-folder me-1" style={{ color: meta.color }}></i>
                                                {project.category}
                                            </span>
                                        )}
                                        {project.duration && (
                                            <span className="small text-secondary">
                                                <i className="fa-regular fa-clock me-1" style={{ color: meta.color }}></i>
                                                {project.duration}
                                            </span>
                                        )}
                                    </div>

                                    <hr className="my-3" style={{ borderColor: "#e8edf2" }} />

                                    {/* Description */}
                                    <div className="overflow-auto" style={{ maxHeight: "200px" }}>
                                        <p className="text-secondary" style={{ fontSize: "15px", lineHeight: "1.8" }}>
                                            {expanded ? (project.fullDescription || description) : description}
                                            {(project.fullDescription && project.fullDescription.length > description.length) && (
                                                <button
                                                    onClick={() => setExpanded(!expanded)}
                                                    className="btn btn-link p-0 ms-1 text-decoration-none"
                                                    style={{ color: meta.color, fontWeight: "600", fontSize: "14px" }}
                                                >
                                                    {expanded ? 'Show Less' : 'Read More'}
                                                </button>
                                            )}
                                        </p>
                                    </div>

                                    {/* Challenges & Solution */}
                                    {(project.challenges || project.solution) && (
                                        <div className="mt-3">
                                            {project.challenges && (
                                                <div className="mb-2" style={{ paddingLeft: "12px", borderLeft: "2px solid #e2e8f0" }}>
                                                    <h6 className="fw-bold text-uppercase small text-secondary mb-1">
                                                        <i className="fa-solid fa-triangle-exclamation me-2" style={{ color: meta.color }}></i>
                                                        Challenges
                                                    </h6>
                                                    <p className="small text-secondary mb-0">{project.challenges}</p>
                                                </div>
                                            )}
                                            {project.solution && (
                                                <div style={{ paddingLeft: "12px", borderLeft: "2px solid #e2e8f0" }}>
                                                    <h6 className="fw-bold text-uppercase small text-secondary mb-1">
                                                        <i className="fa-solid fa-lightbulb me-2" style={{ color: meta.color }}></i>
                                                        Solution
                                                    </h6>
                                                    <p className="small text-secondary mb-0">{project.solution}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Features */}
                                    {project.features && project.features.length > 0 && (
                                        <div className="mt-3">
                                            <h6 className="fw-bold text-uppercase small text-secondary mb-2">
                                                <i className="fa-regular fa-star me-2" style={{ color: meta.color }}></i>
                                                Key Features
                                            </h6>
                                            <div className="row g-1">
                                                {project.features.map((feature, index) => (
                                                    <div className="col-6" key={index}>
                                                        <span className="d-flex align-items-center gap-1 small text-secondary" style={{ transition: "all 0.3s ease" }}>
                                                            <i className="fa-solid fa-check-circle" style={{ color: meta.color, fontSize: "12px" }}></i>
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="mt-4 pt-3 border-top" style={{ borderColor: "#e8edf2" }}>
                                        <div className="d-flex flex-wrap gap-2">
                                            {project.websiteLink && (
                                                <a
                                                    href={project.websiteLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn rounded-pill px-4 text-white border-0"
                                                    style={{ background: "linear-gradient(135deg, #06cabc, #2e77b0)" }}
                                                >
                                                    <i className="fa-solid fa-globe me-2"></i>Visit Website
                                                </a>
                                            )}
                                            {project.playstoreLink && (
                                                <a
                                                    href={project.playstoreLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-success rounded-pill px-4"
                                                >
                                                    <i className="fa-brands fa-google-play me-2"></i>Play Store
                                                </a>
                                            )}
                                            {project.appstoreLink && (
                                                <a
                                                    href={project.appstoreLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-dark rounded-pill px-4"
                                                >
                                                    <i className="fa-brands fa-apple me-2"></i>App Store
                                                </a>
                                            )}
                                        </div>
                                        <div className="share-buttons mt-3 d-flex align-items-center">
                                            <span className="small text-secondary me-2">Share:</span>
                                            <a href="#" className="me-2 d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: "32px", height: "32px", background: "#f1f5f9", color: "#64748b", fontSize: "15px", transition: "all 0.3s ease" }}><i className="fa-brands fa-facebook"></i></a>
                                            <a href="#" className="me-2 d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: "32px", height: "32px", background: "#f1f5f9", color: "#64748b", fontSize: "15px", transition: "all 0.3s ease" }}><i className="fa-brands fa-twitter"></i></a>
                                            <a href="#" className="me-2 d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: "32px", height: "32px", background: "#f1f5f9", color: "#64748b", fontSize: "15px", transition: "all 0.3s ease" }}><i className="fa-brands fa-linkedin"></i></a>
                                            <a href="#" className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: "32px", height: "32px", background: "#f1f5f9", color: "#64748b", fontSize: "15px", transition: "all 0.3s ease" }}><i className="fa-regular fa-envelope"></i></a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* ── Related Projects Section with Horizontal Scroll ── */}
                        {relatedProjects.length > 0 && (
                            <section className="mt-5 pt-4" style={{ borderTop: "2px solid #e8edf2" }}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div>
                                                <h4 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                                                    <i className={`fa-solid ${meta.icon} me-2`} style={{ color: meta.color }}></i>
                                                    Related {meta.label} Projects
                                                </h4>
                                                <p className="text-secondary small mb-0">Explore more projects in the same category</p>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={scrollLeft}
                                                    className="btn rounded-circle border-0 d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        background: "#f1f5f9",
                                                        color: "#1e293b",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    aria-label="Scroll left"
                                                >
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                </button>
                                                <button
                                                    onClick={scrollRight}
                                                    className="btn rounded-circle border-0 d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        background: meta.color,
                                                        color: "#fff",
                                                        transition: "all 0.3s ease"
                                                    }}
                                                    aria-label="Scroll right"
                                                >
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    ref={scrollContainerRef}
                                    className="d-flex gap-4 overflow-auto pb-3"
                                    style={{
                                        scrollbarWidth: "thin",
                                        scrollbarColor: `${meta.color} #e2e8f0`,
                                        overflowX: "auto",
                                        overflowY: "hidden",
                                        WebkitOverflowScrolling: "touch",
                                        scrollSnapType: "x mandatory",
                                        msOverflowStyle: "none"
                                    }}
                                >
                                    {relatedProjects.map((related) => {
                                        const relMeta = typeMeta[related.type] || typeMeta.website;
                                        const relDesc = related.description || "";
                                        return (
                                            <div
                                                key={related.id}
                                                className="flex-shrink-0"
                                                style={{
                                                    width: "280px",
                                                    scrollSnapAlign: "start"
                                                }}
                                            >
                                                <Link
                                                    to={`/portfolio/${related.id}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100" style={{ border: "1px solid rgba(15,23,42,0.06)", transition: "all 0.3s ease" }}>
                                                        <div className="position-relative overflow-hidden" style={{ background: "#f8fafc" }}>
                                                            <img
                                                                src={related.image}
                                                                alt={related.title}
                                                                className="w-100"
                                                                style={{
                                                                    height: "180px",
                                                                    objectFit: "cover",
                                                                    transition: "transform 0.5s ease"
                                                                }}
                                                            />
                                                            <span
                                                                className="position-absolute top-0 end-0 m-3 rounded-pill px-3 py-1"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${relMeta.color}, ${relMeta.colorDark})`,
                                                                    color: "#fff",
                                                                    fontSize: "11px",
                                                                    fontWeight: "600",
                                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                                                                }}
                                                            >
                                                                <i className={`fa-solid ${relMeta.icon} me-1`}></i>
                                                                {relMeta.label}
                                                            </span>
                                                        </div>
                                                        <div className="card-body p-3">
                                                            <h6 className="fw-bold mb-2" style={{ color: "#1e293b", fontSize: "14px" }}>
                                                                {related.title}
                                                            </h6>
                                                            <p className="text-secondary small mb-3" style={{ fontSize: "13px" }}>
                                                                {relDesc.length > 60 ? `${relDesc.substring(0, 60)}...` : relDesc}
                                                            </p>
                                                            <div className="d-flex flex-wrap gap-1 mb-2">
                                                                {(related.technologies || []).slice(0, 2).map((tech, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="badge bg-light text-secondary border rounded-pill px-2 py-1"
                                                                        style={{ fontSize: "9px" }}
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                                {(related.technologies || []).length > 2 && (
                                                                    <span className="badge bg-light text-secondary border rounded-pill px-2 py-1" style={{ fontSize: "9px" }}>
                                                                        +{related.technologies.length - 2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-primary small fw-semibold" style={{ color: meta.color }}>
                                                                View Project <i className="fa-solid fa-arrow-right ms-1"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Custom scrollbar styling */}
                                <style>{`
                                    .d-flex::-webkit-scrollbar {
                                        height: 6px;
                                    }
                                    .d-flex::-webkit-scrollbar-track {
                                        background: #e2e8f0;
                                        border-radius: 10px;
                                    }
                                    .d-flex::-webkit-scrollbar-thumb {
                                        background: ${meta.color};
                                        border-radius: 10px;
                                    }
                                    .d-flex::-webkit-scrollbar-thumb:hover {
                                        background: ${meta.colorDark};
                                    }
                                    .btn:hover {
                                        transform: scale(1.1);
                                    }
                                    .card:hover {
                                        transform: translateY(-5px);
                                        box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
                                        border-color: ${meta.color} !important;
                                    }
                                    .card:hover img {
                                        transform: scale(1.05);
                                    }
                                `}</style>
                            </section>
                        )}

                    </div>
                </section>

                {/* ── Counter Section ── */}
                <section className="py-5">
                    <div className="container">
                        <div className="p-4 p-md-5 rounded-4 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #06cabc 0%, #2e77b0 100%)" }}>
                            <div className="text-center mb-4">
                                <h3 className="text-white fw-bold">Our Achievements</h3>
                                <p className="text-white-50">Delivering excellence across all projects</p>
                            </div>
                            <div className="row g-4 justify-content-center">
                                {[
                                    { count: '60', label: 'Satisfied Clients', icon: 'fa-user-check' },
                                    { count: '50', label: 'Finished Projects', icon: 'fa-check-circle' },
                                    { count: '20', label: 'Skilled Experts', icon: 'fa-users' }
                                ].map((c, idx) => (
                                    <div className="col-12 col-sm-4 col-md-4" key={idx}>
                                        <div className="text-center p-3 rounded-3" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(5px)", transition: "all 0.3s ease" }}>
                                            <i className={`fa-solid ${c.icon} text-white-50 mb-2`} style={{ fontSize: "24px" }}></i>
                                            <h3 className="text-white fw-bold mb-1 display-6">{c.count}+</h3>
                                            <p className="text-white-50 mb-0 small">{c.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />

            {/* Only keyframe animations needed */}
            <style>{`
                @keyframes pulseDot {
                    0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
                    70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
                    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
                }

                @keyframes galleryProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }

                .hero-content {
                    animation: fadeInDown 0.8s ease;
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .share-link:hover {
                    transform: translateY(-3px);
                    color: #fff !important;
                    background: #06cabc;
                }

                .feature-item:hover {
                    transform: translateX(5px);
                    color: #06cabc !important;
                }
            `}</style>
        </div>
    );
}

export default SinglePortfolio;