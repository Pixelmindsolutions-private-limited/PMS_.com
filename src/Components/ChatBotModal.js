// ChatBotModal.jsx
import React, { useRef, useEffect, useState } from "react";

const ChatbotModal = ({ show, onClose, onOptionSelect }) => {
  const modalRef = useRef();
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showChat, setShowChat] = useState(false);

  // Navigation options with corresponding routes/sections
  const navigationOptions = [
    {
      id: 'app-dev',
      label: '📱 App Development',
      section: 'services-app',
      route: '/appdevelopment',
      emoji: '📱'
    },
    {
      id: 'web-dev',
      label: '💻 Web Development',
      section: 'services-web',
      route: '/webdevelopment',
      emoji: '💻'
    },
    {
      id: 'uiux',
      label: '🎨 UI/UX Design',
      section: 'services-uiux',
      route: '/uiuxdesign',
      emoji: '🎨'
    },
    {
      id: 'digital-marketing',
      label: '📊 Digital Marketing',
      section: 'services-marketing',
      route: 'https://www.pixelmindsolutions.in',
      emoji: '📊'
    },
    {
      id: 'web-enquiry',
      label: '📝 Web Enquiry',
      section: 'contact',
      route: '/contact',
      emoji: '📝'
    },
    {
      id: 'just-visiting',
      label: '👀 Just Visiting',
      section: 'home',
      route: '/',
      emoji: '👀'
    },
  ];

  const handlePopUp = () => {
    if(onOptionSelect === 'home'){
    sessionStorage.setItem('openOffer', 'true');
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (e.target.closest('.chatbot-modal-container')) {
          return;
        }
        onClose();
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        handlePopUp();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'hidden';

      // Auto-greet when modal shows for the first time
      if (!hasGreeted) {
        setTimeout(() => {
          setHasGreeted(true);
        }, 300);
      }

      // Reset chat view when modal opens
      setShowChat(false);
      setShowOptions(true);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [show, onClose, hasGreeted]);

  // Handle navigation option click
  const handleOptionClick = (option) => {
    setShowOptions(false);

    // Call parent handler if provided
    if (onOptionSelect) {
      onOptionSelect(option);
    }

    // Navigate to the section
    if (option.section) {
      const section = document.getElementById(option.section);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          onClose();
        }, 300);
      } else {
        if (window.location.pathname !== option.route.split("#")[0]) {
          window.open(option.route, "_blank", "noopener,noreferrer");
        } else {
          setTimeout(() => {
            const targetSection = document.getElementById(option.section);
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            onClose();
          }, 500);
        }
      }
    }
  };

  // Handle "Chat with Me" button click
  const handleChatWithMe = () => {
    setShowOptions(false);
    setShowChat(true);
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setShowOptions(true);
        setShowChat(false);
      }, 300);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="chatbot-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeInOverlay 0.3s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handlePopUp();
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="chatbot-modal-container"
        style={{
          width: window.innerWidth <= 768 ? '95%' : '450px',
          height: window.innerWidth <= 768 ? '95%' : '600px',
          maxWidth: '500px',
          maxHeight: '700px',
          borderRadius: window.innerWidth <= 768 ? '15px' : '20px',
          backgroundColor: "#128C7E",
          border: "none",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transformOrigin: 'center',
          animation: 'scaleUp 0.3s ease-out',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: "15px 20px",
          backgroundColor: '#128C7E',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h4 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <strong>PIXIE</strong>

          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePopUp();
              onClose();
            }}
            aria-label="Close"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: 'white',
              width: '36px',
              height: '36px',
              fontSize: '22px',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0,
              lineHeight: '1'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.25)';
              e.target.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
              e.target.style.transform = 'rotate(0deg)';
            }}
          >✕</button>
        </div>

        {/* Options View (Default) */}
        {showOptions && (
          <div style={{
            flex: 1,
            backgroundColor: '#ffffff',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}>
            {/* Greeting Message */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#128C7E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0
              }}>
                🤖
              </div>
              <div>
                <div style={{
                  backgroundColor: '#f0f7f4',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  borderTopLeftRadius: '4px',
                  maxWidth: '90%',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  lineHeight: '1.6'
                }}>
                  Hi, I'm <strong style={{ color: '#128C7E' }}>Pixie</strong>! 👋<br />
                  What are you looking for today?
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  marginTop: '6px',
                  paddingLeft: '4px'
                }}>
                  Select an option or chat with me
                </div>
              </div>
            </div>

            {/* Quick Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {navigationOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    padding: '12px 14px',
                    fontSize: '13px',
                    backgroundColor: '#f8fafa',
                    color: '#1a1a1a',
                    border: '2px solid #e8f0ee',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: '500',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#128C7E';
                    e.target.style.color = 'white';
                    e.target.style.borderColor = '#128C7E';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(18,140,126,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8fafa';
                    e.target.style.color = '#1a1a1a';
                    e.target.style.borderColor = '#e8f0ee';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >

                  {option.label}
                </button>
              ))}
            </div>

            {/* Chat with Me Button */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '15px',
              borderTop: '2px solid #e8f0ee'
            }}>
              <button
                onClick={handleChatWithMe}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '600',
                  backgroundColor: '#128C7E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#0f6b5e';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 4px 15px rgba(18,140,126,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#128C7E';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '20px' }}>💬</span>
                Chat with Me
                <span style={{ fontSize: '14px' }}>→</span>
              </button>
              <p style={{
                textAlign: 'center',
                fontSize: '11px',
                color: '#999',
                marginTop: '8px',
                marginBottom: 0
              }}>
                Get personalized assistance from Pixie
              </p>
            </div>
          </div>
        )}

        {/* Chat View (Only when "Chat with Me" is clicked) */}
        {showChat && (
          <div style={{
            flex: 1,
            overflow: "hidden",
            backgroundColor: '#ffffff'
          }}>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/StrrYMAVxfZ0SFwczgreD"
              width="100%"
              height="100%"
              frameBorder="0"
              title="PMS AI Assistant"
              style={{
                border: "none",
                backgroundColor: "transparent"
              }}
              allow="microphone"
            />
          </div>
        )}

        <style>
          {`
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
            
            @keyframes fadeInOverlay {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .chatbot-modal-container {
              animation: scaleUp 0.3s ease-out;
            }

            .chatbot-modal-overlay {
              animation: fadeInOverlay 0.3s ease-out;
            }

            /* Custom scrollbar */
            .chatbot-modal-container div::-webkit-scrollbar {
              width: 4px;
            }
            .chatbot-modal-container div::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            .chatbot-modal-container div::-webkit-scrollbar-thumb {
              background: #128C7E;
              border-radius: 4px;
            }

            @media (max-width: 768px) {
              .chatbot-modal-container {
                max-height: 90vh !important;
              }
            }

            @media (max-width: 480px) {
              .chatbot-modal-container button {
                font-size: 12px !important;
                padding: 10px 12px !important;
              }
              
              .chatbot-modal-container div[style*="grid-template-columns"] {
                grid-template-columns: 1fr 1fr !important;
              }
            }

            /* Prevent body scroll when modal is open */
            body.modal-open {
              overflow: hidden;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ChatbotModal;