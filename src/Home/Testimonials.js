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
            name: "Rajesh K.",
            position: "Founder, TechStart India",
            rating: 5,
            text: "PixelMindSolutions transformed our vision into a robust platform. Their team's attention to detail and technical expertise is unmatched in Hyderabad.",
        },
        {
            id: 2,
            name: "Priya S.",
            position: "CTO, RetailMax",
            rating: 5,
            text: "We've worked with several agencies, but none matched the professionalism and speed of PixelMindSolutions. Highly recommend for any software project.",
        },
        {
            id: 3,
            name: "Anil M.",
            position: "Director, FinServe Solutions",
            rating: 5,
            text: "The mobile app they built for us has received incredible feedback from our customers. Great UX, rock-solid performance, and delivered ahead of schedule.",
        },
        {
            id: 4,
            name: "Sneha R.",
            position: "CEO, HealthCare Plus",
            rating: 5,
            text: "PixelMindSolutions delivered an exceptional healthcare management system. Their understanding of our industry needs was impressive and the execution was flawless.",
        },
        {
            id: 5,
            name: "Vikram P.",
            position: "Co-Founder, EduTech India",
            rating: 5,
            text: "The e-learning platform they developed has helped us scale our business 3x. Their innovative approach and commitment to quality sets them apart.",
        },
        {
            id: 6,
            name: "Meera D.",
            position: "Marketing Director, BrandBox",
            rating: 5,
            text: "Working with PixelMindSolutions was a game-changer for our digital presence. Their team is responsive, creative, and truly cares about delivering results.",
        },
    ];

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    return (
        <section className="testimonials-area pt-120 pb-120 sub-bg">
            <div className="container">
                {/* Section Header */}
                <div className="section-header text-center mb-60">
                    <h5
                        className="wow fadeInUp"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms"
                    >
                        <img
                            className="me-1"
                            src="/assets/images/icon/section-title.png"
                            alt="icon"
                        />
                        TESTIMONIALS
                    </h5>
                    <h2
                        className="wow fadeInUp"
                        data-wow-delay="200ms"
                        data-wow-duration="1500ms"
                    >
                        Trusted by Businesses in Hyderabad
                    </h2>
                </div>

                {/* Testimonials Slider */}
                <div className="testimonials__slider-wrapper">
                    <Slider {...settings}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="testimonials__slide">
                                <div className="testimonials__card">
                                    {/* Rating Stars */}
                                    <div className="testimonials__rating">
                                        <span className="stars">{renderStars(testimonial.rating)}</span>
                                    </div>

                                    {/* Testimonial Text */}
                                    <p className="testimonials__text">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="testimonials__author">
                                        <div className="testimonials__avatar">
                                            <span className="avatar-text">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="testimonials__info">
                                            <h4 className="testimonials__name">{testimonial.name}</h4>
                                            <span className="testimonials__position">
                                                {testimonial.position}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
        .testimonials-area {
          position: relative;
          overflow: hidden;
        }

        /* Slider Wrapper */
        .testimonials__slider-wrapper {
          margin: 0 -15px;
        }

        .testimonials__slide {
          padding: 0 15px;
        }

        /* Testimonial Card */
        .testimonials__card {
          background: var(--white);
          padding: 35px 30px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition: var(--transition);
          border: 1px solid rgba(0, 0, 0, 0.04);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .testimonials__card::before {
          content: '"';
          position: absolute;
          top: 15px;
          right: 25px;
          font-size: 72px;
          color: var(--primary-color);
          opacity: 0.08;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .testimonials__card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          border-color: var(--primary-color);
        }

        /* Rating Stars */
        .testimonials__rating {
          margin-bottom: 16px;
        }

        .testimonials__rating .stars {
          color: #f59e0b;
          font-size: 20px;
          letter-spacing: 2px;
        }

        /* Testimonial Text */
        .testimonials__text {
          font-size: 16px;
          line-height: 28px;
          color: var(--paragraph);
          margin-bottom: 22px;
          flex-grow: 1;
          font-style: italic;
        }

        /* Author Section */
        .testimonials__author {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 18px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .testimonials__avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-bg);
          color: var(--white);
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .avatar-text {
          text-transform: uppercase;
          color: var(--white);
          font-weight: 700;
        }

        .testimonials__info {
          flex: 1;
        }

        .testimonials__name {
          font-size: 16px;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 2px;
          line-height: 1.3;
        }

        .testimonials__position {
          font-size: 14px;
          color: var(--primary-color);
          font-weight: 500;
          display: block;
        }

        /* Slick Custom Styles */
        .testimonials__slider-wrapper :global(.slick-dots) {
          bottom: -50px;
          display: flex !important;
          justify-content: center;
          gap: 8px;
        }

        .testimonials__slider-wrapper :global(.slick-dots li) {
          width: auto;
          height: auto;
          margin: 0;
        }

        .testimonials__slider-wrapper :global(.slick-dots li button) {
          width: 12px;
          height: 12px;
          padding: 0;
          border-radius: 50%;
          background: rgba(6, 202, 188, 0.25);
          transition: var(--transition);
        }

        .testimonials__slider-wrapper :global(.slick-dots li button::before) {
          display: none;
        }

        .testimonials__slider-wrapper :global(.slick-dots li.slick-active button) {
          background: var(--primary-color);
          width: 36px;
          border-radius: 6px;
        }

        .testimonials__slider-wrapper :global(.slick-prev),
        .testimonials__slider-wrapper :global(.slick-next) {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--white);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          z-index: 2;
          transition: var(--transition);
        }

        .testimonials__slider-wrapper :global(.slick-prev:hover),
        .testimonials__slider-wrapper :global(.slick-next:hover) {
          background: var(--primary-color);
        }

        .testimonials__slider-wrapper :global(.slick-prev:hover::before),
        .testimonials__slider-wrapper :global(.slick-next:hover::before) {
          color: var(--white);
        }

        .testimonials__slider-wrapper :global(.slick-prev::before),
        .testimonials__slider-wrapper :global(.slick-next::before) {
          font-family: "Font Awesome 6 Free";
          font-weight: 900;
          font-size: 16px;
          color: var(--heading-color);
          opacity: 1;
        }

        .testimonials__slider-wrapper :global(.slick-prev::before) {
          content: "\\f104";
        }

        .testimonials__slider-wrapper :global(.slick-next::before) {
          content: "\\f105";
        }

        .testimonials__slider-wrapper :global(.slick-prev) {
          left: -60px;
        }

        .testimonials__slider-wrapper :global(.slick-next) {
          right: -60px;
        }

        /* Dark Theme Support */
        :root[data-theme="dark"] .testimonials__card {
          background: var(--sub-bg);
          border-color: rgba(255, 255, 255, 0.06);
        }

        :root[data-theme="dark"] .testimonials__text {
          color: rgba(255, 255, 255, 0.8);
        }

        :root[data-theme="dark"] .testimonials__name {
          color: var(--white);
        }

        :root[data-theme="dark"] .testimonials__slider-wrapper :global(.slick-prev),
        :root[data-theme="dark"] .testimonials__slider-wrapper :global(.slick-next) {
          background: var(--sub-bg);
        }

        :root[data-theme="dark"] .testimonials__slider-wrapper :global(.slick-prev::before),
        :root[data-theme="dark"] .testimonials__slider-wrapper :global(.slick-next::before) {
          color: var(--white);
        }

        /* Responsive */
        @media (max-width: 1199px) {
          .testimonials__slider-wrapper :global(.slick-prev) {
            left: -40px;
          }

          .testimonials__slider-wrapper :global(.slick-next) {
            right: -40px;
          }
        }

        @media (max-width: 991px) {
          .testimonials-area {
            padding: 80px 0;
          }

          .testimonials__slider-wrapper :global(.slick-prev) {
            left: -30px;
          }

          .testimonials__slider-wrapper :global(.slick-next) {
            right: -30px;
          }

          .testimonials__slider-wrapper :global(.slick-prev),
          .testimonials__slider-wrapper :global(.slick-next) {
            width: 38px;
            height: 38px;
          }

          .testimonials__card {
            padding: 28px 24px 24px;
          }
        }

        @media (max-width: 767px) {
          .testimonials-area {
            padding: 60px 0;
          }

          .testimonials__slider-wrapper :global(.slick-prev) {
            left: 10px;
          }

          .testimonials__slider-wrapper :global(.slick-next) {
            right: 10px;
          }

          .testimonials__slider-wrapper :global(.slick-prev),
          .testimonials__slider-wrapper :global(.slick-next) {
            width: 34px;
            height: 34px;
          }

          .testimonials__slider-wrapper :global(.slick-prev::before),
          .testimonials__slider-wrapper :global(.slick-next::before) {
            font-size: 14px;
          }

          .testimonials__card {
            padding: 24px 20px 20px;
          }

          .testimonials__text {
            font-size: 15px;
            line-height: 26px;
          }

          .testimonials__rating .stars {
            font-size: 18px;
          }

          .testimonials__slider-wrapper :global(.slick-dots) {
            bottom: -40px;
          }

          .testimonials__slider-wrapper :global(.slick-dots li button) {
            width: 10px;
            height: 10px;
          }

          .testimonials__slider-wrapper :global(.slick-dots li.slick-active button) {
            width: 30px;
          }
        }

        @media (max-width: 575px) {
          .testimonials__card {
            padding: 20px 16px 18px;
          }

          .testimonials__text {
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 16px;
          }

          .testimonials__rating .stars {
            font-size: 16px;
          }

          .testimonials__avatar {
            width: 40px;
            height: 40px;
            font-size: 15px;
          }

          .testimonials__name {
            font-size: 14px;
          }

          .testimonials__position {
            font-size: 12px;
          }

          .testimonials__card::before {
            font-size: 48px;
            top: 10px;
            right: 18px;
          }
        }
      `}</style>
        </section>
    );
};

export default Testimonials;