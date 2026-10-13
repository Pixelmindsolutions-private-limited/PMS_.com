import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

// Vite: import.meta.env.VITE_API_URL | CRA: process.env.REACT_APP_API_URL
const API_BASE = "http://localhost:4480";

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

// Badge styles per API type
const typeMeta = {
    'website': { label: 'Website', icon: 'fa-globe', color: '#2563eb', lightBg: '#eff6ff' },
    'mobile-app': { label: 'Mobile App', icon: 'fa-mobile-screen-button', color: '#059669', lightBg: '#ecfdf5' },
    'web-app': { label: 'Web App', icon: 'fa-laptop-code', color: '#7c3aed', lightBg: '#f5f3ff' },
    'other': { label: 'Other', icon: 'fa-layer-group', color: '#db2777', lightBg: '#fdf2f8' },
};

// Filter buttons (order shown in the filter bar)
const filterTabs = [
    { key: 'all', label: 'All Projects' },
    { key: 'website', label: 'Websites' },
    { key: 'mobile-app', label: 'Mobile Apps' },
    { key: 'web-app', label: 'Web Apps' },
    { key: 'other', label: 'Other' },
];

function Portfolio() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});
    const [activeFilter, setActiveFilter] = useState('all');

    // Fetch portfolios from API
    const fetchPortfolios = useCallback(async (signal) => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_BASE}/api/portfolios/get-portfolios`, { signal });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            // API groups items by type: { website: [], "mobile-app": [], "web-app": [], other: [] }
            const grouped = json?.data || {};
            const flat = Object.entries(grouped).flatMap(([type, list]) =>
                (Array.isArray(list) ? list : []).map((p) => ({
                    ...p,
                    id: p._id,
                    type: p.type || type,
                    image: resolveImageUrl(p.image),
                    icon: resolveImageUrl(p.icon),
                }))
            );

            setPortfolioItems(flat);
        } catch (err) {
            if (err.name === "AbortError") return;
            console.error("Failed to load portfolios:", err);
            setError("Unable to load projects. Please try again.");
        } finally {
            if (!signal?.aborted) setLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchPortfolios(controller.signal);
        return () => controller.abort();
    }, [fetchPortfolios]);

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredItems = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.type === activeFilter);

    // Counts per filter
    const counts = useMemo(() => {
        const c = { all: portfolioItems.length };
        portfolioItems.forEach((i) => {
            c[i.type] = (c[i.type] || 0) + 1;
        });
        return c;
    }, [portfolioItems]);

    return (
        <div>
            <Helmet>
                <title>Portfolio | Our Creative Work & Projects - PixelMindSolutions</title>
                <meta name="description" content="Explore our diverse portfolio including websites, mobile apps, branding projects and digital experiences delivered for top clients." />
                <meta name="keywords" content="portfolio, case studies, app development projects, website design samples, branding, PixelMind Solutions portfolio" />
                <link rel="preload" as="image" href="/assets/images/banner/banner-inner-page.jpg" />
            </Helmet>

            <Header />
            <main>

                {/* ── Banner ── */}
                <section
                    className="banner__inner-page bg-image pt-100 pb-100"
                    style={{ backgroundImage: `url(/assets/images/banner/banner-inner-page.jpg)` }}
                >
                    <div className="container">
                        <h2 className="wow fadeInUp">Portfolio</h2>
                        <div className="breadcrumb-list wow fadeInUp">
                            <Link to="/">Home</Link>
                            <span><i className="fa-regular fa-angles-right mx-2" /> Portfolio</span>
                        </div>
                    </div>
                </section>

                {/* ── Filter Bar ── */}
                <section className="pf-filter-section">
                    <div className="container">
                        <div className="pf-filter-box">
                            <div className="pf-filter-nav">
                                {filterTabs.map(f => (
                                    <button
                                        key={f.key}
                                        className={`pf-filter-btn${activeFilter === f.key ? ' pf-active' : ''}`}
                                        onClick={() => setActiveFilter(f.key)}
                                    >
                                        <span className="pf-btn-label">{f.label}</span>
                                        <span className="pf-btn-count">{counts[f.key] || 0}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <style>{`
                        .pf-filter-section { background:#f1f5f9; padding:28px 0; }
                        .pf-filter-box { background:#fff; border-radius:14px; padding:16px 22px; box-shadow:0 2px 16px rgba(0,0,0,0.06); border:1px solid #e8edf2; }
                        .pf-filter-nav { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; }
                        .pf-filter-btn { display:inline-flex; align-items:center; gap:8px; padding:8px 18px; border-radius:50px; border:2px solid #e2e8f0; background:#f8fafc; color:#64748b; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.25s ease; white-space:nowrap; }
                        .pf-filter-btn:hover { border-color:#06cabc; color:#06cabc; background:#f0fdfb; }
                        .pf-active { background:linear-gradient(135deg,#06cabc,#2e77b0)!important; border-color:transparent!important; color:#fff!important; box-shadow:0 4px 14px rgba(6,202,188,0.35); }
                        .pf-btn-count { background:rgba(255,255,255,0.25); padding:1px 8px; border-radius:20px; font-size:12px; font-weight:700; }
                        .pf-filter-btn:not(.pf-active) .pf-btn-count { background:#e2e8f0; color:#64748b; }
                        @media(max-width:480px){ .pf-filter-box{padding:12px;} .pf-filter-btn{padding:7px 13px;font-size:13px;} }
                    `}</style>
                </section>

                {/* ── Portfolio Grid ── */}
                <section className="pf-section">
                    <div className="container">
                        {loading ? (
                            <div className="pf-empty">
                                <div className="pf-spinner" />
                                <p>Loading projects...</p>
                            </div>
                        ) : error ? (
                            <div className="pf-empty">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                <h4>Something went wrong</h4>
                                <p>{error}</p>
                                <button className="pf-empty-btn" onClick={() => fetchPortfolios()}>Try Again</button>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="pf-empty">
                                <i className="fa-regular fa-folder-open"></i>
                                <h4>No projects found</h4>
                                <p>No projects match the selected filter.</p>
                                {activeFilter !== 'all' && (
                                    <button className="pf-empty-btn" onClick={() => setActiveFilter('all')}>Show All Projects</button>
                                )}
                            </div>
                        ) : (
                            <div className="pf-grid">
                                {filteredItems.map((item) => {
                                    const description = item.description || '';
                                    const isExpanded = expandedItems[item.id];
                                    const shouldTruncate = description.length > 100;
                                    const displayedText = isExpanded || !shouldTruncate
                                        ? description
                                        : description.slice(0, 100) + '…';
                                    const meta = typeMeta[item.type] || typeMeta.website;
                                    const titleLink = item.websiteLink || item.playstoreLink || item.appstoreLink;

                                    return (
                                        <div key={item.id} className="pf-card">

                                            {/* ── Left: Image ── */}
                                            <div className="pf-img-panel">
                                                <img src={item.image} alt={item.title} className="pf-img" />
                                                <div className="pf-img-overlay" />
                                                {item.icon && (
                                                    <div className="pf-logo-bubble">
                                                        <img src={item.icon} alt={item.title} className="pf-logo" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* ── Right: Content ── */}
                                            <div className="pf-content">

                                                {/* Badge */}
                                                <span className="pf-badge" style={{ color: meta.color, background: meta.lightBg }}>
                                                    <i className={`fa-solid ${meta.icon}`}></i>
                                                    {meta.label}
                                                </span>

                                                {/* Title */}
                                                <h4 className="pf-title">
                                                    {titleLink ? (
                                                        <a href={titleLink} target="_blank" rel="noopener noreferrer">
                                                            {item.title}
                                                        </a>
                                                    ) : (
                                                        <span>{item.title}</span>
                                                    )}
                                                </h4>
                                                <div className="pf-accent" />

                                                {/* Description */}
                                                <p className="pf-desc">
                                                    {displayedText}
                                                    {shouldTruncate && (
                                                        <span className="pf-toggle" onClick={() => toggleExpand(item.id)}>
                                                            {isExpanded ? ' Less' : ' More'}
                                                        </span>
                                                    )}
                                                </p>

                                                <div className="pf-links">
                                                    {item.id && (
                                                        <a href={`/portfolio/${item.id}`} target="_blank" rel="noopener noreferrer" className="pf-link pf-link-web d-flex align-items-center gap-1">
                                                            <i className="fa-eye fa-solid"></i>
                                                            <span>View More</span>
                                                        </a>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <style>{`
                        .pf-section { background:#f1f5f9; padding:36px 0 80px; }

                        /* Grid: 1 → 2 → 3 cols */
                        .pf-grid { display:grid; grid-template-columns:1fr; gap:18px; }
                        @media(min-width:768px)  { .pf-grid { grid-template-columns:repeat(2,1fr); } }
                        @media(min-width:992px)  { .pf-grid { grid-template-columns:repeat(3,1fr); } }

                        /* Card: horizontal row */
                        .pf-card {
                            display:flex; flex-direction:row;
                            background:#fff; border-radius:16px; overflow:hidden;
                            border:1px solid #e2e8f0;
                            box-shadow:0 2px 8px rgba(0,0,0,0.05),0 6px 22px rgba(0,0,0,0.06);
                            transition:transform 0.3s cubic-bezier(.25,.8,.25,1),box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
                        }
                        .pf-card:hover {
                            transform:translateY(-5px);
                            box-shadow:0 4px 14px rgba(0,0,0,0.08),0 16px 36px rgba(6,202,188,0.14);
                        }

                        /* Image panel */
                        .pf-img-panel { position:relative; width:130px; min-width:130px; flex-shrink:0; overflow:hidden; }
                        .pf-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.45s ease; }
                        .pf-card:hover .pf-img { transform:scale(1.07); }
                        .pf-img-overlay {
                            position:absolute; inset:0;
                            background:linear-gradient(to right,transparent 55%,rgba(255,255,255,0.5) 100%);
                            pointer-events:none;
                        }

                        /* Floating logo */
                        .pf-logo-bubble {
                            position:absolute; bottom:10px; left:10px;
                            width:36px; height:36px; border-radius:9px;
                            background:#fff; border:2px solid rgba(255,255,255,0.95);
                            box-shadow:0 2px 10px rgba(0,0,0,0.18);
                            overflow:hidden; display:flex; align-items:center; justify-content:center;
                        }
                        .pf-logo { width:100%; height:100%; object-fit:cover; }

                        /* Content panel */
                        .pf-content {
                            flex:1; padding:12px 13px;
                            display:flex; flex-direction:column; min-width:0;
                        }

                        /* Badge */
                        .pf-badge {
                            display:inline-flex; align-items:center; gap:4px;
                            padding:2px 9px; border-radius:50px;
                            font-size:10.5px; font-weight:700;
                            margin-bottom:5px; width:fit-content;
                        }
                        .pf-badge i { font-size:9px; }

                        /* Title */
                        .pf-title {
                            font-size:12.5px; font-weight:800; color:#1e293b;
                            margin:0 0 4px; letter-spacing:0.3px;
                            text-transform:uppercase; line-height:1.3;
                            overflow:hidden; display:-webkit-box;
                            -webkit-line-clamp:2; -webkit-box-orient:vertical;
                        }
                        .pf-title a { color:inherit; text-decoration:none; }
                        .pf-title a:hover { color:#06cabc; }

                        /* Accent */
                        .pf-accent { width:26px; height:2.5px; border-radius:2px; background:linear-gradient(90deg,#06cabc,#2e77b0); margin-bottom:6px; }

                        /* Description */
                        .pf-desc { font-size:11.5px; line-height:1.6; color:#64748b; margin-bottom:8px; flex:1; }
                        .pf-toggle { color:#06cabc; font-weight:700; cursor:pointer; font-size:11px; }
                        .pf-toggle:hover { text-decoration:underline; }

                        /* Link buttons row */
                        .pf-links {
                            display:flex; flex-wrap:wrap; gap:5px; margin-top:auto;
                        }

                        /* Base link pill */
                        .pf-link {
                            display:inline-flex; align-items:center; gap:4px;
                            padding:4px 9px; border-radius:50px;
                            font-size:10px; font-weight:700;
                            text-decoration:none;
                            border:1.5px solid transparent;
                            transition:all 0.22s ease; white-space:nowrap;
                        }
                        .pf-link i { font-size:10px; }

                        /* Website – teal */
                        .pf-link-web { color:#06cabc; background:#f0fdfb; border-color:#06cabc; }
                        .pf-link-web:hover { background:#06cabc; color:#fff; }

                        /* Play Store – green */
                        .pf-link-play { color:#16a34a; background:#f0fdf4; border-color:#16a34a; }
                        .pf-link-play:hover { background:#16a34a; color:#fff; }

                        /* App Store – dark slate */
                        .pf-link-apple { color:#334155; background:#f8fafc; border-color:#94a3b8; }
                        .pf-link-apple:hover { background:#1e293b; color:#fff; border-color:#1e293b; }

                        /* Mobile: stack vertically */
                        @media(max-width:575px) {
                            .pf-card { flex-direction:column; }
                            .pf-img-panel { width:100%; min-width:unset; height:150px; }
                            .pf-img-overlay { background:linear-gradient(to bottom,transparent 55%,rgba(255,255,255,0.45) 100%); }
                            .pf-logo-bubble { bottom:-15px; left:12px; width:34px; height:34px; border-radius:8px; }
                            .pf-content { padding:22px 13px 13px; }
                            .pf-title { font-size:13px; -webkit-line-clamp:unset; }
                        }

                        /* Empty / loading / error state */
                        .pf-empty { text-align:center; padding:60px 20px; }
                        .pf-empty i { font-size:52px; color:#06cabc; margin-bottom:16px; display:block; }
                        .pf-empty h4 { color:#1e293b; margin-bottom:8px; }
                        .pf-empty p { color:#64748b; }
                        .pf-empty-btn { margin-top:16px; padding:10px 24px; background:linear-gradient(135deg,#06cabc,#2e77b0); color:#fff; border:none; border-radius:50px; font-weight:600; cursor:pointer; transition:all 0.25s; }
                        .pf-empty-btn:hover { opacity:0.9; transform:translateY(-2px); }

                        /* Loading spinner */
                        .pf-spinner {
                            width:42px; height:42px; margin:0 auto 14px;
                            border:4px solid #e2e8f0; border-top-color:#06cabc;
                            border-radius:50%; animation:pfSpin 0.8s linear infinite;
                        }
                        @keyframes pfSpin { to { transform:rotate(360deg); } }
                    `}</style>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Portfolio;