// ChatBotModal.jsx
// Premium 3D glassmorphic redesign — built with React + Bootstrap utility classes.
// NOTE: This component assumes Bootstrap's CSS is already loaded in your project, e.g.:
//   import 'bootstrap/dist/css/bootstrap.min.css';
// The signature "tilt-tile" + glowing orb interactions are custom CSS (scoped under .pixie-*)
// layered on top of Bootstrap for layout/spacing utilities.

import React, { useRef, useEffect, useState, useCallback } from "react";

const ChatbotModal = ({ show, onClose, onOptionSelect }) => {
  const modalRef = useRef();
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const navigationOptions = [
    { id: "app-dev", label: "App Development", section: "services-app", route: "/appdevelopment", emoji: "📱" },
    { id: "web-dev", label: "Web Development", section: "services-web", route: "/webdevelopment", emoji: "💻" },
    { id: "uiux", label: "UI/UX Design", section: "services-uiux", route: "/uiuxdesign", emoji: "🎨" },
    { id: "digital-marketing", label: "Digital Marketing", section: "services-marketing", route: "https://www.pixelmindsolutions.in", emoji: "📊" },
    { id: "web-enquiry", label: "Web Enquiry", section: "contact", route: "/contact", emoji: "📝" },
    { id: "just-visiting", label: "Just Visiting", section: "home", route: "/", emoji: "👀" },
  ];

  const handlePopUp = () => {
    if (onOptionSelect === "home") {
      sessionStorage.setItem("openOffer", "true");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (e.target.closest(".pixie-modal")) return;
        onClose();
      }
    };
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        handlePopUp();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
      if (!hasGreeted) setTimeout(() => setHasGreeted(true), 300);
      setShowChat(false);
      setShowOptions(true);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [show, onClose, hasGreeted]);

  const handleOptionClick = (option) => {
    setShowOptions(false);

    if (onOptionSelect) onOptionSelect(option);

    // Open only Digital Marketing in a new tab
    if (option.id === "digital-marketing") {
      window.open(option.route, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }

    // If section exists on current page, scroll to it
    if (option.section) {
      const section = document.getElementById(option.section);

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => onClose(), 300);
        return;
      }
    }

    // Navigate to another page in the same tab
    if (window.location.pathname !== option.route) {
      window.location.href = option.route;
      return;
    }

    // If already on the page, try scrolling after render
    setTimeout(() => {
      const targetSection = document.getElementById(option.section);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      onClose();
    }, 500);
  };

  const handleChatWithMe = () => {
    setShowOptions(false);
    setShowChat(true);
  };

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setShowOptions(true);
        setShowChat(false);
      }, 300);
    }
  }, [show]);

  // 3D mouse-tracked tilt for option tiles (signature interaction)
  const handleTileMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) scale(1.035)`;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  }, []);

  const handleTileLeave = useCallback((e) => {
    e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  }, []);

  if (!show) return null;

  return (
    <div
      className="pixie-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handlePopUp();
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="pixie-modal d-flex flex-column"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pixie-header d-flex align-items-center justify-content-between px-3 py-3 flex-shrink-0">
          <div className="d-flex align-items-center gap-2">
            <div className="pixie-orb">
              <span className="pixie-orb-ring pixie-orb-ring-1" />
              <span className="pixie-orb-ring pixie-orb-ring-2" />
              <span className="pixie-orb-core">🤖</span>
            </div>
            <div className="d-flex flex-column">
              <span className="pixie-title">PIXIE</span>
              <span className="pixie-subtitle">
                <span className="pixie-status-dot" /> Online now
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePopUp();
              onClose();
            }}
            aria-label="Close"
            className="pixie-close-btn"
          >
            ✕
          </button>
        </div>

        {/* Options View */}
        {showOptions && (
          <div className="pixie-body flex-grow-1 px-3 py-3 d-flex flex-column">
            <div className="d-flex align-items-start gap-2 mb-3 pixie-greeting">
              <div className="pixie-avatar-sm">🤖</div>
              <div>
                <div className="pixie-bubble">
                  Hi, I'm <strong>Pixie</strong>! 👋
                  <br />
                  What are you looking for today?
                </div>
                <div className="pixie-hint">Select an option or chat with me</div>
              </div>
            </div>

            <div className="pixie-grid mb-3">
              {navigationOptions.map((option, i) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  onMouseMove={handleTileMove}
                  onMouseLeave={handleTileLeave}
                  className="pixie-tile"
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
                  <span className="pixie-tile-emoji">{option.emoji}</span>
                  <span className="pixie-tile-label">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="pixie-cta-wrap mt-auto">
              <button onClick={handleChatWithMe} className="pixie-cta">
                <span className="pixie-cta-shine" />
                <span className="pixie-cta-icon">💬</span>
                <span>Chat with Me</span>
                <span className="pixie-cta-arrow">→</span>
              </button>
              <p className="pixie-cta-caption">Get personalized assistance from Pixie</p>
            </div>
          </div>
        )}

        {/* Chat View */}
        {showChat && (
          <div className="flex-grow-1 overflow-hidden bg-white">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/StrrYMAVxfZ0SFwczgreD"
              width="100%"
              height="100%"
              frameBorder="0"
              title="PMS AI Assistant"
              style={{ border: "none", backgroundColor: "transparent" }}
              allow="microphone"
            />
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

        .pixie-overlay {
          background: radial-gradient(circle at 50% 20%, rgba(18,140,126,0.25), rgba(4,12,11,0.85) 60%);
          backdrop-filter: blur(6px);
          animation: pixieFade 0.35s ease-out;
          font-family: 'Inter', sans-serif;
        }

        .pixie-modal {
          width: ${window.innerWidth <= 768 ? "94%" : "460px"};
          height: ${window.innerWidth <= 768 ? "92%" : "620px"};
          max-width: 500px;
          max-height: 720px;
          border-radius: 24px;
          background: linear-gradient(165deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.55),
            0 0 0 1px rgba(34,230,197,0.08) inset,
            0 1px 0 rgba(255,255,255,0.25) inset;
          overflow: hidden;
          position: relative;
          animation: pixieEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .pixie-header {
          background: linear-gradient(120deg, #0f4f47, #128C7E, #0d6b5f, #128C7E);
          background-size: 300% 300%;
          animation: pixieGradient 8s ease infinite;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          position: relative;
        }

        .pixie-orb {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pixie-orb-core {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #2be6c9, #0d6b5f 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          box-shadow: 0 4px 14px rgba(34,230,197,0.5), inset 0 1px 2px rgba(255,255,255,0.4);
          z-index: 2;
        }
        .pixie-orb-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(43,230,201,0.55);
          animation: pixiePulse 2.4s ease-out infinite;
        }
        .pixie-orb-ring-2 { animation-delay: 1.2s; }

        .pixie-title {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #fff;
          font-size: 17px;
          line-height: 1.1;
        }
        .pixie-subtitle {
          font-size: 11.5px;
          color: rgba(255,255,255,0.75);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .pixie-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ee6b8;
          box-shadow: 0 0 6px #4ee6b8;
          animation: pixieBlink 1.8s ease-in-out infinite;
        }

        .pixie-close-btn {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pixie-close-btn:hover {
          background: rgba(255,80,80,0.85);
          transform: rotate(90deg) scale(1.08);
          box-shadow: 0 4px 14px rgba(255,80,80,0.45);
        }

        .pixie-body {
          background: linear-gradient(180deg, #0c1f1c 0%, #0a1815 100%);
          overflow-y: auto;
        }

        .pixie-greeting { animation: pixieRise 0.5s ease-out 0.15s both; }
        .pixie-avatar-sm {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #2be6c9, #0d6b5f 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(34,230,197,0.35);
        }
        .pixie-bubble {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 13px 16px;
          border-radius: 14px;
          border-top-left-radius: 4px;
          font-size: 14.5px;
          color: #eaf6f3;
          line-height: 1.6;
          max-width: 92%;
        }
        .pixie-bubble strong { color: #4ee6b8; }
        .pixie-hint { font-size: 11.5px; color: #7fa39a; margin-top: 6px; padding-left: 2px; }

        .pixie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
          gap: 10px;
        }

        .pixie-tile {
          position: relative;
          padding: 14px 12px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          color: #eaf6f3;
          font-size: 12.5px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          animation: pixieTileIn 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
        .pixie-tile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(160px circle at var(--mx,50%) var(--my,50%), rgba(78,230,184,0.25), transparent 65%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .pixie-tile:hover {
          border-color: rgba(78,230,184,0.55);
          background: rgba(78,230,184,0.08);
          box-shadow: 0 14px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(78,230,184,0.15);
        }
        .pixie-tile:hover::before { opacity: 1; }
        .pixie-tile-emoji { font-size: 20px; }
        .pixie-tile-label { line-height: 1.3; }

        .pixie-cta-wrap { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; }
        .pixie-cta {
          position: relative;
          width: 100%;
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          color: #06251f;
          background: linear-gradient(100deg, #4ee6b8, #22c39a 45%, #4ee6b8);
          background-size: 220% auto;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          overflow: hidden;
          box-shadow: 0 10px 26px rgba(34,195,154,0.35);
          transition: transform 0.25s ease, background-position 0.6s ease, box-shadow 0.25s ease;
        }
        .pixie-cta:hover {
          transform: translateY(-2px) scale(1.015);
          background-position: right center;
          box-shadow: 0 16px 34px rgba(34,195,154,0.5);
        }
        .pixie-cta-shine {
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          animation: pixieShine 2.6s ease-in-out infinite;
        }
        .pixie-cta-icon { font-size: 18px; }
        .pixie-cta-arrow { transition: transform 0.25s ease; }
        .pixie-cta:hover .pixie-cta-arrow { transform: translateX(4px); }
        .pixie-cta-caption { text-align: center; font-size: 11px; color: #6f948b; margin: 8px 0 0; }

        @keyframes pixieFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pixieEnter {
          from { opacity: 0; transform: perspective(1000px) rotateX(-12deg) translateY(30px) scale(0.92); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); }
        }
        @keyframes pixieGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pixiePulse {
          0% { transform: scale(0.85); opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes pixieBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes pixieRise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pixieTileIn { from { opacity: 0; transform: translateY(14px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pixieShine { 0% { left: -60%; } 100% { left: 140%; } }

        .pixie-body::-webkit-scrollbar { width: 5px; }
        .pixie-body::-webkit-scrollbar-track { background: transparent; }
        .pixie-body::-webkit-scrollbar-thumb { background: rgba(78,230,184,0.4); border-radius: 4px; }

        @media (max-width: 480px) {
          .pixie-grid { grid-template-columns: 1fr 1fr; }
          .pixie-tile-label { font-size: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pixie-modal, .pixie-tile, .pixie-cta-shine, .pixie-orb-ring, .pixie-header { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ChatbotModal;