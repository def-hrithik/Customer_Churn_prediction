import React, { useEffect, useRef, useState } from 'react';
import './ChurnExplanation.css';

const ChurnExplanation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="churn-explanation" ref={sectionRef}>
      <div className="container">
        <div className="explanation-content">
          {/* Visual Animation Column */}
          <div className="visual-column">
            <div className="animation-container">
              {/* Glowing Background */}
              <div className="glow-background"></div>
              
              {/* Central AI Core */}
              <div className="ai-core">
                <div className="core-inner">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="core-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
              </div>

              {/* Data Points */}
              <div className="data-points">
                <div className="data-point data-point-1" style={{ '--delay': '0s' }}></div>
                <div className="data-point data-point-2" style={{ '--delay': '0.5s' }}></div>
                <div className="data-point data-point-3" style={{ '--delay': '1s' }}></div>
                <div className="data-point data-point-4" style={{ '--delay': '1.5s' }}></div>
                <div className="data-point data-point-5" style={{ '--delay': '2s' }}></div>
                <div className="data-point data-point-6" style={{ '--delay': '2.5s' }}></div>
              </div>

              {/* Insight Output */}
              <div className="insight-output">
                <div className="insight-bubble">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="text-column">
            <div className={`content-wrapper ${isVisible ? 'animate-in' : ''}`}>
              <h2 className="explanation-title">
                What is Churn Prediction?
              </h2>
              
              <p className="explanation-description">
                Churn prediction uses customer data and artificial intelligence to identify customers 
                who are likely to cancel their service. By analyzing patterns in customer behavior, 
                our AI model helps businesses take proactive steps to retain valuable customers 
                before they leave.
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h4>Proactive Retention</h4>
                    <p>Identify at-risk customers before they leave</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h4>Targeted Actions</h4>
                    <p>Tailor marketing campaigns and offers to retain valuable customers</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h4>Boost ROI</h4>
                    <p>Optimize your retention budget by focusing on the right customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurnExplanation;