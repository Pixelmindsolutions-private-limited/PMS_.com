import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

function Services() {
  const services = [
    {
      image: '/assets/images/service/service-image3.jpg',
      icon: '/assets/images/icon/service-two-icon3.png',
      title: 'App Development',
      desc: "Whether you're looking to build an app from the ground up or enhance an existing one, our team of skilled...",
      link: '/appdevelopment',
    },
    {
      image: '/assets/images/service/service-image5.jpg',
      icon: '/assets/images/icon/service-two-icon5.png',
      title: 'UI/UX Design',
      desc: 'Our UI/UX design services are focused on creating visually appealing, user-centric designs...',
      link: '/uiuxdesign',
    },
    {
      image: '/assets/images/service/service-image6.jpg',
      icon: '/assets/images/icon/service-two-icon6.png',
      title: 'Web Development',
      desc: 'Our web development process is centered around understanding your unique business...',
      link: '/webdevelopment',
    },
    {
      image: '/assets/images/service/service-image2.jpg',
      icon: '/assets/images/icon/service-two-icon2.png',
      title: 'Digital Marketing',
      desc: 'Our expert team employs a data-driven approach, using the latest tools and techniques...',
      link: '/digitalmarketing',
    },
    {
      image: '/assets/images/service/service-image1.jpg',
      icon: '/assets/images/icon/service-two-icon1.png',
      title: 'ERP Solutions',
      desc: 'We design and implement custom ERP systems that unify inventory, finance, HR, and sales into a single platform...',
      link: '/erp-development',
    },
    {
      image: '/assets/images/service/service-image4.jpg',
      icon: '/assets/images/icon/service-two-icon4.png',
      title: 'App/Website Maintenance',
      desc: 'Keep your apps and websites fast, secure, and up to date with proactive monitoring, updates, and support...',
      link: '/maintenance',
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Our Services | Top IT, Web, App, ERP, and Digital Marketing Solutions in Hyderabad</title>
        <meta name="description" content="Explore our range of IT services including web development, app design, UI/UX, ERP solutions, app/website maintenance, and digital marketing tailored for your business growth." />
        <meta name="keywords" content="web development company, website development company, website developers in hyderabad, best web design company in hyderabad, mobile app development company hyderabad, app development companies in hyderabad, android development companies in hyderabad, application development services, flutter app development, best app developers, web app development, best app development companies, app development agency, app making company, app development companies near me, top 10 mobile app development companies, healthcare app development, rapid application development, react native app development, ui ux design companies in hyderabad, ui ux companies in hyderabad, best ui ux design companies in hyderabad, ui ux designing services in hyderabad, ui ux design services near me, digital marketing services in hyderabad, digital marketing agency hyderabad, digital marketing companies in hyderabad, best digital marketing agency hyderabad, top digital marketing companies in hyderabad, best digital marketing agency in hyderabad, real estate digital marketing agency in hyderabad, social media marketing companies in hyderabad, advertising agency hyderabad, best digital marketing agency in hyd, digital marketing agency in kukatpally, erp software development hyderabad, erp implementation company hyderabad, custom erp solutions, website maintenance services hyderabad, app maintenance and support company" />
      </Helmet>
      <Header />
      <main>
        {/* Page banner area start here */}
        <section
          className="banner__inner-page bg-image pt-100 pb-100 bg-image"
          style={{
            backgroundImage: `url(${"/assets/images/banner/banner-inner-page.jpg"})`,
          }}
        >
          <div
            className="shape2 wow slideInLeft"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <img src="/assets/images/banner/inner-banner-shape2.png" alt="shape" />
          </div>
          <div
            className="shape1 wow slideInLeft"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <img src="/assets/images/banner/inner-banner-shape1.png" alt="shape" />
          </div>
          <div
            className="shape3 wow slideInRight"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <img
              className="sway__animationX"
              src="/assets/images/banner/inner-banner-shape3.png"
              alt="shape"
            />
          </div>
          <div className="container">
            <h2
              className="wow fadeInUp"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              Services
            </h2>
            <div
              className="breadcrumb-list wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <Link to="/">Home</Link>
              <span>
                <i className="fa-regular fa-angles-right mx-2" />
                Services
              </span>
            </div>
          </div>
        </section>
        <section className="service-inner-area pt-90 pb-90">
          <div className="container">
            <div className="row g-4">
              {services.map((service, idx) => (
                <div key={idx} className="col-lg-4 col-md-6">
                  <div className="service-two__item">
                    <div className="image">
                      <img src={service.image} alt={service.title} />
                    </div>
                    <div className="service-two__content">
                      <div className="icon">
                        <img src={service.icon} alt={`${service.title} icon`} />
                      </div>
                      <div className="shape">
                        <img
                          src="/assets/images/shape/service-two-item-shape.png"
                          alt="shape"
                        />
                      </div>
                      <h4>
                        <Link to={service.link} className="primary-hover">
                          {service.title}
                        </Link>
                      </h4>
                      <p>{service.desc}</p>
                      <Link className="read-more-btn" to={service.link}>
                        Read More <i className="fa-regular fa-arrow-right-long" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

    </div>
  )
}

export default Services