import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      id: 1,
      name: "Abdul Malik Mohammad",
      position: "Client",
      rating: 5,
      text: "Great experience with pixelmindsolutions for our website project. Their team is one of the reliable choices for web development in Kukatpally with quality service and good communication.",
    },
    {
      id: 2,
      name: "Service Provider",
      position: "Client",
      rating: 5,
      text: "Very satisfied with their digital marketing services in Kukatpally. Their team understands online growth strategies and helped improve our brand visibility with effective campaigns.",
    },
    {
      id: 3,
      name: "Raju Kumar",
      position: "Client",
      rating: 5,
      text: "Excellent experience with their app development services in Kukatpally. The team is creative, professional, and focused on delivering a user-friendly application as per requirements.",
    },
    {
      id: 4,
      name: "Mehrun Nisa",
      position: "Client",
      rating: 5,
      text: "Really happy with the service and support provided by this team. They are a professional software company in Kukatpally offering reliable solutions for website and application requirements. Great experience overall.",
    },
    {
      id: 5,
      name: "Md Faizur Rahman",
      position: "Client",
      rating: 5,
      text: "Great experience with pixelmindsolutions. The team provides excellent software solutions with professional support and a clear understanding of customer requirements.",
    },
    {
      id: 6,
      name: "Waheda Begum",
      position: "Client",
      rating: 5,
      text: "Great experience with their team! They provide quality web development services in Kukatpally with modern designs and smooth functionality. The entire process was easy and well managed.",
    },
    {
      id: 7,
      name: "Abdul Pasha",
      position: "Client",
      rating: 5,
      text: "A good choice for businesses looking for application development at low cost in Kukatpally. They provide professional solutions, understand requirements clearly, and deliver quality results.",
    },
    {
      id: 8,
      name: "Arigala Rakesh",
      position: "Client",
      rating: 5,
      text: "Very impressed with their work and dedication. Their application development services in Kukatpally are well planned, affordable, and delivered with excellent customer support. Highly recommended!",
    },
    {
      id: 9,
      name: "Sailaja Reddy Chennu",
      position: "Client",
      rating: 5,
      text: "Great experience working with this team! They provide professional technology solutions with a strong focus on quality. A reliable software company in Kukatpally for businesses looking for modern digital solutions.",
    },
    {
      id: 11,
      name: "Salauddin Mahammad",
      position: "Client",
      rating: 5,
      text: "Very happy with the service from Pixelmind Solutions. They designed a clean and responsive website for my business. The team was friendly and always available to help. Highly recommended.",
    },
    {
      id: 14,
      name: "RASHEDIN",
      position: "Client",
      rating: 5,
      text: "Highly professional team. One of the best software company in Kukatpally for website and application development. They delivered my project on time with great support. Recommended for anyone looking for best app development services in Kukatpally.",
    },
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="py-5 py-lg-6 bg-light position-relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-4 mb-lg-5">
          <h5 className="text-uppercase textcolor fw-semibold mb-2">
            <img
              className="me-2"
              src="/assets/images/icon/section-title.png"
              alt="icon"
            />
            TESTIMONIALS
          </h5>
          <h2 className="display-6 fw-bold">
            Trusted by Businesses in Kukatpally
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="testimonials-slider-wrapper mx-n2 mx-sm-n3">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2 px-sm-3">
                <div className="card h-100 border-0 shadow-sm position-relative testimonial-card">
                  <div className="card-body p-3 p-sm-4 d-flex flex-column">
                    {/* Rating Stars */}
                    <div className="mb-3">
                      <span className="text-warning fs-4" style={{ letterSpacing: "2px" }}>
                        {renderStars(testimonial.rating)}
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-secondary fst-italic mb-3 flex-grow-1" style={{ fontSize: "0.95rem", lineHeight: "1.7" }}>
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="d-flex align-items-center pt-3 border-top">
                      <div className="rounded-circle bgcolor d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-bold text-uppercase"
                        style={{ width: "48px", height: "48px", fontSize: "18px" }}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ms-3">
                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                        <span className="textcolor small fw-medium">{testimonial.position}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Custom Styles for Slick Slider */}
      <style jsx>{`

            .textcolor {
              color: #06cabc;
            }

            .bgcolor {
              background-color: #06cabc;
            }
                /* Testimonial Card Hover Effect */
                .testimonial-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-color: rgba(0,0,0,0.04) !important;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.08) !important;
                }

                .testimonial-card::before {
                    content: '"';
                    position: absolute;
                    top: 15px;
                    right: 25px;
                    font-size: 72px;
                    color: var(--bs-primary, #0d6efd);
                    opacity: 0.08;
                    font-family: Georgia, serif;
                    line-height: 1;
                }

                /* Slick Custom Styles */
                .testimonials-slider-wrapper :global(.slick-dots) {
                    bottom: -50px;
                    display: flex !important;
                    justify-content: center;
                    gap: 8px;
                }

                .testimonials-slider-wrapper :global(.slick-dots li) {
                    width: auto;
                    height: auto;
                    margin: 0;
                }

                .testimonials-slider-wrapper :global(.slick-dots li button) {
                    width: 12px;
                    height: 12px;
                    padding: 0;
                    border-radius: 50%;
                    background: rgba(13, 110, 253, 0.25);
                    transition: all 0.3s ease;
                }

                .testimonials-slider-wrapper :global(.slick-dots li button::before) {
                    display: none;
                }

                .testimonials-slider-wrapper :global(.slick-dots li.slick-active button) {
                    background: var(--bs-primary, #0d6efd);
                    width: 36px;
                    border-radius: 6px;
                }

                .testimonials-slider-wrapper :global(.slick-prev),
                .testimonials-slider-wrapper :global(.slick-next) {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #fff;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    z-index: 2;
                    transition: all 0.3s ease;
                }

                .testimonials-slider-wrapper :global(.slick-prev:hover),
                .testimonials-slider-wrapper :global(.slick-next:hover) {
                    background: var(--bs-primary, #0d6efd);
                }

                .testimonials-slider-wrapper :global(.slick-prev:hover::before),
                .testimonials-slider-wrapper :global(.slick-next:hover::before) {
                    color: #fff;
                }

                .testimonials-slider-wrapper :global(.slick-prev::before),
                .testimonials-slider-wrapper :global(.slick-next::before) {
                    font-family: "Font Awesome 6 Free";
                    font-weight: 900;
                    font-size: 16px;
                    color: var(--bs-dark, #212529);
                    opacity: 1;
                }

                .testimonials-slider-wrapper :global(.slick-prev::before) {
                    content: "\\f104";
                }

                .testimonials-slider-wrapper :global(.slick-next::before) {
                    content: "\\f105";
                }

                .testimonials-slider-wrapper :global(.slick-prev) {
                    left: -60px;
                }

                .testimonials-slider-wrapper :global(.slick-next) {
                    right: -60px;
                }

                /* Dark Theme Support */
                :root[data-theme="dark"] .testimonial-card {
                    background: var(--bs-dark, #212529);
                    border-color: rgba(255,255,255,0.06) !important;
                }

                :root[data-theme="dark"] .testimonial-card .text-secondary {
                    color: rgba(255,255,255,0.8) !important;
                }

                :root[data-theme="dark"] .testimonial-card .text-dark {
                    color: #fff !important;
                }

                :root[data-theme="dark"] .testimonials-slider-wrapper :global(.slick-prev),
                :root[data-theme="dark"] .testimonials-slider-wrapper :global(.slick-next) {
                    background: var(--bs-dark, #212529);
                }

                :root[data-theme="dark"] .testimonials-slider-wrapper :global(.slick-prev::before),
                :root[data-theme="dark"] .testimonials-slider-wrapper :global(.slick-next::before) {
                    color: #fff;
                }

                /* Responsive Adjustments */
                @media (max-width: 1199px) {
                    .testimonials-slider-wrapper :global(.slick-prev) {
                        left: -40px;
                    }
                    .testimonials-slider-wrapper :global(.slick-next) {
                        right: -40px;
                    }
                }

                @media (max-width: 991px) {
                    .testimonials-slider-wrapper :global(.slick-prev) {
                        left: -30px;
                    }
                    .testimonials-slider-wrapper :global(.slick-next) {
                        right: -30px;
                    }
                    .testimonials-slider-wrapper :global(.slick-prev),
                    .testimonials-slider-wrapper :global(.slick-next) {
                        width: 38px;
                        height: 38px;
                    }
                }

                @media (max-width: 767px) {
                    .testimonials-slider-wrapper :global(.slick-prev) {
                        left: 10px;
                    }
                    .testimonials-slider-wrapper :global(.slick-next) {
                        right: 10px;
                    }
                    .testimonials-slider-wrapper :global(.slick-prev),
                    .testimonials-slider-wrapper :global(.slick-next) {
                        width: 34px;
                        height: 34px;
                    }
                    .testimonials-slider-wrapper :global(.slick-prev::before),
                    .testimonials-slider-wrapper :global(.slick-next::before) {
                        font-size: 14px;
                    }
                    .testimonials-slider-wrapper :global(.slick-dots) {
                        bottom: -40px;
                    }
                    .testimonials-slider-wrapper :global(.slick-dots li button) {
                        width: 10px;
                        height: 10px;
                    }
                    .testimonials-slider-wrapper :global(.slick-dots li.slick-active button) {
                        width: 30px;
                    }
                    .testimonial-card::before {
                        font-size: 48px;
                        top: 10px;
                        right: 18px;
                    }
                }

                @media (max-width: 575px) {
                    .testimonial-card .rounded-circle {
                        width: 40px !important;
                        height: 40px !important;
                        font-size: 15px !important;
                    }
                }
            `}</style>
    </section>
  );
};

export default Testimonials;