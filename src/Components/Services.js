import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

function Services() {
  return (
    <div>
      <Helmet>
        <title>Our Services | Top IT, Web, App, and Digital Marketing Solutions in Hyderabad</title>
        <meta name="description" content="Explore our range of IT services including web development, app design, UI/UX, and digital marketing tailored for your business growth." />
        <meta name="keywords" content="web development company, website development company, website developers in hyderabad, best web design company in hyderabad, mobile app development company hyderabad, app development companies in hyderabad, android development companies in hyderabad, application development services, flutter app development, best app developers, web app development, best app development companies, app development agency, app making company, app development companies near me, top 10 mobile app development companies, healthcare app development, rapid application development, react native app development, ui ux design companies in hyderabad, ui ux companies in hyderabad, best ui ux design companies in hyderabad, ui ux designing services in hyderabad, ui ux design services near me, digital marketing services in hyderabad, digital marketing agency hyderabad, digital marketing companies in hyderabad, best digital marketing agency hyderabad, top digital marketing companies in hyderabad, best digital marketing agency in hyderabad, real estate digital marketing agency in hyderabad, social media marketing companies in hyderabad, advertising agency hyderabad, best digital marketing agency in hyd, digital marketing agency in kukatpally" />
      </Helmet>
      <Header />
      <main>
        {/* Page banner area start here */}
        <section
          className="banner__inner-page bg-image pt-100 pb-100 bg-image"
          // data-background="/assets/images/banner/banner-inner-page.jpg"
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


              <div className="col-lg-4 col-md-6">
                <div className="service-two__item">
                  <div className="image">
                    <img src="/assets/images/service/service-image3.jpg" alt="image" />
                  </div>
                  <div className="service-two__content">
                    <div className="icon">
                      <img src="/assets/images/icon/service-two-icon3.png" alt="icon" />
                    </div>
                    <div className="shape">
                      <img
                        src="/assets/images/shape/service-two-item-shape.png"
                        alt="shape"
                      />
                    </div>
                    <h4>
                      <Link to="/appdevelopment" className="primary-hover">
                        App Development
                      </Link>
                    </h4>
                    <p>
                      Whether you're looking to build an app from the ground up or enhance an existing one, our team of skilled...
                    </p>
                    <Link className="read-more-btn" to="/appdevelopment">
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-6">
        <div className="service-two__item">
          <div className="image">
            <img src="/assets/images/service/service-image4.jpg" alt="image" />
          </div>
          <div className="service-two__content">
            <div className="icon">
              <img src="/assets/images/icon/service-two-icon4.png" alt="icon" />
            </div>
            <div className="shape">
              <img
                src="/assets/images/shape/service-two-item-shape.png"
                alt="shape"
              />
            </div>
            <h4>
              <a href="service-details.html" className="primary-hover">
                Cyber Security
              </a>
            </h4>
            <p>
              Pellentesque nec the condimentum nec lorem nulla augue est
              ultricies ac iaculis.
            </p>
            <a className="read-more-btn" href="service-details.html">
              Read More <i className="fa-regular fa-arrow-right-long" />
            </a>
          </div>
        </div>
      </div> */}
              <div className="col-lg-4 col-md-6">
                <div className="service-two__item">
                  <div className="image">
                    <img src="/assets/images/service/service-image5.jpg" alt="image" />
                  </div>
                  <div className="service-two__content">
                    <div className="icon">
                      <img src="/assets/images/icon/service-two-icon5.png" alt="icon" />
                    </div>
                    <div className="shape">
                      <img
                        src="/assets/images/shape/service-two-item-shape.png"
                        alt="shape"
                      />
                    </div>
                    <h4>
                      <Link to="/uiuxdesign" className="primary-hover">
                        UI/UX Design
                      </Link>
                    </h4>
                    <p>
                      Our UI/UX design services are focused on creating visually appealing, user-centric designs...
                    </p>
                    <Link to="/uiuxdesign" className="read-more-btn" >
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-two__item">
                  <div className="image">
                    <img src="/assets/images/service/service-image6.jpg" alt="image" />
                  </div>
                  <div className="service-two__content">
                    <div className="icon">
                      <img src="/assets/images/icon/service-two-icon6.png" alt="icon" />
                    </div>
                    <div className="shape">
                      <img
                        src="/assets/images/shape/service-two-item-shape.png"
                        alt="shape"
                      />
                    </div>
                    <h4>
                      <Link to="/webdevelopment" className="primary-hover">
                        Web Development
                      </Link>
                    </h4>
                    <p>
                      Our web development process is centered around understanding your unique business...
                    </p>
                    <Link className="read-more-btn" to="/webdevelopment">
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-two__item">
                  <div className="image">
                    <img src="/assets/images/service/service-image2.jpg" alt="image" />
                  </div>
                  <div className="service-two__content">
                    <div className="icon">
                      <img src="/assets/images/icon/service-two-icon2.png" alt="icon" />
                    </div>
                    <div className="shape">
                      <img
                        src="/assets/images/shape/service-two-item-shape.png"
                        alt="shape"
                      />
                    </div>
                    <h4>
                      <Link to="/digitalmarketing" className="primary-hover">
                        Digital Marketing
                      </Link>
                    </h4>
                    <p>
                      Our expert team employs a data-driven approach, using the latest tools and techniques...
                    </p>
                    <Link className="read-more-btn" to="/digitalmarketing">
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />

    </div>
  )
}

export default Services