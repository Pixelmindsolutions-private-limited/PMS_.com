import React, { useEffect, useRef } from "react";

import Step1 from "../assets/Home/step1.png";
import Step2 from "../assets/Home/step2.png";
import Step3 from "../assets/Home/step3.png";
import Step4 from "../assets/Home/step2.png";
import Step5 from "../assets/Home/step1.png";

const steps = [
  {
    img: Step1,
    title: "Discover & Plan",
    subtitle: "Understanding your vision and building the right strategy",
    desc: "We begin by understanding your business goals, ideas, and project requirements. Our team analyzes your needs and creates a roadmap.",
  },
  {
    img: Step2,
    title: "Design & Finalize",
    subtitle: "Creating designs that match your vision",
    desc: "We transform ideas into engaging and user-friendly designs with collaborative UI/UX planning.",
  },
  {
    img: Step3,
    title: "Develop & Deploy",
    subtitle: "Turning designs into powerful digital solutions",
    desc: "We develop secure, scalable, and high-performance applications using modern technologies.",
  },
  {
    img: Step4,
    title: "Testing",
    subtitle: "Ensuring quality, performance, and perfection",
    desc: "Every feature is tested thoroughly to deliver a stable and reliable experience across all devices.",
  },
  {
    img: Step5,
    title: "Delivery & Support",
    subtitle: "Launching your project with confidence",
    desc: "We launch your product successfully and continue providing support, updates, and future enhancements.",
  },
];

export default function ProcessSection() {
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-area py-120">
      <div className="container">
        <div className="section-header text-center mb-70">
          <h5>Our Process</h5>
          <h2>Our Development Process</h2>
        </div>

        <div className="timeline">
          {steps.map((step, i) => {
            const side = i % 2 === 0 ? "step-left" : "step-right";
            return (
              <div
                key={step.title}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`timeline-step ${side}`}
              >
                <div className="step-card">
                  <img src={step.img} alt={step.title} loading="lazy" />
                  <h4>{step.title}</h4>
                  <h6>{step.subtitle}</h6>
                  <p>{step.desc}</p>
                </div>

                <div className="step-node">
                  <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}