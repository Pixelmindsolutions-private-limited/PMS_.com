import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

function Blog() {

  console.log("Blog Page Loaded");
  return (
    <>
      <div>
        <Helmet>
          <title>
            Blog | Web Development, Mobile Apps & Digital Marketing Insights | PixelmindSolutions
          </title>
          <meta name="description" content="Read the latest blogs from PixelmindSolutions on web development, mobile app development, UI/UX design, digital marketing, software development, cloud technologies, and business growth strategies."/>
          <meta name="keywords" content="PixelmindSolutions blog, web development blog, software development blog, mobile app development blog, digital marketing blog, UI UX design blog, IT company blog Hyderabad, technology articles, website development tips, app development insights, SEO blog, software company Hyderabad, business technology blog"/>
          <link rel="canonical" href="https://www.pixelmindsolutions.com/blog" />
        </Helmet>
        <Header />
        <section className="blog-area pt-120 pb-120">
          <div className="container">
            <div className="section-header text-center mb-60">
              <h5 className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                <img className="me-1" src="/assets/images/icon/section-title.png" alt="icon" />
                Blog & News
              </h5>
              <h2 className="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                Explore Blogs and News
              </h2>
            </div>
            <div className="row g-4">

              {/* Blog Card 1 */}
              <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                <div className="blog__item">
                  <Link to="/blog/empowering-businesses-through-it-services" className="blog__image d-block image">
                    <img src="/assets/images/blog/blog-image1.jpg" alt="blog preview" />
                    <div className="blog-tag">
                      <h3 className="text-white">01</h3>
                      <span className="text-white">Jul</span>
                    </div>
                  </Link>
                  <div className="blog__content">
                    <ul className="blog-info pb-20 bor-bottom mb-20">
                      <li><a href="#0">By Admin</a></li>
                      <li><a href="#0">0 Comments</a></li>
                    </ul>
                    <h3>
                      <Link to="/blog/empowering-businesses-through-it-services" className="primary-hover">
                        PIXELMINDSOLUTIONS: Empowering Businesses Through Innovative IT Services
                      </Link>
                    </h3>
                    <Link className="mt-25 read-more-btn" to="/blog/empowering-businesses-through-it-services">
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Card 2 */}
              <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="blog__item">
                  <Link to="/blog/professional-it-consulting-and-app-development" className="blog__image d-block image">
                    <img src="/assets/images/blog/blog-image2.jpg" alt="blog preview" />
                    <div className="blog-tag">
                      <h3 className="text-white">02</h3>
                      <span className="text-white">Jul</span>
                    </div>
                  </Link>
                  <div className="blog__content">
                    <ul className="blog-info pb-20 bor-bottom mb-20">
                      <li><a href="#0">By Admin</a></li>
                      <li><a href="#0">0 Comments</a></li>
                    </ul>
                    <h3>
                      <Link to="/blog/professional-it-consulting-and-app-development" className="primary-hover">
                        PIXELMINDSOLUTIONS: Driving Innovation Through Smart IT Services
                      </Link>
                    </h3>
                    <Link className="mt-25 read-more-btn" to="/blog/professional-it-consulting-and-app-development">
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Card 3 */}
              <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                <div className="blog__item">
                  <Link to="/blog/application-maintainence-and-digital-growth-strategy" className="blog__image d-block image">
                    <img src="/assets/images/blog/blog-image3.jpg" alt="blog preview" />
                    <div className="blog-tag">
                      <h3 className="text-white">03</h3>
                      <span className="text-white">Jul</span>
                    </div>
                  </Link>
                  <div className="blog__content">
                    <ul className="blog-info pb-20 bor-bottom mb-20">
                      <li><a href="#0">By Admin</a></li>
                      <li><a href="#0">0 Comments</a></li>
                    </ul>
                    <h3>
                      <Link to="/blog/application-maintainence-and-digital-growth-strategy" className="primary-hover">
                        How PIXELMINDSOLUTIONS is Shaping the Future of Digital Transformation
                      </Link>
                    </h3>
                    <Link className="mt-25 read-more-btn" to="/blog/application-maintainence-and-digital-growth-strategy">
                      Read More <i className="fa-regular fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Blog;
