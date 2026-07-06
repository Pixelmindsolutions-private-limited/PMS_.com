import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import portfolioItems from '../Home/PortfolioData';

function SinglePortfolio() {
    const { id } = useParams();
    const [expanded, setExpanded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const foundProject = portfolioItems.find(item => item.id === parseInt(id));
        if (foundProject) {
            setProject(foundProject);
        }
        setLoading(false);
        setActiveImage(0);
    }, [id]);

    const typeMeta = {
        website: {
            label: 'Website',
            icon: 'fa-globe',
            color: '#2563eb',
            colorDark: '#1d4ed8',
            lightBg: '#eff6ff',
            emoji: '🌐',
            screenshotLabel: 'Website Screenshots',
        },
        app: {
            label: 'Mobile App',
            icon: 'fa-mobile-screen-button',
            color: '#059669',
            colorDark: '#047857',
            lightBg: '#ecfdf5',
            emoji: '📱',
            screenshotLabel: 'App Screenshots',
        },
        digital: {
            label: 'Digital Marketing',
            icon: 'fa-chart-line',
            color: '#db2777',
            colorDark: '#be185d',
            lightBg: '#fdf2f8',
            emoji: '📊',
            screenshotLabel: 'Marketing Materials',
        },
    };

    

    const meta = typeMeta[project.type] || typeMeta.website;
    const screenshots = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.image];
    const isApp = project.type === 'app';
    const isWebsite = project.type === 'website';

    const displayUrl = project.websiteLink
        ? project.websiteLink.replace(/^https?:\/\//, '').replace(/\/$/, '')
        : `www.${project.title.toLowerCase().replace(/\s+/g, '')}.com`;

    const initials = (project.testimonial?.name || '')
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    // ── Auto-scroll gallery player ──
    useEffect(() => {
        if (screenshots.length <= 1 || isPaused) return;
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % screenshots.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [screenshots.length, isPaused]);

    const goToSlide = (index) => {
        setActiveImage(index);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <h2>Project not found</h2>
                    <Link to="/portfolio" className="btn btn-primary mt-3">Back to Portfolio</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>{project.title} | Project Details - PixelMindSolutions</title>
                <meta name="description" content={project.description} />
            </Helmet>

            <Header />

            <main>

                {/* ── Premium Hero Banner ── */}
                <section className="hero-banner position-relative overflow-hidden">
                    <div className="container position-relative" style={{ zIndex: 2 }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <div className="hero-content">
                                    <span className="badge-glass d-inline-flex align-items-center rounded-pill px-4 py-2 mb-3">
                                        <i className={`fa-solid ${meta.icon} me-2`}></i>
                                        {meta.emoji} {meta.label}
                                    </span>
                                    <h1 className="text-white fw-bold display-4 mb-3">{project.title}</h1>
                                    <div className="d-flex flex-wrap gap-3 text-white-50 mb-3">
                                        <span><i className="fa-regular fa-user me-2"></i>{project.client}</span>
                                        <span><i className="fa-regular fa-folder me-2"></i>{project.category}</span>
                                        <span><i className="fa-regular fa-calendar me-2"></i>{project.year}</span>
                                        <span><i className="fa-regular fa-clock me-2"></i>{project.duration}</span>
                                    </div>
                                    <nav aria-label="breadcrumb">
                                        <div className="d-flex align-items-center flex-wrap">
                                            <Link to="/" className="text-dark text-decoration-none fw-semibold">
                                                Home
                                            </Link>

                                            <span className="mx-2 text-dark">/</span>

                                            <Link to="/portfolio" className="text-dark text-decoration-none fw-semibold">
                                                Portfolio
                                            </Link>

                                            <span className="mx-2 text-dark">/</span>

                                            <span className="text-black fw-bold">
                                                {project.title}
                                            </span>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-4 d-none d-lg-block">
                                <div className="row g-2">
                                    {Object.entries(project.results || {}).slice(0, 4).map(([key, value], idx) => (
                                        <div className="col-6" key={idx}>
                                            <div className="stat-glass p-3 rounded-4 text-center">
                                                <h3 className="text-white fw-bold mb-0">{value}</h3>
                                                <small className="text-white-50 text-uppercase" style={{ letterSpacing: '0.5px', fontSize: '11px' }}>{key}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-shape shape-1"></div>
                    <div className="hero-shape shape-2"></div>
                </section>

                {/* ── Back Button ── */}
                <div className="container mt-4">
                    <Link to="/portfolio" className="btn btn-back rounded-pill px-4 py-2 shadow-sm">
                        <i className="fa-solid fa-arrow-left me-2"></i>Back to Portfolio
                    </Link>
                </div>

                {/* ── Main Content ── */}
                <section className="py-4">
                    <div className="container">

                        <div className="row g-4">

                            {/* ── Left Column: Device Preview ── */}
                            <div className="col-lg-7">

                                {/* Type + Year badges sit above the frame — no overlap with the screenshot */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="badge-solid rounded-pill px-3 py-2" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.colorDark})` }}>
                                        <i className={`fa-solid ${meta.icon} me-1`}></i>
                                        {meta.label}
                                    </span>
                                    <span className="d-flex align-items-center gap-2">
                                        <span className="live-dot"></span>
                                        <span className="badge-solid-dark rounded-pill px-3 py-2">
                                            <i className="fa-regular fa-calendar me-1"></i>{project.year}
                                        </span>
                                    </span>
                                </div>

                                {/* Device Mockup */}
                                <div
                                    className={`preview-panel rounded-4 shadow-lg p-3 p-md-4 text-center ${isApp ? 'preview-panel-app' : 'preview-panel-web'}`}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >

                                    {isApp ? (
                                        /* ── Mobile / App Mockup ── */
                                        <div className="phone-frame mx-auto">
                                            <div className="phone-notch"></div>
                                            <div className="phone-screen">
                                                <img
                                                    key={activeImage}
                                                    src={screenshots[activeImage] || project.image}
                                                    alt={project.title}
                                                    className="phone-screen-img gallery-fade"
                                                />
                                            </div>
                                            <div className="phone-home-indicator"></div>
                                        </div>
                                    ) : isWebsite ? (
                                        /* ── Desktop / Website Mockup ── */
                                        <div className="browser-frame">
                                            <div className="browser-toolbar d-flex align-items-center gap-2 px-3 py-2">
                                                <span className="browser-dot" style={{ background: '#ff5f57' }}></span>
                                                <span className="browser-dot" style={{ background: '#febc2e' }}></span>
                                                <span className="browser-dot" style={{ background: '#28c840' }}></span>
                                                <div className="browser-address flex-grow-1 ms-2 px-3 py-1 rounded-pill small text-truncate d-flex align-items-center">
                                                    <i className="fa-solid fa-lock me-2" style={{ fontSize: '10px' }}></i>
                                                    {displayUrl}
                                                </div>
                                                {project.websiteLink && (
                                                    <a
                                                        href={project.websiteLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="browser-visit-icon d-none d-sm-inline-flex align-items-center justify-content-center rounded-circle ms-2"
                                                        title="Open live site"
                                                    >
                                                        <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '11px' }}></i>
                                                    </a>
                                                )}
                                            </div>
                                            <div className="browser-screen position-relative">
                                                <img
                                                    key={activeImage}
                                                    src={screenshots[activeImage] || project.image}
                                                    alt={project.title}
                                                    className="browser-screen-img gallery-fade"
                                                />
                                                {project.websiteLink && (
                                                    <a
                                                        href={project.websiteLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="browser-screen-overlay d-flex align-items-center justify-content-center text-decoration-none"
                                                    >
                                                        <span className="btn-view-live rounded-pill px-4 py-2">
                                                            <i className="fa-solid fa-arrow-up-right-from-square me-2"></i>
                                                            View Live Site
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        /* ── Generic Frame (Digital Marketing) ── */
                                        <div className="generic-frame">
                                            <img
                                                key={activeImage}
                                                src={screenshots[activeImage] || project.image}
                                                alt={project.title}
                                                className="generic-frame-img gallery-fade"
                                            />
                                        </div>
                                    )}

                                    {/* ── Gallery Player Dots ── */}
                                    {screenshots.length > 1 && (
                                        <div className="gallery-dots d-flex justify-content-center align-items-center gap-2 mt-3">
                                            {screenshots.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    aria-label={`Go to slide ${index + 1}`}
                                                    className={`gallery-dot ${activeImage === index ? 'gallery-dot-active' : ''}`}
                                                    style={activeImage === index ? { background: meta.color } : undefined}
                                                    onClick={() => goToSlide(index)}
                                                >
                                                    {activeImage === index && (
                                                        <span
                                                            key={`progress-${activeImage}-${isPaused}`}
                                                            className="gallery-dot-progress"
                                                            style={{
                                                                background: meta.color,
                                                                animationPlayState: isPaused ? 'paused' : 'running',
                                                            }}
                                                        ></span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Screenshot Gallery */}
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
                                                        className={`phone-thumb mx-auto ${activeImage === index ? 'active-thumb' : ''}`}
                                                        style={{ borderColor: activeImage === index ? meta.color : 'transparent' }}
                                                        onClick={() => goToSlide(index)}
                                                    >
                                                        <div className="phone-thumb-notch"></div>
                                                        <img src={img} alt={`${project.title} ${index + 1}`} className="phone-thumb-img" />
                                                    </div>
                                                ) : isWebsite ? (
                                                    <div
                                                        className={`browser-thumb ${activeImage === index ? 'active-thumb' : ''}`}
                                                        style={{ borderColor: activeImage === index ? meta.color : 'transparent' }}
                                                        onClick={() => goToSlide(index)}
                                                    >
                                                        <div className="browser-thumb-bar">
                                                            <span></span><span></span><span></span>
                                                        </div>
                                                        <img src={img} alt={`${project.title} ${index + 1}`} className="browser-thumb-img" />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={img}
                                                        alt={`${project.title} ${index + 1}`}
                                                        className={`generic-thumb ${activeImage === index ? 'active-thumb' : ''}`}
                                                        style={{ borderColor: activeImage === index ? meta.color : 'transparent' }}
                                                        onClick={() => goToSlide(index)}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Video Section (App Only) ── */}
                                {isApp && project.videoId && (
                                    <div className="card border-0 rounded-4 shadow-sm mt-3 overflow-hidden">
                                        {/* Header */}
                                        <div className="px-3 pt-3">
                                            <h6 className="fw-bold mb-0" style={{ color: meta.color }}>
                                                <i className="fa-solid fa-circle-play me-2"></i>
                                                {meta.videoLabel}
                                            </h6>
                                        </div>

                                        {/* Video */}
                                        <div className="ratio ratio-16x9 mt-3">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${project.videoId}?controls=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3&playsinline=1&showinfo=0`}
                                                title={`${project.title} Demo Video`}
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="border-0 rounded-bottom-4"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div className="card border-0 rounded-4 shadow-sm mt-3 p-3">
                                    <h6 className="fw-bold mb-3" style={{ color: meta.color }}>
                                        <i className="fa-solid fa-code me-2"></i>
                                        Technologies Used
                                    </h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {(project.technologies || []).map((tech, index) => (
                                            <span key={index} className="badge-tech bg-light border rounded-pill px-3 py-2">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Results */}
                                {project.results && Object.keys(project.results).length > 0 && (
                                    <div className="card border-0 rounded-4 shadow-sm mt-3 p-3" style={{ background: meta.lightBg }}>
                                        <h6 className="fw-bold mb-3" style={{ color: meta.color }}>
                                            <i className="fa-solid fa-chart-simple me-2"></i>
                                            Project Results
                                        </h6>
                                        <div className="row g-2">
                                            {Object.entries(project.results).map(([key, value], index) => (
                                                <div className="col-6 col-md-3" key={index}>
                                                    <div className="result-item text-center p-2 rounded-3">
                                                        <h4 className="fw-bold mb-0" style={{ color: meta.color }}>{value}</h4>
                                                        <small className="text-secondary">{key}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Right Column: Project Details ── */}
                            <div className="col-lg-5">
                                <div className="card details-card sticky-card border-0 rounded-4 shadow-lg p-4">

                                    <div className="d-flex align-items-start justify-content-between mb-2">
                                        <h3 className="fw-bold mb-0" style={{ color: '#1e293b' }}>
                                            {project.title}
                                        </h3>
                                        <span className="rating-chip d-inline-flex align-items-center gap-1 rounded-pill px-2 py-1">
                                            <i className="fa-solid fa-star"></i> 4.9
                                        </span>
                                    </div>
                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                        <span className="small text-secondary">
                                            <i className="fa-regular fa-user me-1" style={{ color: meta.color }}></i>
                                            {project.client}
                                        </span>
                                        <span className="small text-secondary">
                                            <i className="fa-regular fa-folder me-1" style={{ color: meta.color }}></i>
                                            {project.category}
                                        </span>
                                        <span className="small text-secondary">
                                            <i className="fa-regular fa-clock me-1" style={{ color: meta.color }}></i>
                                            {project.duration}
                                        </span>
                                    </div>

                                    <hr className="my-3" style={{ borderColor: '#e8edf2' }} />

                                    {/* Description */}
                                    <div className="description-wrapper">
                                        <p className="text-secondary" style={{ fontSize: '15px', lineHeight: '1.8' }}>
                                            {expanded ? (project.fullDescription || project.description) : project.description}
                                            {(project.fullDescription && project.fullDescription.length > project.description.length) && (
                                                <button
                                                    onClick={() => setExpanded(!expanded)}
                                                    className="btn btn-link p-0 ms-1 text-decoration-none"
                                                    style={{ color: meta.color, fontWeight: '600', fontSize: '14px' }}
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
                                                <div className="timeline-item mb-2">
                                                    <h6 className="fw-bold text-uppercase small text-secondary mb-1">
                                                        <i className="fa-solid fa-triangle-exclamation me-2" style={{ color: meta.color }}></i>
                                                        Challenges
                                                    </h6>
                                                    <p className="small text-secondary mb-0">{project.challenges}</p>
                                                </div>
                                            )}
                                            {project.solution && (
                                                <div className="timeline-item">
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
                                                        <span className="d-flex align-items-center gap-1 small text-secondary feature-item">
                                                            <i className="fa-solid fa-check-circle" style={{ color: meta.color, fontSize: '12px' }}></i>
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="mt-4 pt-3 border-top" style={{ borderColor: '#e8edf2' }}>
                                        <div className="d-flex flex-wrap gap-2">
                                            {project.websiteLink && (
                                                <a
                                                    href={project.websiteLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary-gradient rounded-pill px-4"
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
                                            <a href="#" className="share-link me-2"><i className="fa-brands fa-facebook"></i></a>
                                            <a href="#" className="share-link me-2"><i className="fa-brands fa-twitter"></i></a>
                                            <a href="#" className="share-link me-2"><i className="fa-brands fa-linkedin"></i></a>
                                            <a href="#" className="share-link"><i className="fa-regular fa-envelope"></i></a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* ── Testimonial ── */}
                        {project.testimonial && (
                            <div className="testimonial-wrapper mt-4 p-4 p-md-5 rounded-4 text-center position-relative">
                                <i className="fa-solid fa-quote-left mb-3" style={{ color: meta.color, fontSize: '40px', opacity: 0.25 }}></i>
                                <p className="fs-5 fst-italic text-secondary mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
                                    "{project.testimonial.text}"
                                </p>
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <span className="avatar-circle" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.colorDark})` }}>
                                        {initials}
                                    </span>
                                    <div className="text-start">
                                        <h6 className="fw-bold mb-0">{project.testimonial.name}</h6>
                                        <small className="text-secondary">{project.testimonial.position}</small>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                {/* ── Counter Section ── */}
                <section className="py-5">
                    <div className="container">
                        <div className="counter-wrapper p-4 p-md-5 rounded-4 position-relative overflow-hidden">
                            <div className="text-center mb-4">
                                <h3 className="text-white fw-bold">Our Achievements</h3>
                                <p className="text-white-50">Delivering excellence across all projects</p>
                            </div>
                            <div className="row g-4 justify-content-center">
                                {[
                                    { count: '499', label: 'Satisfied Clients', icon: 'fa-user-check' },
                                    { count: '25', label: 'Finished Projects', icon: 'fa-check-circle' },
                                    { count: '50', label: 'Skilled Experts', icon: 'fa-users' },
                                    { count: '30', label: 'Media Posts', icon: 'fa-bullhorn' },
                                ].map((c, idx) => (
                                    <div className="col-6 col-sm-6 col-md-3" key={idx}>
                                        <div className="counter-item text-center p-3 rounded-3">
                                            <i className={`fa-solid ${c.icon} text-white-50 mb-2`} style={{ fontSize: '24px' }}></i>
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

            {/* Styles */}
            <style jsx>{`
                /* ── Hero Banner ── */
                .hero-banner {
                    background: linear-gradient(135deg, #06cabc 0%, #2e77b0 100%);
                    min-height: 380px;
                    padding-top: 80px;
                    padding-bottom: 60px;
                }

                .hero-content { animation: fadeInDown 0.8s ease; }

                .badge-glass {
                    background: rgba(255,255,255,0.18);
                    color: #fff;
                    font-size: 14px;
                    border: 1px solid rgba(255,255,255,0.25);
                }

                .stat-glass {
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.15);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                .stat-glass:hover { transform: scale(1.05); background: rgba(255,255,255,0.2); }

                .hero-shape { position: absolute; border-radius: 50%; opacity: 0.1; }
                .shape-1 { width: 400px; height: 400px; background: #fff; top: -20%; right: -10%; }
                .shape-2 { width: 300px; height: 300px; background: #fff; bottom: -20%; left: -10%; }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* ── Back Button ── */
                .btn-back {
                    background: #f8fafc;
                    color: #1e293b;
                    border: 2px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .btn-back:hover {
                    background: #06cabc;
                    color: #fff;
                    border-color: #06cabc;
                    transform: translateX(-5px);
                    box-shadow: 0 8px 25px rgba(6,202,188,0.2);
                }

                /* ── Badges above the frame ── */
                .badge-solid { color: #fff; font-size: 13px; font-weight: 600; }
                .badge-solid-dark { color: #fff; font-size: 13px; font-weight: 600; background: #1e293b; }

                .live-dot {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 0 rgba(34,197,94,0.6);
                    animation: pulseDot 1.8s infinite;
                }

                @keyframes pulseDot {
                    0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
                    70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
                    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
                }

                /* ── Preview Panel ── */
                .preview-panel {
                    transition: all 0.3s ease;
                    border: 1px solid rgba(15,23,42,0.05);
                }

                .preview-panel:hover { transform: translateY(-3px); box-shadow: 0 20px 60px rgba(0,0,0,0.12) !important; }

                .preview-panel-web { background: linear-gradient(150deg, #f1f5f9, #e2e8f0); }
                .preview-panel-app { background: radial-gradient(circle at 50% 15%, #eef2ff, #dbeafe 60%, #e0f2fe); }

                /* ── Browser Frame (Website) — width now always fills the panel ── */
                .browser-frame {
                    width: 100%;
                    border-radius: 14px;
                    overflow: hidden;
                    background: #fff;
                    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.2);
                    border: 1px solid rgba(15,23,42,0.06);
                }

                .browser-toolbar {
                    background: linear-gradient(180deg, #f4f6f8, #e9edf1);
                    border-bottom: 1px solid #e2e8f0;
                }

                .browser-dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; flex-shrink: 0; }

                .browser-address {
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    color: #64748b;
                    font-size: 12px;
                    min-width: 0;
                }

                .browser-visit-icon {
                    width: 24px;
                    height: 24px;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    color: #64748b;
                    transition: all 0.25s ease;
                    flex-shrink: 0;
                }

                .browser-visit-icon:hover { background: #06cabc; border-color: #06cabc; color: #fff; }

                .browser-screen {
                    width: 100%;
                    background: #fff;
                    max-height: 440px;
                    overflow: hidden;
                }

                .browser-screen-img {
                    display: block;
                    width: 100%;
                    height: 440px;
                    object-fit: cover;
                    object-position: top;
                    transition: transform 0.5s ease;
                }

                .preview-panel:hover .browser-screen-img { transform: scale(1.03); }

                .browser-screen-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(15, 23, 42, 0);
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .browser-screen:hover .browser-screen-overlay {
                    background: rgba(15, 23, 42, 0.45);
                    opacity: 1;
                }

                .btn-view-live {
                    background: #fff;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 14px;
                    transform: translateY(10px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
                }

                .browser-screen:hover .btn-view-live { transform: translateY(0); opacity: 1; }

                /* ── Phone Frame (App) ── */
                .phone-frame {
                    width: 240px;
                    height: 490px;
                    background: #111827;
                    border-radius: 38px;
                    padding: 12px;
                    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.3);
                    position: relative;
                }

                .phone-notch {
                    position: absolute;
                    top: 12px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90px;
                    height: 18px;
                    background: #111827;
                    border-bottom-left-radius: 14px;
                    border-bottom-right-radius: 14px;
                    z-index: 2;
                }

                .phone-screen {
                    width: 100%;
                    height: 100%;
                    border-radius: 26px;
                    overflow: hidden;
                    background: #000;
                }

                .phone-screen-img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }

                .phone-home-indicator {
                    position: absolute;
                    bottom: 14px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    border-radius: 4px;
                    background: rgba(255,255,255,0.6);
                }

                /* ── Generic Frame (Digital Marketing) ── */
                .generic-frame {
                    width: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    background: #fff;
                    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.15);
                    border: 1px solid rgba(15,23,42,0.06);
                }

                .generic-frame-img {
                    display: block;
                    width: 100%;
                    height: 440px;
                    object-fit: cover;
                    object-position: top;
                }

                /* ── Gallery Player fade transition ── */
                .gallery-fade {
                    animation: gallerySlideFade 0.6s ease;
                }

                @keyframes gallerySlideFade {
                    from { opacity: 0; transform: scale(1.02); }
                    to { opacity: 1; transform: scale(1); }
                }

                /* ── Gallery Player Dots ── */
                .gallery-dots {
                    flex-wrap: wrap;
                }

                .gallery-dot {
                    position: relative;
                    width: 28px;
                    height: 6px;
                    border-radius: 6px;
                    background: rgba(15, 23, 42, 0.15);
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .gallery-dot:hover { background: rgba(15, 23, 42, 0.3); }

                .gallery-dot-active {
                    width: 34px;
                    background: rgba(15, 23, 42, 0.15) !important;
                }

                .gallery-dot-progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 0%;
                    border-radius: 6px;
                    animation: galleryProgress 3s linear forwards;
                }

                @keyframes galleryProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }

                /* ── Screenshot Gallery Thumbnails ── */
                .browser-thumb, .phone-thumb, .generic-thumb {
                    cursor: pointer;
                    border: 3px solid transparent;
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    width: 100%;
                }

                .browser-thumb:hover, .phone-thumb:hover, .generic-thumb:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                }

                .browser-thumb-bar {
                    height: 12px;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    padding: 0 6px;
                }

                .browser-thumb-bar span { width: 4px; height: 4px; border-radius: 50%; background: #cbd5e1; }

                .browser-thumb-img { display: block; width: 100%; height: 58px; object-fit: cover; object-position: top; }

                .phone-thumb {
                    position: relative;
                    aspect-ratio: 9 / 17;
                    border-radius: 16px;
                    background: #111827;
                    padding: 4px;
                }

                .phone-thumb-img { display: block; width: 100%; height: 100%; border-radius: 12px; object-fit: cover; object-position: top; }

                .phone-thumb-notch {
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 26px;
                    height: 5px;
                    border-radius: 4px;
                    background: #111827;
                    z-index: 2;
                }

                .generic-thumb { display: block; height: 80px; object-fit: cover; object-position: top; }

                .active-thumb { border-width: 3px !important; }

                /* ── Tech Stack ── */
                .badge-tech {
                    font-size: 13px;
                    font-weight: 500;
                    border-color: #e2e8f0 !important;
                    transition: all 0.3s ease;
                }

                .badge-tech:hover {
                    transform: scale(1.05);
                    background: #f0fdfb !important;
                    border-color: #06cabc !important;
                    color: #06cabc !important;
                }

                /* ── Results ── */
                .result-item { background: rgba(255,255,255,0.7); transition: all 0.3s ease; }
                .result-item:hover { transform: scale(1.05); background: #fff !important; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
                .result-item h4 { font-size: 1.3rem; }

                /* ── Details Card ── */
                .details-card { border: 1px solid #e8edf2; transition: all 0.3s ease; animation: slideInRight 0.6s ease; }
                .details-card:hover { box-shadow: 0 20px 60px rgba(6,202,188,0.08) !important; }

                @media (min-width: 992px) {
                    .sticky-card { position: sticky; top: 24px; }
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .rating-chip {
                    background: #fff7ed;
                    color: #d97706;
                    font-weight: 700;
                    font-size: 13px;
                    border: 1px solid #fde68a;
                    flex-shrink: 0;
                }

                .description-wrapper { max-height: 200px; overflow-y: auto; }
                .description-wrapper::-webkit-scrollbar { width: 4px; }
                .description-wrapper::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                .description-wrapper::-webkit-scrollbar-thumb { background: #06cabc; border-radius: 10px; }

                .timeline-item {
                    padding-left: 12px;
                    border-left: 2px solid #e2e8f0;
                }

                .feature-item { transition: all 0.3s ease; }
                .feature-item:hover { transform: translateX(5px); color: #06cabc !important; }

                .btn-primary-gradient {
                    background: linear-gradient(135deg, #06cabc, #2e77b0);
                    color: #fff;
                    border: none;
                    transition: all 0.3s ease;
                }

                .btn-primary-gradient:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(6,202,188,0.3); color: #fff; }

                .btn-outline-success { border-color: #16a34a !important; color: #16a34a !important; transition: all 0.3s ease; }
                .btn-outline-success:hover { background: #16a34a !important; color: #fff !important; transform: scale(1.05); box-shadow: 0 8px 25px rgba(22,163,74,0.2); }

                .btn-outline-dark { border-color: #334155 !important; color: #334155 !important; transition: all 0.3s ease; }
                .btn-outline-dark:hover { background: #1e293b !important; color: #fff !important; transform: scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }

                .share-link {
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #f1f5f9;
                    color: #64748b;
                    font-size: 15px;
                }

                .share-link:hover { transform: translateY(-3px); color: #fff !important; background: #06cabc; }

                .testimonial-wrapper {
                    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                    border: 1px solid #e2e8f0;
                    animation: fadeInUp 0.6s ease;
                }

                .avatar-circle {
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: 0.5px;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .counter-wrapper { background: linear-gradient(135deg, #06cabc 0%, #2e77b0 100%); animation: scaleIn 0.6s ease; }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                .counter-item { background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); transition: all 0.3s ease; }
                .counter-item:hover { transform: scale(1.05); background: rgba(255,255,255,0.18); }

                /* ── Responsive ── */
                @media (max-width: 992px) {
                    .browser-screen-img, .generic-frame-img { height: 340px; }
                    .phone-frame { width: 210px; height: 430px; }
                }

                @media (max-width: 768px) {
                    .display-4 { font-size: 2rem !important; }
                    .display-6 { font-size: 1.3rem !important; }
                    .browser-screen-img, .generic-frame-img { height: 280px; }
                    .hero-shape { display: none; }
                    .testimonial-wrapper { padding: 20px !important; }
                    .phone-frame { width: 190px; height: 390px; }
                    .browser-address { font-size: 11px; }
                }

                @media (max-width: 576px) {
                    .browser-screen-img, .generic-frame-img { height: 220px; }
                    .badge-glass { font-size: 12px; padding: 4px 12px; }
                    .phone-frame { width: 170px; height: 350px; padding: 8px; }
                    .phone-notch { width: 70px; height: 14px; }
                    .browser-visit-icon { display: none !important; }
                }
            `}</style>
        </div>
    );
}

export default SinglePortfolio;