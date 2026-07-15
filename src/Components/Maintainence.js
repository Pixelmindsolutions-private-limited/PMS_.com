// Maintenance.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Maintenance() {
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

  const services = [
    { icon: 'fa-solid fa-gauge-high', title: 'Performance Optimization', desc: 'Improve application speed, responsiveness, and overall efficiency.' },
    { icon: 'fa-solid fa-bug', title: 'Bug Fixes', desc: 'Identify and resolve issues before they impact your users.' },
    { icon: 'fa-solid fa-shield-halved', title: 'Security Updates', desc: 'Protect your applications with the latest security patches and vulnerability fixes.' },
    { icon: 'fa-solid fa-puzzle-piece', title: 'Feature Enhancements', desc: 'Continuously improve your application by adding new features and functionality.' },
    { icon: 'fa-solid fa-plug', title: 'API & Third-Party Maintenance', desc: 'Ensure integrations remain stable and compatible with evolving platforms.' },
    { icon: 'fa-solid fa-database', title: 'Database Optimization', desc: 'Enhance database performance for faster and more reliable operations.' },
    { icon: 'fa-solid fa-server', title: 'Cloud & Server Monitoring', desc: 'Monitor infrastructure to maximize uptime and system reliability.' },
    { icon: 'fa-solid fa-headset', title: 'Technical Support', desc: 'Fast, dependable support whenever you need assistance.' },
  ];

  const included = [
    'Preventive Maintenance',
    'Corrective Maintenance',
    'Adaptive Maintenance',
    'Perfective Maintenance',
    'Security Monitoring',
    'Backup & Recovery',
    'Version Upgrades',
    'Performance Reports',
  ];

  const suitable = [
    'Business Applications',
    'ERP Systems',
    'CRM Platforms',
    'E-commerce Websites',
    'Mobile Applications',
    'SaaS Products',
    'Enterprise Software',
    'Custom Web Applications',
  ];

  const process = [
    { step: '01', title: 'System Audit', desc: 'Reviewing your current application health' },
    { step: '02', title: 'Performance Assessment', desc: 'Evaluating speed, reliability, and efficiency' },
    { step: '03', title: 'Issue Identification', desc: 'Finding bugs, vulnerabilities, and bottlenecks' },
    { step: '04', title: 'Maintenance Planning', desc: 'Setting priorities and a support schedule' },
    { step: '05', title: 'Updates & Optimization', desc: 'Applying fixes, patches, and improvements' },
    { step: '06', title: 'Testing', desc: 'Validating changes before deployment' },
    { step: '07', title: 'Continuous Monitoring', desc: 'Ongoing oversight for long-term health' },
  ];

  const testimonials = [
    { name: 'Alisha Perween', text: 'A trusted IT company with a skilled team and great technical knowledge. They delivered a smooth solution and provided excellent customer support throughout the project.' },
    { name: 'Sai Kotte', text: 'One of the most dependable teams for development. They created a professional solution that matched our expectations and provided smooth service throughout the process.' },
    { name: 'Kadupudi Nimisha', text: 'Had a wonderful experience with their service. The team understands business goals, provides creative solutions, and maintains good communication.' },
  ];

  return (
    <div>
      <style>{`
        .pms-maint-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          padding: clamp(70px, 14vw, 130px) 0;
        }
        .pms-maint-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,15,30,0.82) 0%, rgba(6,202,188,0.55) 100%);
        }
        .pms-maint-hero .container { position: relative; z-index: 2; }
        .pms-maint-hero h1 { font-size: clamp(1.8rem, 4.6vw, 3rem); line-height: 1.2; }
        .pms-maint-btn-solid, .pms-maint-btn-outline {
          display: inline-block;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .pms-maint-btn-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(6,202,188,0.35);
          color: #fff;
        }
        .pms-maint-btn-outline:hover {
          background-color: #06cabc !important;
          color: #fff !important;
          transform: translateY(-3px);
        }
        .pms-maint-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          height: 100%;
        }
        .pms-maint-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(15,23,42,0.10);
          border-color: rgba(6,202,188,0.35) !important;
        }
        .pms-maint-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6,202,188,0.10);
          margin: 0 auto 18px;
        }
        .pms-maint-process-wrap { position: relative; }
        .pms-maint-process-line {
          position: absolute;
          top: 35px;
          left: 8.33%;
          right: 8.33%;
          height: 2px;
          background: repeating-linear-gradient(90deg, #06cabc 0, #06cabc 8px, transparent 8px, transparent 16px);
          z-index: 0;
        }
        .pms-maint-process-circle {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .pms-maint-step:hover .pms-maint-process-circle {
          transform: scale(1.1);
          box-shadow: 0 8px 18px rgba(6,202,188,0.4);
        }
        .pms-maint-testimonial:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(15,23,42,0.10);
        }
        .pms-maint-avatar {
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
          .pms-maint-process-line { display: none; }
        }
      `}</style>

      <Header />
      <main>

        {/* Hero Section */}
        <section className="pms-maint-hero" style={{ backgroundImage: `url(${'/assets/images/banner/banner-inner-page.jpg'})` }}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-9 mx-auto text-center">
                <h1 className="wow fadeInUp fw-bold text-white mb-3">
                  <Highlight>Keep Your Applications Running at Their Best</Highlight>
                </h1>
                <p className="wow fadeInUp fs-5 text-white-50 mb-4">Ensure your software remains secure, reliable, and high-performing with proactive application maintenance and ongoing technical support.</p>
                <div className="wow fadeInUp d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/contact" className="pms-maint-btn-solid btn btn-lg rounded-pill" style={{ backgroundColor: '#06cabc', color: '#fff', fontWeight: 600, padding: '12px 32px' }}>
                    Schedule Consultation
                  </Link>
                  <Link to="/support" className="pms-maint-btn-outline btn btn-lg rounded-pill" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 600, padding: '12px 32px' }}>
                    Get Support
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
                <h2 style={styles.heading}>Reliable Maintenance for <Highlight>Long-Term Success</Highlight></h2>
                <p style={styles.paragraph}>Launching an application is only the beginning. Regular maintenance keeps your software secure, optimized, and ready to meet changing business needs.</p>
                <p style={styles.paragraph}>At PixelMind Solutions, we provide comprehensive application maintenance services that help businesses improve performance, reduce downtime, and deliver a seamless user experience.</p>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>Whether you need a one-time health check or an ongoing maintenance partner, our team handles updates, bug fixes, backups, and performance tuning — so you can focus on running your business.</p>
              </div>
              <div className="col-12 col-lg-6">
                <div className="position-relative">
                  <img src="/assets/images/service/service-image4.jpg" alt="Application Maintenance" className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', maxHeight: '460px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 col-lg-8 mx-auto text-center">
                <h2 style={styles.heading}>Our <Highlight>Services</Highlight></h2>
                <p style={styles.paragraph}>Comprehensive maintenance services to keep your applications running smoothly.</p>
              </div>
            </div>
            <div className="row g-4">
              {services.map((item, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-lg-3">
                  <div style={styles.card} className="pms-maint-card text-center">
                    <div className="pms-maint-icon-wrap">
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

        {/* What's Included Section */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6 order-lg-2">
                <h2 style={styles.heading}>What's <Highlight>Included</Highlight></h2>
                <p style={styles.paragraph}>Our maintenance plans cover everything your application needs to stay healthy.</p>
                <div className="row g-2">
                  {included.map((item, idx) => (
                    <div key={idx} className="col-12 col-md-6">
                      <div className="d-flex align-items-center gap-2 p-2 rounded">
                        <i className="fa-solid fa-check-circle" style={{ color: '#06cabc', fontSize: '1.1rem' }}></i>
                        <span style={{ color: '#1a1a2e', fontWeight: 500 }}>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 col-lg-6 order-lg-1">
                <img src="/assets/images/service/service-image5.jpg" alt="Maintenance Included" className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', maxHeight: '460px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-5" style={{ backgroundColor: '#f0fdfb', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 style={styles.heading}>Why Businesses <Highlight>Choose Us</Highlight></h2>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {[
                'Faster Issue Resolution',
                'Reduced Downtime',
                'Improved Security',
                'Better User Experience',
                'Long-Term Cost Savings',
                'Scalable Support Plans',
                'Dedicated Maintenance Team',
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
                <h2 style={styles.heading}>Our Maintenance <Highlight>Process</Highlight></h2>
                <p style={styles.paragraph}>A structured approach to keep your product healthy month after month</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="pms-maint-process-wrap p-4 p-md-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px' }}>
                  <div className="pms-maint-process-line d-none d-lg-block" />
                  <div className="row g-4 g-lg-0">
                    {process.map((item, idx) => (
                      <div key={idx} className="col-6 col-md-4 col-lg">
                        <div className="pms-maint-step text-center">
                          <div className="pms-maint-process-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px', backgroundColor: '#06cabc', borderRadius: '50%', color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
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

        {/* Suitable For Section */}
        <section className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6">
                <h2 style={styles.heading}>Suitable <Highlight>For</Highlight></h2>
                <p style={styles.paragraph}>Our maintenance services are designed for a wide range of applications.</p>
                <div className="row g-2">
                  {suitable.map((item, idx) => (
                    <div key={idx} className="col-12 col-md-6">
                      <div className="d-flex align-items-center gap-2 p-2 rounded">
                        <i className="fa-solid fa-check-circle" style={{ color: '#06cabc', fontSize: '1.1rem' }}></i>
                        <span style={{ color: '#1a1a2e', fontWeight: 500 }}>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <img src="/assets/images/service/service-image6.jpg" alt="Suitable Applications" className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', maxHeight: '400px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 style={styles.heading}>What Our <Highlight>Clients Say</Highlight></h2>
              </div>
            </div>
            <div className="row g-4">
              {testimonials.map((t, i) => (
                <div key={i} className="col-12 col-md-4">
                  <div style={styles.testimonialCard} className="pms-maint-testimonial">
                    <i className="fa-solid fa-quote-left fs-3 mb-3" style={{ color: '#06cabc', opacity: 0.3 }} />
                    <p style={{ ...styles.paragraph, flexGrow: 1 }}>"{t.text}"</p>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <div className="pms-maint-avatar">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
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
                  Keep Your Software <span style={{ backgroundColor: '#fff', color: '#06cabc', padding: '0 12px', borderRadius: '8px', display: 'inline-block' }}>Secure, Fast & Future-Ready</span>
                </h2>
                <p style={{ ...styles.paragraph, color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 30px' }}>Focus on growing your business while we take care of your application's performance, security, and ongoing improvements.</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/contact" className="pms-maint-btn-solid btn btn-lg rounded-pill" style={{ backgroundColor: '#fff', color: '#06cabc', fontWeight: 600, padding: '12px 32px' }}>Get Maintenance Support</Link>
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

export default Maintenance;