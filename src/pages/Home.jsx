import React from 'react';
import { Link } from 'react-router-dom';
import ChurnExplanation from '../components/ChurnExplanation';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Predict Customer Churn with
              <span className="gradient-text"> AI Intelligence</span>
            </h1>
            <p className="hero-description">
              Leverage advanced machine learning algorithms to identify customers at risk of churning. 
              Make data-driven decisions to improve customer retention and boost your business growth.
            </p>
            <div className="hero-actions">
              <Link to="/prediction" className="btn btn-primary">
                Start Prediction
              </Link>
              <Link to="/insights" className="btn btn-secondary">
                View Insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Churn Explanation Section */}
      <ChurnExplanation />

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>Advanced analytics and machine learning for better customer insights</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Accurate Predictions</h3>
              <p>Our ML models achieve high accuracy rates using advanced algorithms trained on comprehensive customer data.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Real-time Analysis</h3>
              <p>Get instant predictions and insights. No waiting time - make critical decisions when they matter most.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Interactive Dashboards</h3>
              <p>Explore your data with beautiful, interactive visualizations that adapt to both light and dark themes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Reduce Customer Churn?</h2>
            <p>Start making data-driven decisions today with our powerful prediction platform.</p>
            <Link to="/prediction" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;