import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div>
      <footer className="footer-area secondary-bg">
        <div
          className="footer__shape-regular-left wow slideInLeft"
          data-wow-delay="00ms"
          data-wow-duration="1500ms"
        >
          <img alt="shape" src="/assets/images/shape/footer-regular-left.png" />
        </div>
        <div
          className="footer__shape-solid-left wow slideInLeft"
          data-wow-delay="200ms"
          data-wow-duration="1500ms"
        >
          <img
            className="sway_Y__animation"
            alt="shape"
            src="/assets/images/shape/footer-solid-left.png"
          />
        </div>
        <div
          className="footer__shape-solid-right wow slideInRight"
          data-wow-delay="00ms"
          data-wow-duration="1500ms"
        >
          <img
            className="sway_Y__animation"
            alt="shape"
            src="/assets/images/shape/footer-regular-right.png"
          />
        </div>
        <div
          className="footer__shape-regular-right wow slideInRight"
          data-wow-delay="200ms"
          data-wow-duration="1500ms"

        >
          <img alt="shape" src="/assets/images/shape/footer-solid-right.png" />
        </div>
        <div className="footer__shadow-shape">
          <img alt="shodow" src="/assets/images/shape/footer-shadow-shape.png" />
        </div>
        <div className="container">
          <div className="footer__wrp pt-60 pb-60">
            <div
              className="footer__item item-big wow fadeInUp"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <a className="logo1  mb-30" href="/" data-discover="true">
                <img src="/assets/images/logo/logo1.png" alt="logo" />

                {/* <img
            alt="icon"
            src="/assets/images/icon/counter-icon3.png"
            style={{ width: 50 }}
          />
          <h2 className="text-white">pixelmind</h2> */}
              </a>
              <p>
                Pixelmind solutions to seamless support, we ensure your technology
                works for you, every step of the way.
              </p>
              <div className="social-icon">
                <a target='blank' href="https://www.facebook.com/share/1E6gPK4vhm/" >
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a target='blank' href="https://www.instagram.com/pixelmindsolutions?igsh=ZmQ1c2c0b2twdTd1">
                  <i className="fa-brands fa-instagram" />
                </a>
                <a target="_blank" href="https://x.com/PIXELMINDS41249">
                  <i className="fa-brands fa-twitter" />
                </a>
                <a target='blank' href="https://www.linkedin.com/company/pixelmindsolutions-pvt-ltd/">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <a href="https://www.youtube.com/@PixelmindsolutionsPvtLtd1" target="_blank">
                  <i className="fa-brands fa-youtube" />
                </a>
              </div>
            </div>
            <div
              className="footer__item item-sm wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <h3 className="footer-title">Quick Link</h3>
              <ul>
                <li>
                  <a href="/" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> Home
                  </a>
                </li>
                <li>
                  <a href="/about" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> About
                  </a>
                </li>
                <li>
                  <a href="/services" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> Our Services
                  </a>
                </li>
                <li>
                  <a href="/contact" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> Contact
                  </a>
                </li>
                <li>
                  <a href="/blog" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> Blogs
                  </a>
                </li>
                <li>
                  <a href="/portfolio" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> Our Portfolio
                  </a>
                </li>
                <li>
                  <a href="/careers" data-discover="true">
                    <i className="fa-regular fa-angles-right me-1" /> Careers Page
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="footer__item item-big wow fadeInUp"
              data-wow-delay="600ms"
              data-wow-duration="1500ms"
            >
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                <li>
                  <i className="fa-regular fa-clock" />
                  <div className="info">
                    <h5>Opening Hours:</h5>
                    <p>9:00 AM to 7:00 PM</p>
                  </div>
                </li>
                <li>
                  <i className="fa-regular fa-envelopes" />
                  <div className="info">
                    <h5>Email:</h5>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@pixelmindsolutions.com" target="_blank">
                      info@pixelmindsolutions.com
                    </a>
                  </div>
                </li>
                <li>
                  <i className="fa-duotone fa-phone" />
                  <div className="info">
                    <h5>Phone Call:</h5>
                    <a href='tel: +91 9666317749'> +91 9666317749</a>,<a href="tel: +91 9052097475" className="ms-1">+91 9052097475</a>
                  </div>
                </li>
                {/* <li>
                  <i className="fa-brands fa-youtube" />
                  <div className="info">
                    <h5>Youtube:</h5>
                    <a href="https://www.youtube.com/@PixelmindsolutionsPvtLtd1" target="_blank">Pixelmindsolutions Channel</a>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          <div className="container">
            <div className="d-flex gap-1 flex-wrap align-items-center justify-content-md-between justify-content-center">
              <p
                className="wow fadeInDown"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                © All Copyright 2025 by <a href="#">Pixelmind Solutions Pvt Ltd</a>
              </p>
              <ul
                className="d-flex align-items-center gap-4 wow fadeInDown"
                data-wow-delay="200ms"
                data-wow-duration="1500ms"
              />
            </div>
          </div>
        </div>
      </footer>

      <div className="scroll-up">
        <svg
          className="scroll-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
    </div>
  )
}

export default Footer