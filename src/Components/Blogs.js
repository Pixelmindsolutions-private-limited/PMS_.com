import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

function Blog() {
  const blogPosts = [
    {
      id: 1,
      slug: "empowering-businesses-through-it-services",
      title: "PIXELMINDSOLUTIONS: Empowering Businesses Through Innovative IT Services",
      image: "/assets/images/blog/blog-image1.jpg",
      date: "2024-07-01",
      author: "Admin",
      comments: 0
    },
    {
      id: 2,
      slug: "professional-it-consulting-and-app-development",
      title: "PIXELMINDSOLUTIONS: Driving Innovation Through Smart IT Services",
      image: "/assets/images/blog/blog-image2.jpg",
      date: "2024-07-02",
      author: "Admin",
      comments: 0
    },
    {
      id: 3,
      slug: "application-maintainence-and-digital-growth-strategy",
      title: "How PIXELMINDSOLUTIONS is Shaping the Future of Digital Transformation",
      image: "/assets/images/blog/blog-image3.jpg",
      date: "2024-07-03",
      author: "Admin",
      comments: 0
    },
    {
      id: 4,
      slug: "digital-marketing-services-india",
      title: "Digital Marketing: The Smartest Investment for Business Growth in India",
      image: "/assets/images/blog/digital-marketing-blog.jpg",
      date: "2024-07-05",
      author: "Admin",
      comments: 0
    },
    {
      id: 5,
      slug: "app-development-services-india",
      title: "App Development: Transform Your Business with Powerful Mobile Applications",
      image: "/assets/images/blog/app-development-blog.jpg",
      date: "2024-07-06",
      author: "Admin",
      comments: 0
    },
    {
      id: 6,
      slug: "website-development-services-india",
      title: "Website Development: Build a Powerful Online Presence for Your Business",
      image: "/assets/images/blog/website-development-blog.jpg",
      date: "2024-07-07",
      author: "Admin",
      comments: 0
    }
  ];

  const getDateParts = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'short' });
    return { day, month };
  };

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
              {blogPosts.map((post, index) => {
                const { day, month } = getDateParts(post.date);
                return (
                  <div 
                    key={post.id}
                    className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" 
                    data-wow-delay={`${index * 200}ms`} 
                    data-wow-duration="1500ms"
                  >
                    <div className="blog__item">
                      <Link to={`/blog/${post.slug}`} className="blog__image d-block image">
                        <img src={post.image} alt={post.title} />
                        <div className="blog-tag">
                          <h3 className="text-white">{day}</h3>
                          <span className="text-white">{month}</span>
                        </div>
                      </Link>
                      <div className="blog__content">
                        <ul className="blog-info pb-20 bor-bottom mb-20">
                          <li><a href="#0">By {post.author}</a></li>
                          <li><a href="#0">{post.comments} Comments</a></li>
                        </ul>
                        <h3>
                          <Link to={`/blog/${post.slug}`} className="primary-hover">
                            {post.title}
                          </Link>
                        </h3>
                        <Link className="mt-25 read-more-btn" to={`/blog/${post.slug}`}>
                          Read More <i className="fa-regular fa-arrow-right-long" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Blog;