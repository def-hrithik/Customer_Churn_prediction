import React, { useEffect, useState } from 'react';
import AnimatedChart from '../components/AnimatedChart';
import { useTheme } from '../contexts/ThemeContext';
import './Insights.css';
import '../components/AnimatedChart.css';

const Insights = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [animationDelays, setAnimationDelays] = useState({});

  useEffect(() => {
    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Set staggered animation delays for charts
    setAnimationDelays({
      chart1: 200,
      chart2: 400,
      chart3: 600,
      chart4: 800
    });
  }, []);

  // Mock data for visualizations
  const churnByContract = {
    labels: ['Month-to-month', 'One year', 'Two year'],
    datasets: [{
      label: 'Churn Rate (%)',
      data: [42.7, 11.3, 2.8],
      backgroundColor: ['#ff6b6b', '#ffd43b', '#51cf66'],
      borderColor: ['#ff5252', '#ffc107', '#4caf50'],
      borderWidth: 2
    }]
  };

  const ageDistribution = {
    labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
    datasets: [
      {
        label: 'Churned',
        data: [12, 18, 25, 22, 15, 8],
        backgroundColor: '#ff6b6b'
      },
      {
        label: 'Retained',
        data: [15, 22, 28, 20, 12, 5],
        backgroundColor: '#51cf66'
      }
    ]
  };

  const monthlyChargesImpact = {
    labels: ['$0-30', '$30-50', '$50-70', '$70-90', '$90+'],
    datasets: [{
      label: 'Average Churn Rate (%)',
      data: [8.2, 15.7, 23.4, 35.1, 48.9],
      backgroundColor: '#4dabf7',
      borderColor: '#339af0',
      borderWidth: 2
    }]
  };

  const tenureAnalysis = {
    labels: ['0-12', '13-24', '25-36', '37-48', '49-60', '60+'],
    datasets: [{
      label: 'Churn Rate (%)',
      data: [45.2, 28.7, 18.3, 12.1, 8.9, 5.4],
      borderColor: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const serviceUsage = {
    labels: ['Phone Service', 'Internet Service', 'Online Security', 'Tech Support', 'Streaming TV', 'Streaming Movies'],
    datasets: [
      {
        label: 'With Service (%)',
        data: [65, 78, 45, 38, 52, 48],
        backgroundColor: '#51cf66'
      },
      {
        label: 'Without Service (%)',
        data: [35, 22, 55, 62, 48, 52],
        backgroundColor: '#ff6b6b'
      }
    ]
  };

  const paymentMethodChurn = {
    labels: ['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'],
    datasets: [{
      data: [45.3, 19.1, 16.8, 15.2],
      backgroundColor: ['#ff6b6b', '#ffd43b', '#4dabf7', '#51cf66'],
      borderWidth: 2,
      borderColor: isDarkMode ? '#2d2d2d' : '#ffffff'
    }]
  };

  const totalChargesTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Average Total Charges ($)',
      data: [1200, 1350, 1450, 1600, 1750, 1850, 1950, 2100, 2200, 2300, 2400, 2500],
      borderColor: '#4dabf7',
      backgroundColor: 'rgba(77, 171, 247, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const genderDistribution = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [50.5, 49.5],
      backgroundColor: ['#4dabf7', '#ff6b6b'],
      borderWidth: 2,
      borderColor: isDarkMode ? '#2d2d2d' : '#ffffff'
    }]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'demographics', label: 'Demographics', icon: '👥' },
    { id: 'services', label: 'Services', icon: '🛡️' },
    { id: 'financial', label: 'Financial', icon: '💰' }
  ];

  return (
    <div className="insights">
      <div className="container">
        <div className="insights-header">
          <h1>Customer Insights Dashboard</h1>
          <p>Comprehensive analysis of customer behavior and churn patterns</p>
        </div>

        <div className="insights-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="insights-content">
          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <div className="row">
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Churn Rate by Contract Type</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={churnByContract}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Month-to-month contracts show significantly higher churn rates (42.7%) compared to long-term contracts.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Tenure Impact on Churn</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="line"
                        data={tenureAnalysis}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Churn rate decreases dramatically as customer tenure increases, with new customers being most at risk.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-4">
                  <div className="stats-card">
                    <div className="stat-icon">📉</div>
                    <div className="stat-number">26.5%</div>
                    <div className="stat-label">Overall Churn Rate</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stats-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-number">7,043</div>
                    <div className="stat-label">Total Customers</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stats-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-number">$64.76</div>
                    <div className="stat-label">Avg. Monthly Charges</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demographics' && (
            <div className="tab-content fade-in">
              <div className="row">
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Churn by Age Groups</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={ageDistribution}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Middle-aged customers (36-45) represent the largest segment, but younger customers show higher churn propensity.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Gender Distribution</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="doughnut"
                        data={genderDistribution}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                        options={{
                          plugins: {
                            legend: {
                              position: 'bottom'
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Customer base is evenly distributed between genders with no significant churn rate differences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="tab-content fade-in">
              <div className="row">
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Service Usage vs Churn</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={serviceUsage}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Customers without online security and tech support show higher churn rates.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Payment Method Distribution</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="pie"
                        data={paymentMethodChurn}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                        options={{
                          plugins: {
                            legend: {
                              position: 'right'
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Electronic check users have the highest churn rate, indicating payment method as a risk factor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="tab-content fade-in">
              <div className="row">
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Monthly Charges Impact</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={monthlyChargesImpact}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Higher monthly charges correlate with increased churn rates, especially above $70/month.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Total Charges Trend</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="line"
                        data={totalChargesTrend}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Average total charges have been steadily increasing throughout the year, indicating service expansion.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="card recommendations-card">
                    <h3>💡 Key Recommendations</h3>
                    <div className="recommendations-grid">
                      <div className="recommendation">
                        <div className="rec-icon">🎯</div>
                        <div className="rec-content">
                          <h4>Target High-Risk Customers</h4>
                          <p>Focus retention efforts on month-to-month customers with high monthly charges and electronic payment methods.</p>
                        </div>
                      </div>
                      <div className="recommendation">
                        <div className="rec-icon">🔒</div>
                        <div className="rec-content">
                          <h4>Promote Security Services</h4>
                          <p>Increase adoption of online security and tech support services to improve customer retention.</p>
                        </div>
                      </div>
                      <div className="recommendation">
                        <div className="rec-icon">📅</div>
                        <div className="rec-content">
                          <h4>Incentivize Long-term Contracts</h4>
                          <p>Offer attractive discounts for customers to switch from month-to-month to annual contracts.</p>
                        </div>
                      </div>
                      <div className="recommendation">
                        <div className="rec-icon">💳</div>
                        <div className="rec-content">
                          <h4>Payment Method Migration</h4>
                          <p>Encourage customers to switch from electronic checks to more stable payment methods with incentives.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;