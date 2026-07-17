// CareersPage.js
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

/**
 * Reveal
 * Wraps content in Bootstrap's own `.fade` / `.show` transition pair
 * (the same classes Bootstrap uses for alerts, modals, and collapses),
 * toggled by IntersectionObserver on scroll. We layer a translateY
 * motion on top of Bootstrap's opacity transition via the `.pms-reveal`
 * override in the <style> block below.
 */
function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`pms-reveal fade${visible ? ' show' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
}

function CareersPage() {
    const [showSticky, setShowSticky] = useState(false);
    const heroRef = useRef(null);

    const CAREERS_EMAIL = 'careers@pixelmindsolutions.in';

    /* ---------------- Modal state ---------------- */
    const [showModal, setShowModal] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        message: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        const heroEl = heroRef.current;
        if (!heroEl) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setShowSticky(!entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(heroEl);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showModal]);

    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleApplyClick = (jobTitle) => {
        setSelectedPosition(jobTitle);
        setSubmitStatus(null);
        setFormErrors({});
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ fullName: '', email: '', phone: '', experience: '', portfolio: '', message: '' });
        setResumeFile(null);
        setSelectedPosition('');
        setFormErrors({});
        setSubmitStatus(null);
        const fileInput = document.getElementById('resume-upload-modal');
        if (fileInput) fileInput.value = '';
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Enter a valid email address.';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required.';
        } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
            errors.phone = 'Enter a valid phone number.';
        }
        if (!selectedPosition) errors.position = 'Please select a position.';
        if (!resumeFile) {
            errors.resume = 'Please attach your resume.';
        } else if (!/\.(pdf|doc|docx)$/i.test(resumeFile.name)) {
            errors.resume = 'Resume must be a PDF or Word document.';
        } else if (resumeFile.size > 5 * 1024 * 1024) {
            errors.resume = 'Resume must be under 5MB.';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        setSubmitting(true);
        setSubmitStatus(null);

        try {
            const payload = new FormData();
            payload.append('fullName', formData.fullName);
            payload.append('email', formData.email);
            payload.append('phone', formData.phone);
            payload.append('position', selectedPosition);
            payload.append('experience', formData.experience);
            payload.append('portfolio', formData.portfolio);
            payload.append('message', formData.message);
            payload.append('resume', resumeFile);

            // TODO: point this at your real application-submission API endpoint.
            const response = await fetch('/api/careers/apply', {
                method: 'POST',
                body: payload,
            });

            if (!response.ok) throw new Error('Request failed');

            setSubmitStatus('success');
            setTimeout(() => {
                closeModal();
            }, 2000);
        } catch (err) {
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    const styles = {
        highlight: { color: '#06cabc', fontWeight: 600 },
        heading: {
            fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
            fontWeight: 700,
            marginBottom: '18px',
            color: '#1a1a2e',
            lineHeight: 1.25,
        },
        paragraph: {
            fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
            lineHeight: 1.85,
            color: '#5a5f6e',
            marginBottom: '18px',
        },
    };

    const Highlight = ({ children }) => <span style={styles.highlight}>{children}</span>;

    /* ---------------- Data ---------------- */

    const whyWorkCards = [
        { icon: 'fa-solid fa-graduation-cap', title: 'Continuous Learning', desc: 'Work with the latest technologies and keep growing every day.' },
        { icon: 'fa-solid fa-rocket', title: 'Real Projects', desc: 'Build websites, mobile apps, and digital products that make a real business impact.' },
        { icon: 'fa-solid fa-people-group', title: 'Collaborative Culture', desc: 'Work alongside creative thinkers who support, inspire, and challenge each other.' },
        { icon: 'fa-solid fa-scale-balanced', title: 'Flexible Environment', desc: 'A healthy balance between productivity, creativity, and personal growth.' },
        { icon: 'fa-solid fa-arrow-trend-up', title: 'Career Growth', desc: 'Clear opportunities to learn new skills and take on greater responsibilities.' },
        { icon: 'fa-solid fa-award', title: 'Recognition', desc: 'Your ideas, efforts, and achievements are always valued.' },
    ];

    const coreValues = [
        { icon: 'fa-solid fa-lightbulb', title: 'Innovation', desc: 'We embrace new ideas and modern technologies.' },
        { icon: 'fa-solid fa-gem', title: 'Quality', desc: 'We believe excellence is built into every detail.' },
        { icon: 'fa-solid fa-handshake', title: 'Integrity', desc: 'Honesty, transparency, and trust guide everything we do.' },
        { icon: 'fa-solid fa-people-arrows', title: 'Collaboration', desc: 'Great results come from teamwork.' },
        { icon: 'fa-solid fa-seedling', title: 'Growth Mindset', desc: 'Learning never stops.' },
        { icon: 'fa-solid fa-face-smile', title: 'Customer Success', desc: "Our success begins with our clients' success." },
    ];

    const benefits = [
        { icon: 'fa-solid fa-sack-dollar', label: 'Competitive Salary' },
        { icon: 'fa-solid fa-medal', label: 'Performance Bonuses' },
        { icon: 'fa-solid fa-face-laugh-beam', label: 'Friendly Work Culture' },
        { icon: 'fa-solid fa-building', label: 'Modern Workspace' },
        { icon: 'fa-solid fa-stairs', label: 'Career Advancement Opportunities' },
        { icon: 'fa-solid fa-champagne-glasses', label: 'Team Events & Celebrations' },
    ];

    const hiringSteps = [
        { step: '01', title: 'Apply Online', desc: 'Submit your application with your resume.' },
        { step: '02', title: 'Application Review', desc: 'Our team carefully reviews your profile.' },
        { step: '03', title: 'Interview', desc: 'Technical and HR discussions.' },
        { step: '04', title: 'Final Selection', desc: 'Offer letter.' },
        { step: '05', title: 'Welcome to Pixelmindsolutions', desc: "Let's build something amazing together." },
    ];

    // Set to [] to preview the "no vacancy" state.
    const openPositions = [
        { title: 'Frontend Developer', type: 'Full Time', location: 'Hyderabad / Remote', experience: '1 - 3 Years' },
        { title: 'WordPress Developer', type: 'Full Time', location: 'Hyderabad / Remote', experience: '1 - 3 Years' },
        { title: 'Flutter Developer', type: 'Full Time', location: 'Hyderabad / Remote', experience: '1 - 4 Years' },
        { title: 'UI/UX Designer', type: 'Full Time', location: 'Hyderabad / Remote', experience: '1 - 3 Years' },
        { title: 'SEO Executive', type: 'Full Time', location: 'Hyderabad / Remote', experience: '0 - 2 Years' },
        { title: 'Digital Marketing Executive', type: 'Full Time', location: 'Hyderabad / Remote', experience: '0 - 2 Years' },
        { title: 'Business Development Executive', type: 'Full Time', location: 'Hyderabad / Remote', experience: '1 - 3 Years' },
        { title: 'Graphic Designer', type: 'Full Time', location: 'Hyderabad / Remote', experience: '0 - 2 Years' },
    ];

    // Free-to-use photos (Unsplash License — no attribution required).
    const galleryImages = [
        { src: 'https://images.unsplash.com/photo-1758691736836-0413b066787a?auto=format&fit=crop&w=900&q=80', alt: 'Team brainstorming with sticky notes', tall: true },
        { src: 'https://images.unsplash.com/photo-1690192123455-6337e6db4179?auto=format&fit=crop&w=900&q=80', alt: 'Team celebrating a win in the office', tall: false },
        { src: 'https://images.unsplash.com/photo-1759884247264-86c2aa311632?auto=format&fit=crop&w=900&q=80', alt: 'Developer focused at a desk', tall: false },
        { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80', alt: 'Team learning and training together', tall: true },
        { src: 'https://images.unsplash.com/photo-1754548930550-be9fa88874f4?auto=format&fit=crop&w=900&q=80', alt: "A developer's workspace", tall: false },
    ];

    return (
        <div>
            <Helmet>
                <title>Careers at Pixelmindsolutions | Join Our Team in Hyderabad</title>
                <meta
                    name="description"
                    content="Explore career opportunities at Pixelmindsolutions. Join a passionate team of developers, designers, and marketers building innovative digital products in Hyderabad."
                />
                <meta
                    name="keywords"
                    content="pixelmindsolutions careers, jobs in hyderabad IT company, frontend developer jobs hyderabad, flutter developer jobs, ui ux designer jobs hyderabad, digital marketing jobs hyderabad, software company careers hyderabad"
                />
            </Helmet>

            <style>{`
        @keyframes pms-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pms-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pms-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(6,202,188,0.55); }
          70% { box-shadow: 0 0 0 14px rgba(6,202,188,0); }
          100% { box-shadow: 0 0 0 0 rgba(6,202,188,0); }
        }

        /* Bootstrap ships */
        .fade { transition: opacity .15s linear; } .show { opacity: 1; }
           We raise specificity with .pms-reveal.fade to extend that same pair with a
           slower duration and a translateY motion, rather than inventing a parallel system. */
        .pms-reveal.fade {
          transition: opacity 0.7s ease, transform 0.7s ease;
          transform: translateY(28px);
        }
        .pms-reveal.fade.show {
          opacity: 1;
          transform: translateY(0);
        }

        .pms-careers-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-size: cover;
          background-position: center;
        }
        .pms-careers-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,15,30,0.82) 0%, rgba(6,202,188,0.55) 100%);
        }
        .pms-careers-hero .pms-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          animation: pms-float 9s ease-in-out infinite;
        }
        .pms-careers-hero .pms-blob-1 { width: 340px; height: 340px; background: #06cabc; top: -80px; left: -60px; }
        .pms-careers-hero .pms-blob-2 { width: 300px; height: 300px; background: #f2b544; bottom: -60px; right: -40px; animation-delay: 2s; }
        .pms-careers-hero .container { position: relative; z-index: 2; }
        .pms-careers-hero h1 { font-size: clamp(2.1rem, 5.4vw, 3.6rem); line-height: 1.15; }

        .pms-btn-solid, .pms-btn-outline {
          display: inline-block;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .pms-btn-solid:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(6,202,188,0.35); }
        .pms-btn-outline:hover { background-color: #06cabc !important; color: #fff !important; border-color: #06cabc !important; transform: translateY(-3px); }

        .pms-scroll-cue {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          width: 26px; height: 42px; border: 2px solid rgba(255,255,255,0.5); border-radius: 14px; z-index: 2;
        }
        .pms-scroll-cue::before {
          content: ''; position: absolute; top: 6px; left: 50%; width: 4px; height: 8px;
          background: #06cabc; border-radius: 4px; transform: translateX(-50%);
          animation: pms-scroll-dot 1.8s ease infinite;
        }
        @keyframes pms-scroll-dot { 0% { top: 6px; opacity: 1; } 70% { top: 20px; opacity: 0; } 100% { top: 6px; opacity: 0; } }

        .pms-mission-shape {
          position: absolute; width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(6,202,188,0.16), transparent 70%);
          top: -120px; right: -140px; z-index: 0;
        }

        .pms-glass-section { position: relative; background: linear-gradient(135deg, #0a0f1e 0%, #123b3a 55%, #0a2a29 100%); overflow: hidden; }
        .pms-glass-section::before { content: ''; position: absolute; width: 380px; height: 380px; border-radius: 50%; background: rgba(6,202,188,0.20); filter: blur(90px); top: -100px; left: -80px; }
        .pms-glass-section::after { content: ''; position: absolute; width: 320px; height: 320px; border-radius: 50%; background: rgba(242,181,68,0.14); filter: blur(90px); bottom: -90px; right: -60px; }
        .pms-glass-card {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.16); border-radius: 18px;
          padding: 34px 26px; height: 100%;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
        }
        .pms-glass-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.13); border-color: rgba(6,202,188,0.55); box-shadow: 0 20px 45px rgba(0,0,0,0.35); }
        .pms-glass-icon { width: 58px; height: 58px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: rgba(6,202,188,0.18); border: 1px solid rgba(6,202,188,0.35); margin-bottom: 18px; }

        .pms-value-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); border-radius: 16px; padding: 26px 22px; height: 100%; transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease; }
        .pms-value-card:hover { transform: translateY(-6px); border-color: rgba(242,181,68,0.55); background: rgba(255,255,255,0.09); }
        .pms-value-icon { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #06cabc, #0a8f85); margin-bottom: 14px; flex-shrink: 0; }

        .pms-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 190px; grid-auto-flow: dense; gap: 16px; }
        .pms-gallery-item { position: relative; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 26px rgba(15,23,42,0.10); background: #eef0f3; }
        .pms-gallery-item.tall { grid-row: span 2; }
        .pms-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .pms-gallery-item:hover img { transform: scale(1.08); }
        .pms-gallery-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,15,30,0.45), transparent 55%); opacity: 0; transition: opacity 0.3s ease; }
        .pms-gallery-item:hover::after { opacity: 1; }
        @media (max-width: 767px) { .pms-gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 150px; } }

        .pms-benefit-chip { display: flex; align-items: center; gap: 14px; background: #f8f9fa; border: 1px solid #eef0f3; border-radius: 14px; padding: 18px 20px; height: 100%; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .pms-benefit-chip:hover { transform: translateY(-6px); box-shadow: 0 14px 30px rgba(15,23,42,0.08); border-color: rgba(6,202,188,0.35); }
        .pms-benefit-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(6,202,188,0.12); color: #06cabc; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        .pms-timeline { position: relative; }
        .pms-timeline-line { position: absolute; left: 34px; top: 8px; bottom: 8px; width: 2px; background: repeating-linear-gradient(180deg, #06cabc 0, #06cabc 8px, transparent 8px, transparent 16px); }
        .pms-timeline-step { position: relative; display: flex; gap: 24px; padding-bottom: 44px; }
        .pms-timeline-step:last-child { padding-bottom: 0; }
        .pms-timeline-circle { position: relative; z-index: 1; flex-shrink: 0; width: 68px; height: 68px; border-radius: 50%; background: #06cabc; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .pms-timeline-step:hover .pms-timeline-circle { transform: scale(1.08); box-shadow: 0 8px 20px rgba(6,202,188,0.4); }
        .pms-timeline-step:last-child .pms-timeline-circle { background: #1a1a2e; }

        .pms-job-card { background: #fff; border: 1px solid #eef0f3; border-radius: 16px; padding: 26px; height: 100%; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .pms-job-card:hover { transform: translateY(-8px); box-shadow: 0 18px 40px rgba(15,23,42,0.10); border-color: rgba(6,202,188,0.35); }
        .pms-job-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 600; padding: 5px 12px; border-radius: 999px; background: rgba(6,202,188,0.10); color: #049a90; }
        .pms-job-apply { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 0; border-radius: 10px; background: #06cabc; color: #fff; font-weight: 600; border: none; cursor: pointer; transition: background-color 0.25s ease, transform 0.25s ease; }
        .pms-job-apply:hover { background-color: #049a90; color: #fff; transform: translateY(-2px); }

        .pms-sticky-apply {
          position: fixed; right: 24px; bottom: 24px; z-index: 1200;
          display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; border-radius: 999px;
          background: #06cabc; color: #fff; font-weight: 600; text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 12px 30px rgba(6,202,188,0.45); animation: pms-pulse-ring 2.4s infinite;
          opacity: 0; pointer-events: none; transform: translateY(16px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .pms-sticky-apply.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .pms-sticky-apply:hover { background-color: #049a90; color: #fff; }
        @media (max-width: 576px) { .pms-sticky-apply span.pms-sticky-label { display: none; } .pms-sticky-apply { padding: 14px; } }

        .pms-apply-form .form-control:focus, .pms-apply-form .form-select:focus {
          border-color: #06cabc; box-shadow: 0 0 0 0.2rem rgba(6,202,188,0.20);
        }

        /* Modal overlay */
        .pms-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1300;
          background: rgba(10,15,30,0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: pms-modal-fade 0.25s ease;
        }
        @keyframes pms-modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .pms-modal-box {
          background: #fff;
          border-radius: 24px;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px 36px;
          position: relative;
          animation: pms-modal-slide 0.3s ease;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }
        @keyframes pms-modal-slide {
          from { transform: translateY(30px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .pms-modal-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.8rem;
          line-height: 1;
          color: #5a5f6e;
          cursor: pointer;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .pms-modal-close:hover { color: #1a1a2e; transform: rotate(90deg); }

        @media (max-width: 576px) {
          .pms-modal-box { padding: 28px 18px; margin: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pms-careers-hero, .pms-blob, .pms-scroll-cue::before, .pms-sticky-apply, .pms-reveal.fade,
          .pms-modal-overlay, .pms-modal-box {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

            <Header />
            <main>

                {/* ================= HERO ================= */}
                <section
                    className="pms-careers-hero"
                    ref={heroRef}
                    style={{ backgroundImage: `url(${'/assets/images/banner/banner-inner-page.jpg'})` }}
                >
                    <span className="pms-blob pms-blob-1" />
                    <span className="pms-blob pms-blob-2" />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-9 mx-auto text-center">
                                <span
                                    className="d-inline-block mb-3 px-3 py-2 rounded-pill"
                                    style={{ background: 'rgba(6,202,188,0.14)', border: '1px solid rgba(6,202,188,0.35)', color: '#06cabc', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em' }}
                                >
                                    WE'RE HIRING
                                </span>
                                <h2 className="display-4 fw-bold text-white mb-3">
                                    Build the Future with{" "}
                                    <span style={{ color: "#06cabc" }}>Pixelmindsolutions</span>
                                </h2>
                                <p className="fs-5 mb-4" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '760px', margin: '0 auto' }}>
                                    We're building innovative digital products that help businesses grow. Join a team of creators, developers, designers, and marketers who love solving real-world challenges.
                                </p>
                                <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                                    <button
                                        type="button"
                                        className="pms-btn-solid btn btn-lg rounded-pill"
                                        style={{ backgroundColor: '#06cabc', color: '#fff', fontWeight: 600, padding: '14px 34px', border: 'none' }}
                                        onClick={() => scrollToId('open-positions')}
                                    >
                                        View Open Positions <i className="fa-regular fa-arrow-right-long ms-1" />
                                    </button>
                                    <button
                                        type="button"
                                        className="pms-btn-outline btn btn-lg rounded-pill"
                                        style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', fontWeight: 600, padding: '14px 34px' }}
                                        onClick={() => handleApplyClick('General Application')}
                                    >
                                        Join Our Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="pms-scroll-cue" />
                </section>

                {/* ================= OUR MISSION ================= */}
                <section className="py-5 position-relative" style={{ backgroundColor: '#fff', paddingTop: '90px', paddingBottom: '90px', overflow: 'hidden' }}>
                    <span className="pms-mission-shape" />
                    <div className="container position-relative">
                        <Reveal className="row">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 style={styles.heading}>Grow Together. <Highlight>Create Impact.</Highlight></h2>
                                <p style={styles.paragraph}>
                                    At Pixelmindsolutions, we believe great ideas come from passionate people. Every project is an opportunity to innovate, learn, and create meaningful digital experiences for businesses around the world.
                                </p>
                                <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                                    We don't just build websites and applications — we build careers, relationships, and long-term success.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ================= WHY WORK WITH US ================= */}
                <section className="pms-glass-section py-5" style={{ paddingTop: '90px', paddingBottom: '90px' }}>
                    <div className="container position-relative" style={{ zIndex: 1 }}>
                        <Reveal className="row mb-5">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 className="fw-bold text-white mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)' }}>
                                    More Than Just a <span style={{ color: '#06cabc' }}>Workplace</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>Why people choose to build their careers with us</p>
                            </div>
                        </Reveal>
                        <div className="row g-4">
                            {whyWorkCards.map((card, idx) => (
                                <Reveal key={idx} as="div" delay={idx * 80} className="col-12 col-sm-6 col-lg-4">
                                    <div className="pms-glass-card">
                                        <div className="pms-glass-icon">
                                            <i className={`${card.icon} fs-4`} style={{ color: '#06cabc' }}></i>
                                        </div>
                                        <h4 className="text-white mb-2" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{card.title}</h4>
                                        <p className="mb-0" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: 1.7 }}>{card.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= CORE VALUES ================= */}
                <section className="py-5" style={{ backgroundColor: '#0a0f1e', paddingTop: '90px', paddingBottom: '90px' }}>
                    <div className="container">
                        <Reveal className="row mb-5">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 className="fw-bold text-white mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)' }}>
                                    The Values That <span style={{ color: '#f2b544' }}>Drive Us</span>
                                </h2>
                            </div>
                        </Reveal>
                        <div className="row g-4">
                            {coreValues.map((value, idx) => (
                                <Reveal key={idx} delay={idx * 80} className="col-12 col-sm-6 col-lg-4">
                                    <div className="pms-value-card d-flex flex-column">
                                        <div className="pms-value-icon">
                                            <i className={`${value.icon} fs-6`} style={{ color: '#fff' }}></i>
                                        </div>
                                        <h5 className="text-white mb-2" style={{ fontWeight: 600 }}>{value.title}</h5>
                                        <p className="mb-0" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: 1.7 }}>{value.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= LIFE AT PIXELMINDSOLUTIONS ================= */}
                <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '90px', paddingBottom: '90px' }}>
                    <div className="container">
                        <div className="row align-items-center g-5">
                            <Reveal as="div" className="col-12 col-lg-5">
                                <h2 style={styles.heading}>Where Passion <Highlight>Meets Purpose</Highlight></h2>
                                <p style={styles.paragraph}>
                                    Every day brings new ideas, exciting challenges, and opportunities to create meaningful digital experiences.
                                </p>
                                <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                                    From brainstorming sessions and product launches to celebrations and learning events, we enjoy building together while growing together.
                                </p>
                            </Reveal>
                            <div className="col-12 col-lg-7">
                                <div className="pms-gallery-grid">
                                    {galleryImages.map((img, idx) => (
                                        <Reveal key={idx} as="div" delay={idx * 90} className={`pms-gallery-item${img.tall ? ' tall' : ''}`}>
                                            <img src={img.src} alt={img.alt} loading="lazy" />
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= BENEFITS ================= */}
                <section className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '90px', paddingBottom: '90px' }}>
                    <div className="container">
                        <Reveal className="row mb-5">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 style={styles.heading}>Perks & <Highlight>Benefits</Highlight></h2>
                            </div>
                        </Reveal>
                        <div className="row g-4">
                            {benefits.map((b, idx) => (
                                <Reveal key={idx} delay={idx * 70} className="col-12 col-sm-6 col-lg-4">
                                    <div className="pms-benefit-chip">
                                        <div className="pms-benefit-icon">
                                            <i className={`${b.icon} fs-5`}></i>
                                        </div>
                                        <span style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '0.98rem' }}>{b.label}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= HIRING PROCESS ================= */}
                <section id="hiring-process" className="py-5" style={{ backgroundColor: '#fff', paddingTop: '90px', paddingBottom: '90px' }}>
                    <div className="container">
                        <Reveal className="row mb-5">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 style={styles.heading}>Your <Highlight>Journey Starts Here</Highlight></h2>
                            </div>
                        </Reveal>
                        <div className="row">
                            <div className="col-12 col-lg-8 mx-auto">
                                <div className="pms-timeline">
                                    <span className="pms-timeline-line d-none d-sm-block" />
                                    {hiringSteps.map((step, idx) => (
                                        <Reveal key={idx} delay={idx * 90} className="pms-timeline-step">
                                            <div className="pms-timeline-circle">{step.step}</div>
                                            <div className="pt-2">
                                                <h5 className="fw-bold mb-1" style={{ color: '#1a1a2e' }}>{step.title}</h5>
                                                <p className="mb-0" style={{ color: '#5a5f6e' }}>{step.desc}</p>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= OPEN POSITIONS ================= */}
                <section id="open-positions" className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '90px', paddingBottom: '90px' }}>
                    <div className="container">
                        <Reveal className="row mb-5">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 style={styles.heading}>Current <Highlight>Opportunities</Highlight></h2>
                            </div>
                        </Reveal>

                        {openPositions.length > 0 ? (
                            <div className="row g-4">
                                {openPositions.map((job, idx) => (
                                    <Reveal key={idx} delay={idx * 60} className="col-12 col-sm-6 col-lg-3">
                                        <div className="pms-job-card">
                                            <h5 className="fw-bold mb-3" style={{ color: '#1a1a2e' }}>{job.title}</h5>
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                <span className="pms-job-badge"><i className="fa-solid fa-briefcase" /> {job.type}</span>
                                            </div>
                                            <div className="mb-1 d-flex align-items-center gap-2" style={{ color: '#5a5f6e', fontSize: '0.9rem' }}>
                                                <i className="fa-solid fa-location-dot" style={{ color: '#06cabc' }} /> {job.location}
                                            </div>
                                            <div className="mb-4 d-flex align-items-center gap-2" style={{ color: '#5a5f6e', fontSize: '0.9rem' }}>
                                                <i className="fa-solid fa-layer-group" style={{ color: '#06cabc' }} /> {job.experience}
                                            </div>
                                            <button type="button" className="pms-job-apply" onClick={() => handleApplyClick(job.title)}>
                                                Apply Now <i className="fa-regular fa-arrow-right-long" />
                                            </button>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        ) : (
                            <Reveal className="row">
                                <div className="col-12 col-lg-7 mx-auto text-center">
                                    <div className="p-5 rounded-4" style={{ backgroundColor: '#fff', border: '1px solid #eef0f3' }}>
                                        <i className="fa-solid fa-magnifying-glass fs-1 mb-3" style={{ color: '#06cabc' }} />
                                        <h4 className="fw-bold mb-2" style={{ color: '#1a1a2e' }}>We're Always Looking for Talent</h4>
                                        <p style={{ color: '#5a5f6e' }}>
                                            Even if there isn't a current opening that matches your profile, we'd love to hear from you. Send us your resume, and we'll reach out when a suitable opportunity becomes available.
                                        </p>
                                        <button
                                            type="button"
                                            className="pms-btn-solid btn btn-lg rounded-pill mt-2"
                                            style={{ backgroundColor: '#06cabc', color: '#fff', fontWeight: 600, padding: '12px 32px', border: 'none' }}
                                            onClick={() => handleApplyClick('General Application')}
                                        >
                                            Submit Resume
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                        )}
                    </div>
                </section>

                {/* ================= DON'T SEE THE RIGHT ROLE ================= */}
                <section id="dont-see-role" className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '80px', paddingBottom: '80px' }}>
                    <div className="container">
                        <Reveal className="row">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 style={styles.heading}>Don't See the Right Role? <br /><Highlight>We'd Still Love to Hear From You</Highlight></h2>
                                <p style={{ ...styles.paragraph, maxWidth: '620px', margin: '0 auto 26px' }}>
                                    We're always looking for passionate people who are excited to build great digital experiences. Send us your resume, and we'll reach out when the right opportunity comes along.
                                </p>
                                <button
                                    type="button"
                                    className="pms-btn-outline btn btn-lg rounded-pill"
                                    style={{ backgroundColor: 'transparent', color: '#06cabc', border: '2px solid #06cabc', fontWeight: 600, padding: '13px 34px' }}
                                    onClick={() => handleApplyClick('General Application')}
                                >
                                    Submit Resume
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ================= FINAL CTA ================= */}
                <section className="py-5" style={{ backgroundColor: '#06cabc', color: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
                    <div className="container">
                        <Reveal className="row">
                            <div className="col-12 col-lg-8 mx-auto text-center">
                                <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)' }}>Ready to Build Something Great?</h2>
                                <p className="mb-4" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '640px', margin: '0 auto 28px' }}>
                                    Become part of a team where innovation, collaboration, and growth come together every day.
                                </p>
                                <button
                                    type="button"
                                    className="pms-btn-solid btn btn-lg rounded-pill"
                                    style={{ backgroundColor: '#fff', color: '#06cabc', fontWeight: 600, padding: '13px 36px', border: 'none' }}
                                    onClick={() => handleApplyClick('General Application')}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

            </main>

            {/* ================= STICKY APPLY BUTTON ================= */}
            <button
                type="button"
                onClick={() => handleApplyClick('General Application')}
                className={`pms-sticky-apply${showSticky ? ' visible' : ''}`}
                aria-hidden={!showSticky}
            >
                <i className="fa-solid fa-paper-plane" />
                <span className="pms-sticky-label">Apply Now</span>
            </button>

            {/* ================= APPLICATION MODAL ================= */}
            {showModal && (
                <div className="pms-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
                    <div className="pms-modal-box">
                        <button type="button" className="pms-modal-close" onClick={closeModal} aria-label="Close modal">
                            <i className="fa-regular fa-xmark" />
                        </button>

                        <h3 className="fw-bold mb-1" style={{ color: '#1a1a2e', fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)' }}>
                            <Highlight>Apply Now</Highlight>
                        </h3>
                        <p className="mb-4" style={{ color: '#5a5f6e' }}>
                            Fill in your details and attach your resume — our team will get back to you soon.
                        </p>

                        <form onSubmit={handleSubmit} noValidate className="pms-apply-form">
                            {submitStatus === 'success' && (
                                <div className="alert alert-success fade show d-flex align-items-center gap-2" role="alert">
                                    <i className="fa-solid fa-circle-check" />
                                    <span>Your application has been submitted. We'll be in touch soon!</span>
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="alert alert-danger fade show d-flex align-items-center gap-2" role="alert">
                                    <i className="fa-solid fa-triangle-exclamation" />
                                    <span>
                                        Something went wrong. Please try again, or email your resume directly to{' '}
                                        <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
                                    </span>
                                </div>
                            )}

                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="fullName-modal" className="form-label fw-semibold">Full Name *</label>
                                    <input
                                        id="fullName-modal"
                                        type="text"
                                        className={`form-control${formErrors.fullName ? ' is-invalid' : ''}`}
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                    {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="email-modal" className="form-label fw-semibold">Email *</label>
                                    <input
                                        id="email-modal"
                                        type="email"
                                        className={`form-control${formErrors.email ? ' is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="phone-modal" className="form-label fw-semibold">Phone *</label>
                                    <input
                                        id="phone-modal"
                                        type="tel"
                                        className={`form-control${formErrors.phone ? ' is-invalid' : ''}`}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                    {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="position-modal" className="form-label fw-semibold">Position Applying For *</label>
                                    <select
                                        id="position-modal"
                                        className={`form-select${formErrors.position ? ' is-invalid' : ''}`}
                                        value={selectedPosition}
                                        onChange={(e) => setSelectedPosition(e.target.value)}
                                    >
                                        <option value="">Select a position</option>
                                        {openPositions.map((job) => (
                                            <option key={job.title} value={job.title}>{job.title}</option>
                                        ))}
                                        <option value="General Application">General Application</option>
                                    </select>
                                    {formErrors.position && <div className="invalid-feedback">{formErrors.position}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="experience-modal" className="form-label fw-semibold">Total Experience</label>
                                    <input
                                        id="experience-modal"
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. 2 Years"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label htmlFor="portfolio-modal" className="form-label fw-semibold">Portfolio / LinkedIn (optional)</label>
                                    <input
                                        id="portfolio-modal"
                                        type="url"
                                        className="form-control"
                                        placeholder="https://"
                                        value={formData.portfolio}
                                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="resume-upload-modal" className="form-label fw-semibold">Resume *</label>
                                    <input
                                        id="resume-upload-modal"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className={`form-control${formErrors.resume ? ' is-invalid' : ''}`}
                                        onChange={(e) => setResumeFile(e.target.files[0] || null)}
                                    />
                                    <div className="form-text">PDF or Word document, up to 5MB.</div>
                                    {formErrors.resume && <div className="invalid-feedback d-block">{formErrors.resume}</div>}
                                </div>

                                <div className="col-12">
                                    <label htmlFor="message-modal" className="form-label fw-semibold">Cover Note (optional)</label>
                                    <textarea
                                        id="message-modal"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Tell us a bit about yourself..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="pms-btn-solid btn btn-lg rounded-pill mt-4 w-100"
                                style={{ backgroundColor: '#06cabc', color: '#fff', fontWeight: 600, padding: '12px 36px', border: 'none' }}
                            >
                                {submitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>Submit Application <i className="fa-regular fa-paper-plane ms-1" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default CareersPage;