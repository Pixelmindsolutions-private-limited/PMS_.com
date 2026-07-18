// Webdevelopment.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Webdevelopment() {
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
    { icon: 'fa-solid fa-puzzle-piece', title: 'Customized Web Solutions', desc: 'We create websites that are designed according to your unique business needs and goals.' },
    { icon: 'fa-solid fa-laptop', title: 'Modern & Responsive Design', desc: 'Our websites deliver smooth experiences across desktops, tablets, and mobile devices.' },
    { icon: 'fa-solid fa-gauge-high', title: 'Performance-Driven Development', desc: 'We focus on speed, security, and reliability to ensure better user satisfaction.' },
    { icon: 'fa-solid fa-headset', title: 'Complete Support & Maintenance', desc: 'From planning to launch and beyond, we provide continuous assistance for your digital growth.' },
  ];

  const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and requirements' },
    { step: '02', title: 'Planning', desc: 'Creating sitemaps, wireframes, and technical architecture' },
    { step: '03', title: 'Design', desc: 'Crafting modern UI/UX designs that engage users' },
    { step: '04', title: 'Development', desc: 'Building with latest technologies and best practices' },
    { step: '05', title: 'Testing', desc: 'Rigorous quality assurance and performance testing' },
    { step: '06', title: 'Launch', desc: 'Deploying your website and ongoing support' },
  ];

  const testimonials = [
    { name: 'Alisha Perween', text: 'A trusted IT company in Kukatpally with a skilled team and great technical knowledge. They delivered a smooth solution and provided excellent customer support throughout the project.' },
    { name: 'Sai Kotte', text: 'One of the most dependable teams for website development in Kukatpally. They created a professional website that matched our expectations and provided smooth service throughout the process.' },
    { name: 'Kadupudi Nimisha', text: 'Had a wonderful experience with their digital marketing service at low cost in Kukatpally. The team understands business goals, provides creative solutions, and maintains good communication.' },
  ];

  return (
    <div>
      <style>{`
        .pms-webdev-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          padding: clamp(70px, 14vw, 130px) 0;
        }
        .pms-webdev-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,15,30,0.82) 0%, rgba(6,202,188,0.55) 100%);
        }
        .pms-webdev-hero .container { position: relative; z-index: 2; }
        .pms-webdev-hero h1 { font-size: clamp(1.9rem, 5vw, 3.2rem); line-height: 1.2; }
        .pms-webdev-btn-solid, .pms-webdev-btn-outline {
          display: inline-block;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .pms-webdev-btn-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(6,202,188,0.35);
          color: #fff;
        }
        .pms-webdev-btn-outline:hover {
          background-color: #06cabc !important;
          color: #fff !important;
          transform: translateY(-3px);
        }
        .pms-webdev-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          height: 100%;
        }
        .pms-webdev-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(15,23,42,0.10);
          border-color: rgba(6,202,188,0.35) !important;
        }
        .pms-webdev-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6,202,188,0.10);
          margin: 0 auto 18px;
        }
        .pms-webdev-process-wrap { position: relative; }
        .pms-webdev-process-line {
          position: absolute;
          top: 35px;
          left: 8.33%;
          right: 8.33%;
          height: 2px;
          background: repeating-linear-gradient(90deg, #06cabc 0, #06cabc 8px, transparent 8px, transparent 16px);
          z-index: 0;
        }
        .pms-webdev-process-circle {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .pms-webdev-step:hover .pms-webdev-process-circle {
          transform: scale(1.1);
          box-shadow: 0 8px 18px rgba(6,202,188,0.4);
        }
        .pms-webdev-testimonial:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(15,23,42,0.10);
        }
        .pms-webdev-avatar {
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
          .pms-webdev-process-line { display: none; }
        }
      `}</style>

      <Header />
      <main>

        {/* Hero Section */}
        <section className="pms-webdev-hero" style={{ backgroundImage: `url(${'/assets/images/banner/banner-inner-page.jpg'})` }}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-9 mx-auto text-center">
                <h1 className="wow fadeInUp fw-bold text-white mb-3">
                  <Highlight>Best Web Development Company in Kukatpally, Hyderabad</Highlight>
                </h1>
                <p className="wow fadeInUp fs-5 text-white-50 mb-4">Building Powerful Websites That Help Businesses Grow</p>
                <div className="wow fadeInUp d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/contact" className="pms-webdev-btn-solid btn btn-lg rounded-pill" style={{ backgroundColor: '#06cabc', color: '#fff', fontWeight: 600, padding: '12px 32px' }}>
                    Get Free Consultation
                  </Link>
                  <Link to="/contact" className="pms-webdev-btn-outline btn btn-lg rounded-pill" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 600, padding: '12px 32px' }}>
                    Request a Quote
                  </Link>
                </div>
                <div className="wow fadeInUp mt-4 d-flex justify-content-center align-items-center gap-2" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
                  <Link to="/" className="text-white text-decoration-none">Home</Link>
                  <i className="fa-regular fa-angles-right" />
                  <span>Web Development</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-12 col-lg-6">
                <h2 style={styles.heading}>Professional <Highlight>Website Development Services in Kukatpally</Highlight>, Hyderabad</h2>
                <p style={styles.paragraph}>A website is more than just an online presence — it is the foundation of your digital identity. At <Highlight>PixelMind Solutions</Highlight>, we create modern, responsive, and high-performing websites that help businesses connect with their customers and achieve their goals.</p>
                <p style={styles.paragraph}>Our team focuses on creating websites that combine attractive design, smooth functionality, and strong performance. We understand your business requirements and develop digital solutions that are tailored to your brand, audience, and growth objectives.</p>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>From business websites and eCommerce platforms to custom web applications, we build solutions using the latest technologies and industry practices. Every project is carefully planned, developed, and optimized to provide a seamless experience across all devices.</p>
              </div>
              <div className="col-12 col-lg-6">
                <img src="/assets/images/service/service-image6.jpg" alt="Web Development" className="img-fluid rounded-4 shadow w-100" style={{ objectFit: 'cover', maxHeight: '460px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-5" style={{ backgroundColor: '#f5f7fa', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 col-lg-8 mx-auto text-center">
                <h2 style={styles.heading}>Why Choose <Highlight>PixelMind Solutions</Highlight>?</h2>
                <p style={styles.paragraph}>We combine creativity, technology, and industry experience to build websites that create real value for businesses.</p>
              </div>
            </div>
            <div className="row g-4">
              {features.map((item, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-lg-3">
                  <div style={styles.card} className="pms-webdev-card text-center">
                    <div className="pms-webdev-icon-wrap">
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

        {/* Web Development Process Diagram */}
        <section className="py-5" style={{ backgroundColor: '#fff', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 col-lg-8 mx-auto text-center">
                <h2 style={styles.heading}>Our Web <Highlight>Development Process</Highlight></h2>
                <p style={styles.paragraph}>A structured approach to build powerful websites that drive business growth</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="pms-webdev-process-wrap p-4 p-md-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '20px' }}>
                  <div className="pms-webdev-process-line d-none d-lg-block" />
                  <div className="row g-4 g-lg-0">
                    {process.map((item, idx) => (
                      <div key={idx} className="col-6 col-md-4 col-lg-2">
                        <div className="pms-webdev-step text-center">
                          <div className="pms-webdev-process-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px', backgroundColor: '#06cabc', borderRadius: '50%', color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
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

        {/* Transform Your Online Presence */}
        <section className="py-5" style={{ backgroundColor: '#f0fdfb', paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-8 mx-auto text-center">
                <h2 style={styles.heading}>Transform Your <Highlight>Online Presence</Highlight> With Us</h2>
                <p style={styles.paragraph}>At PixelMind Solutions, we combine creativity and technology to build websites that represent your brand, engage your audience, and support your business growth.</p>
                <div className="row g-3 mt-3">
                  {[
                    { icon: 'fa-solid fa-paintbrush', label: 'Creativity' },
                    { icon: 'fa-solid fa-code', label: 'Technology' },
                    { icon: 'fa-solid fa-chart-line', label: 'Growth' },
                  ].map((s, i) => (
                    <div className="col-4" key={i}>
                      <div className="p-3 p-md-4 bg-white rounded-3 shadow-sm h-100">
                        <i className={`${s.icon} fs-2`} style={{ color: '#06cabc' }}></i>
                        <h6 className="mt-2 mb-0">{s.label}</h6>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div style={styles.testimonialCard} className="pms-webdev-testimonial">
                    <i className="fa-solid fa-quote-left fs-3 mb-3" style={{ color: '#06cabc', opacity: 0.3 }} />
                    <p style={{ ...styles.paragraph, flexGrow: 1 }}>"{t.text}"</p>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <div className="pms-webdev-avatar">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
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
                  Ready to Build Your{' '}
                  <span style={{ backgroundColor: '#fff', color: '#06cabc', padding: '0 12px', borderRadius: '8px', display: 'inline-block' }}>Website</span>?
                </h2>
                <p style={{ ...styles.paragraph, color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto 30px' }}>Let's create a powerful online presence for your business. Contact PixelMind Solutions today for professional web development services in Kukatpally, Hyderabad.</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/contact" className="pms-webdev-btn-solid btn btn-lg rounded-pill" style={{ backgroundColor: '#fff', color: '#06cabc', fontWeight: 600, padding: '12px 32px' }}>Contact Us Today</Link>
                  <Link to="/portfolio" className="pms-webdev-btn-outline btn btn-lg rounded-pill" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 600, padding: '12px 32px' }}>View Portfolio</Link>
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

export default Webdevelopment;