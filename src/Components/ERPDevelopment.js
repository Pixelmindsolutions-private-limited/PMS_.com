// Erp.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function ERPDevelopment() {
  const styles = {
    highlight: { color: '#06cabc', fontWeight: 600 },
    heading: {
      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
      fontWeight: 700,
      marginBottom: '20px',
      color: '#1a1a2e',
      lineHeight: 1.25,
    },
    subheading: {
      fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#1a1a2e',
    },
    paragraph: {
      fontSize: 'clamp(0.95rem, 1.2vw, 1rem)',
      lineHeight: 1.8,
      color: '#5a5f6e',
      marginBottom: '18px',
    },
    card: {
      backgroundColor: '#f8f9fa',
      borderRadius: '16px',
      padding: '32px 24px',
      border: '1px solid #eef0f3',
    },
    testimonialCard: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 6px 24px rgba(15,23,42,0.06)',
      height: '100%',
      border: '1px solid rgba(6,202,188,0.12)',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const Highlight = ({ children }) => <span style={styles.highlight}>{children}</span>;

  const features = [
    { icon: 'fa-solid fa-diagram-project', title: 'Custom ERP Development', desc: 'Tailor-made ERP systems designed around your unique business workflows.' },
    { icon: 'fa-solid fa-pen-ruler', title: 'ERP Customization', desc: 'Enhance your existing ERP with features that match your operational needs.' },
    { icon: 'fa-solid fa-link', title: 'ERP Integration', desc: 'Connect ERP with CRM, accounting software, payment gateways, and HR systems.' },
    { icon: 'fa-solid fa-cloud', title: 'Cloud ERP Solutions', desc: 'Access your business securely from anywhere with cloud-based ERP platforms.' },
    { icon: 'fa-solid fa-arrow-right-arrow-left', title: 'ERP Migration', desc: 'Move from legacy systems to modern ERP solutions without disrupting operations.' },
    { icon: 'fa-solid fa-headset', title: 'Ongoing ERP Support', desc: 'Continuous maintenance, updates, performance optimization, and technical support.' },
  ];

  const keyFeatures = [
    'Centralized Business Management',
    'Inventory & Stock Management',
    'Finance & Accounting',
    'HR & Payroll',
    'Sales & CRM Integration',
    'Purchase & Vendor Management',
    'Reporting & Analytics Dashboard',
    'Multi-User Access',
    'Role-Based Permissions',
    'Mobile-Friendly Access',
  ];

  const process = [
    { step: '01', title: 'Requirement Analysis', desc: 'Understanding your business goals and technical needs' },
    { step: '02', title: 'Workflow Mapping', desc: 'Designing the ERP structure around your business processes' },
    { step: '03', title: 'UI/UX Planning', desc: 'Creating user-friendly interfaces for better adoption' },
    { step: '04', title: 'ERP Development', desc: 'Building scalable modules with clean, secure code' },
    { step: '05', title: 'Testing & QA', desc: 'Ensuring accuracy, performance, and reliability' },
    { step: '06', title: 'Deployment', desc: 'Moving data and training your team for go-live' },
    { step: '07', title: 'Training & Support', desc: 'Handover, user training, and post-launch assistance' },
  ];

  const testimonials = [
    { name: 'Alisha Perween', text: 'A trusted IT company with a skilled team and great technical knowledge. They delivered a smooth solution and provided excellent customer support throughout the project.' },
    { name: 'Sai Kotte', text: 'One of the most dependable teams for development. They created a professional solution that matched our expectations and provided smooth service throughout the process.' },
    { name: 'Kadupudi Nimisha', text: 'Had a wonderful experience with their service. The team understands business goals, provides creative solutions, and maintains good communication.' },
  ];

  return (
    <div>
      <style>{`
        .pms-erp-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          padding: clamp(70px, 14vw, 130px) 0;
        }
        .pms-erp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,15,30,0.82) 0%, rgba(6,202,188,0.55) 100%);
        }
        .pms-erp-hero .container { position: relative; z-index: 2; }
        .pms-erp-hero h1 { font-size: clamp(1.8rem, 4.6vw, 3rem); line-height: 1.2; }
        .pms-erp-btn-solid, .pms-erp-btn-outline {
          display: inline-block;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .pms-erp-btn-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(6,202,188,0.35);
          color: #fff;
        }
        .pms-erp-btn-outline:hover {
          background-color: #06cabc !important;
          color: #fff !important;
          transform: translateY(-3px);
        }
        .pms-erp-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          height: 100%;
        }
        .pms-erp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(15,23,42,0.10);
          border-color: rgba(6,202,188,0.35) !important;
        }
        .pms-erp-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6,202,188,0.10);
          margin: 0 auto 18px;
        }
        .pms-erp-process-wrap { position: relative; }
        .pms-erp-process-line {
          position: absolute;
          top: 35px;
          left: 8.33%;
          right: 8.33%;
          height: 2px;
          background: repeating-linear-gradient(90deg, #06cabc 0, #06cabc 8px, transparent 8px, transparent 16px);
          z-index: 0;
        }
        .pms-erp-process-circle {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .pms-erp-step:hover .pms-erp-process-circle {
          transform: scale(1.1);
          box-shadow: 0 8px 18px rgba(6,202,188,0.4);
        }
        .pms-erp-testimonial:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(15,23,42,0.10);
        }
        .pms-erp-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06cabc, #1a1a2e);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }
        @media (max-width: 991px) {
          .pms-erp-process-line { display: none; }
        }
      `}</style>

      <Header />
      <main>

        {/* Hero Section */}
        <section className="pms-erp-hero" style={{ backgroundImage: `url(${'/assets/images/banner/banner-inner-page.jpg'})` }}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-9 mx-auto text-center">
                <h1 className="wow fadeInUp fw-bold text-white mb-3">
                  <Highlight>ERP Solutions That Simplify Your Business</Highlight>
                </h1>
                <p className="wow fadeInUp fs-5 text-white-50 mb-4">Transform your business operations with custom ERP solutions designed to automate workflows, improve collaboration, and provide real-time insights for smarter decision-making.</p>
                <div className="wow fadeInUp d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/contact" className="pms-erp-btn-solid btn btn-lg rounded-pill" style={{ backgroundColor: '#06cabc', color: '#fff', fontWeight: 600, padding: '12px 32px' }}>
                    Get Free Consultation
                  </Link>
                  <Link to="/demo" className="pms-erp-btn-outline btn btn-lg rounded-pill" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 600, padding: '12px 32px' }}>
                    Request a Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6">
                <h2 style={styles.heading}>Manage Your Business from <Highlight>One Powerful Platform</Highlight></h2>
                <p style={styles.paragraph}>Every growing business faces challenges in managing multiple departments, scattered data, and manual processes. Our ERP solutions bring finance, sales, HR, inventory, procurement, and operations together into one centralized system.</p>
                <p style={styles.paragraph}>At PixelMind Solutions, we build scalable ERP solutions tailored to your business processes—helping you improve efficiency, reduce operational costs, and make data-driven decisions.</p>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>From initial process mapping to development, data migration, and staff training, we manage the full ERP rollout so your business can scale without operational bottlenecks.</p>
              </div>
              <div className="col-12 col-lg-6">
                <div className="position-relative">
                  <img src="/assets/images/service/service-image1.jpg" alt="ERP Software Development" className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', maxHeight: '460px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 col-lg-8 mx-auto text-center">
                <h2 style={styles.heading}>What <Highlight>We Offer</Highlight></h2>
                <p style={styles.paragraph}>Comprehensive ERP services designed to fit your business needs.</p>
              </div>
            </div>
            <div className="row g-4">
              {features.map((item, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-lg-4">
                  <div style={styles.card} className="pms-erp-card text-center">
                    <div className="pms-erp-icon-wrap">
                      <i className={`${item.icon} fs-4`} style={{ color: '#06cabc' }}></i>
                    </div>
                    <h4 style={styles.subheading}>{item.title}</h4>
                    <p style={{ ...styles.paragraph, marginBottom: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6 order-lg-2">
                <h2 style={styles.heading}>Key <Highlight>Features</Highlight></h2>
                <p style={styles.paragraph}>Our ERP solutions come packed with powerful features to streamline your operations.</p>
                <div className="row g-2">
                  {keyFeatures.map((feature, idx) => (
                    <div key={idx} className="col-12 col-md-6">
                      <div className="d-flex align-items-center gap-2 p-2 rounded" style={{ transition: 'background 0.2s' }}>
                        <i className="fa-solid fa-check-circle" style={{ color: '#06cabc', fontSize: '1.1rem' }}></i>
                        <span style={{ color: '#1a1a2e', fontWeight: 500 }}>{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 col-lg-6 order-lg-1">
                <img src="/assets/images/service/service-image2.jpg" alt="ERP Features" className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', maxHeight: '460px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-5" style={{ backgroundColor: '#f0fdfb', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 style={styles.heading}>Why Choose <Highlight>PixelMind Solutions</Highlight></h2>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {[
                'Business-focused ERP strategies',
                'Fully customized solutions',
                'Scalable architecture',
                'Secure cloud deployment',
                'Seamless integrations',
                'Dedicated post-launch support',
              ].map((item, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-lg-4">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm h-100">
                    <i className="fa-solid fa-circle-check fs-4" style={{ color: '#06cabc' }}></i>
                    <span style={{ fontWeight: 500, color: '#1a1a2e' }}>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Diagram */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 col-lg-8 mx-auto text-center">
                <h2 style={styles.heading}>Our <Highlight>Development Process</Highlight></h2>
                <p style={styles.paragraph}>A structured approach to build your custom ERP system</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="pms-erp-process-wrap p-4 p-md-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px' }}>
                  <div className="pms-erp-process-line d-none d-lg-block" />
                  <div className="row g-4 g-lg-0">
                    {process.map((item, idx) => (
                      <div key={idx} className="col-6 col-md-4 col-lg">
                        <div className="pms-erp-step text-center">
                          <div className="pms-erp-process-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px', backgroundColor: '#06cabc', borderRadius: '50%', color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
                            {item.step}
                          </div>
                          <h5 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>{item.title}</h5>
                          <p className="small text-secondary mb-0">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 style={styles.heading}>What Our <Highlight>Clients Say</Highlight></h2>
              </div>
            </div>
            <div className="row g-4">
              {testimonials.map((t, i) => (
                <div key={i} className="col-12 col-md-4">
                  <div style={styles.testimonialCard} className="pms-erp-testimonial">
                    <i className="fa-solid fa-quote-left fs-3 mb-3" style={{ color: '#06cabc', opacity: 0.3 }} />
                    <p style={{ ...styles.paragraph, flexGrow: 1 }}>"{t.text}"</p>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <div className="pms-erp-avatar">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                      <div>
                        <h6 className="mb-0 fw-bold">{t.name}</h6>
                        <div style={{ color: '#f5a623', fontSize: '0.8rem' }}>★★★★★</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-5" style={{ backgroundColor: '#06cabc', color: '#fff', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-9 mx-auto text-center">
                <h2 style={{ ...styles.heading, color: '#fff' }}>
                  Ready to <span style={{ backgroundColor: '#fff', color: '#06cabc', padding: '0 12px', borderRadius: '8px', display: 'inline-block' }}>Modernize Your Business</span>?
                </h2>
                <p style={{ ...styles.paragraph, color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 30px' }}>Let's build an ERP solution that improves efficiency, simplifies operations, and supports your long-term growth.</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/contact" className="pms-erp-btn-solid btn btn-lg rounded-pill" style={{ backgroundColor: '#fff', color: '#06cabc', fontWeight: 600, padding: '12px 32px' }}>Talk to Our ERP Experts</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default ERPDevelopment;