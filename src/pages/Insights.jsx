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
  const [showMobileTabMenu, setShowMobileTabMenu] = useState(false);

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

  // Enhanced data visualizations based on customer churn analysis
  
  // Overview Tab: Scatter Plot Data (Tenure vs Monthly Charges)
  const tenureVsMonthlyCharges = {
    datasets: [
      {
        label: 'Churned Customers',
        data: [
          { x: 2, y: 85 }, { x: 5, y: 92 }, { x: 8, y: 78 }, { x: 12, y: 95 },
          { x: 15, y: 88 }, { x: 18, y: 75 }, { x: 22, y: 82 }, { x: 25, y: 69 },
          { x: 6, y: 105 }, { x: 9, y: 98 }, { x: 14, y: 89 }, { x: 19, y: 76 },
          { x: 3, y: 112 }, { x: 7, y: 87 }, { x: 11, y: 94 }, { x: 16, y: 73 }
        ],
        backgroundColor: 'rgba(255, 107, 107, 0.8)',
        borderColor: 'var(--error-color)',
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Retained Customers',
        data: [
          { x: 35, y: 45 }, { x: 42, y: 52 }, { x: 48, y: 38 }, { x: 55, y: 41 },
          { x: 62, y: 49 }, { x: 68, y: 36 }, { x: 72, y: 43 }, { x: 45, y: 67 },
          { x: 38, y: 58 }, { x: 51, y: 44 }, { x: 59, y: 39 }, { x: 65, y: 46 },
          { x: 29, y: 72 }, { x: 33, y: 63 }, { x: 47, y: 55 }, { x: 56, y: 42 }
        ],
        backgroundColor: 'rgba(81, 207, 102, 0.8)',
        borderColor: 'var(--success-color)',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  // Enhanced Contract Churn Data
  const churnByContract = {
    labels: ['Month-to-month', 'One year', 'Two year'],
    datasets: [{
      label: 'Churn Rate (%)',
      data: [42.7, 11.3, 2.8],
      backgroundColor: [
        'rgba(255, 107, 107, 0.8)',
        'rgba(255, 212, 59, 0.8)',
        'rgba(81, 207, 102, 0.8)'
      ],
      borderColor: [
        'var(--error-color)',
        'var(--warning-color)',
        'var(--success-color)'
      ],
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  // Demographics: Age Groups Stacked Bar
  const ageDistribution = {
    labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
    datasets: [
      {
        label: 'Churned',
        data: [28, 22, 18, 15, 12, 8],
        backgroundColor: 'rgba(255, 107, 107, 0.8)',
        borderColor: 'var(--error-color)',
        borderWidth: 1
      },
      {
        label: 'Retained',
        data: [15, 25, 32, 28, 18, 12],
        backgroundColor: 'rgba(81, 207, 102, 0.8)',
        borderColor: 'var(--success-color)',
        borderWidth: 1
      }
    ]
  };

  // Demographics: Gender Distribution Doughnut
  const genderDistribution = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [50.5, 49.5],
      backgroundColor: [
        'rgba(77, 171, 247, 0.8)',
        'rgba(255, 107, 107, 0.8)'
      ],
      borderColor: [
        'var(--accent)',
        'var(--error-color)'
      ],
      borderWidth: 2
    }]
  };

  // Services: Service Adoption vs Churn (Grouped Bar)
  const serviceAdoptionChurn = {
    labels: ['Online Security', 'Tech Support', 'Device Protection', 'Online Backup'],
    datasets: [
      {
        label: 'Churn Rate with Service (%)',
        data: [15.2, 16.8, 18.3, 19.7],
        backgroundColor: 'rgba(81, 207, 102, 0.8)',
        borderColor: 'var(--success-color)',
        borderWidth: 1
      },
      {
        label: 'Churn Rate without Service (%)',
        data: [41.8, 39.2, 36.5, 34.1],
        backgroundColor: 'rgba(255, 107, 107, 0.8)',
        borderColor: 'var(--error-color)',
        borderWidth: 1
      }
    ]
  };

  // Services: Payment Method Pie Chart
  const paymentMethodChurn = {
    labels: ['Electronic check', 'Mailed check', 'Bank transfer (auto)', 'Credit card (auto)'],
    datasets: [{
      data: [45.3, 19.1, 16.8, 15.2],
      backgroundColor: [
        'rgba(255, 107, 107, 0.8)',
        'rgba(255, 212, 59, 0.8)',
        'rgba(77, 171, 247, 0.8)',
        'rgba(81, 207, 102, 0.8)'
      ],
      borderColor: [
        'var(--error-color)',
        'var(--warning-color)',
        'var(--accent)',
        'var(--success-color)'
      ],
      borderWidth: 2
    }]
  };

  // Financial: Monthly Charges Distribution (Histogram with KDE overlay simulation)
  const monthlyChargesHistogram = {
    labels: ['$20-30', '$30-40', '$40-50', '$50-60', '$60-70', '$70-80', '$80-90', '$90-100', '$100+'],
    datasets: [
      {
        type: 'bar',
        label: 'Churned Customers',
        data: [5, 8, 12, 18, 25, 22, 18, 15, 12],
        backgroundColor: 'rgba(255, 107, 107, 0.6)',
        borderColor: 'var(--error-color)',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        type: 'bar',
        label: 'Retained Customers',
        data: [15, 22, 28, 25, 18, 12, 8, 5, 3],
        backgroundColor: 'rgba(81, 207, 102, 0.6)',
        borderColor: 'var(--success-color)',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: 'Churn Probability Density',
        data: [0.08, 0.15, 0.22, 0.35, 0.48, 0.62, 0.55, 0.42, 0.28],
        borderColor: 'var(--accent)',
        backgroundColor: 'rgba(77, 171, 247, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  // Financial: Tenure Impact Line Chart
  const tenureImpactOnChurn = {
    labels: ['0-6', '7-12', '13-18', '19-24', '25-30', '31-36', '37-42', '43-48', '49+'],
    datasets: [{
      label: 'Churn Rate (%)',
      data: [52.3, 38.7, 28.2, 22.1, 18.4, 15.8, 12.3, 9.7, 6.2],
      borderColor: 'var(--error-color)',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointBackgroundColor: 'var(--error-color)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'demographics', label: 'Demographics', icon: '👥' },
    { id: 'services', label: 'Services', icon: '🛡️' },
    { id: 'financial', label: 'Financial', icon: '💰' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowMobileTabMenu(false);
  };

  return (
    <div className="insights">
      <div className="container">
        <div className="insights-header">
          <h1>Customer Insights Dashboard</h1>
          <p>Comprehensive analysis of customer behavior and churn patterns</p>
        </div>

        <div className="insights-tabs-container">
          <div className="insights-tabs">
            <div className="tabs-wrapper">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile dropdown menu */}
          <div className="mobile-tab-selector">
            <button 
              className="mobile-tab-button"
              onClick={() => setShowMobileTabMenu(!showMobileTabMenu)}
            >
              <span className="current-tab-icon">
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </span>
              <span className="current-tab-label">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </span>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {showMobileTabMenu && (
              <div className="mobile-tab-dropdown">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`mobile-dropdown-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="insights-content">
          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <div className="row">
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Tenure vs. Monthly Charges Analysis</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="scatter"
                        data={tenureVsMonthlyCharges}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              title: {
                                display: true,
                                text: 'Tenure (months)',
                                color: 'var(--text-secondary)'
                              },
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)'
                              }
                            },
                            y: {
                              title: {
                                display: true,
                                text: 'Monthly Charges ($)',
                                color: 'var(--text-secondary)'
                              },
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)'
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: 'var(--text-secondary)',
                                usePointStyle: true,
                                padding: 20
                              }
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Customers with low tenure and high monthly charges are at a significantly higher risk of churning.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Churn Rate by Contract Type</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={churnByContract}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              grid: {
                                display: false
                              },
                              ticks: {
                                color: 'var(--text-secondary)'
                              }
                            },
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                callback: function(value) {
                                  return value + '%';
                                }
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              display: false
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `Churn Rate: ${context.parsed.y}%`;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Month-to-month contracts have a churn rate over 3x higher than annual contracts, highlighting a key retention opportunity.</p>
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
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              stacked: true,
                              grid: {
                                display: false
                              },
                              ticks: {
                                color: 'var(--text-secondary)'
                              }
                            },
                            y: {
                              stacked: true,
                              beginAtZero: true,
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                callback: function(value) {
                                  return value + '%';
                                }
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: 'var(--text-secondary)',
                                usePointStyle: true,
                                padding: 20
                              }
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `${context.dataset.label}: ${context.parsed.y}%`;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> While the 26-45 age group is the largest, younger customers (18-25) exhibit the highest churn propensity.</p>
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
                          responsive: true,
                          maintainAspectRatio: false,
                          cutout: '60%',
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: 'var(--text-secondary)',
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                  size: 14
                                }
                              }
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.parsed}%`;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> The customer base is evenly split by gender, indicating gender is not a significant factor in churn.</p>
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
                    <h3>Service Adoption & Churn Analysis</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={serviceAdoptionChurn}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              grid: {
                                display: false
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                maxRotation: 45
                              }
                            },
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                callback: function(value) {
                                  return value + '%';
                                }
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: 'var(--text-secondary)',
                                usePointStyle: true,
                                padding: 20
                              }
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `${context.dataset.label}: ${context.parsed.y}%`;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Lack of key add-on services like Online Security and Tech Support strongly correlates with higher churn.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Churn by Payment Method</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="pie"
                        data={paymentMethodChurn}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: 'var(--text-secondary)',
                                usePointStyle: true,
                                padding: 15,
                                font: {
                                  size: 12
                                }
                              }
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.parsed}%`;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Customers using 'Electronic check' are nearly 3 times more likely to churn than those using automatic payments.</p>
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
                    <h3>Monthly Charges Distribution with Churn Density</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="bar"
                        data={monthlyChargesHistogram}
                        animate={!isLoading}
                        delay={animationDelays.chart1}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          interaction: {
                            mode: 'index',
                            intersect: false
                          },
                          scales: {
                            x: {
                              grid: {
                                display: false
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                maxRotation: 45
                              }
                            },
                            y: {
                              type: 'linear',
                              display: true,
                              position: 'left',
                              beginAtZero: true,
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)'
                              },
                              title: {
                                display: true,
                                text: 'Customer Count',
                                color: 'var(--text-secondary)'
                              }
                            },
                            y1: {
                              type: 'linear',
                              display: true,
                              position: 'right',
                              beginAtZero: true,
                              grid: {
                                drawOnChartArea: false
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                callback: function(value) {
                                  return (value * 100).toFixed(0) + '%';
                                }
                              },
                              title: {
                                display: true,
                                text: 'Churn Probability',
                                color: 'var(--text-secondary)'
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: 'var(--text-secondary)',
                                usePointStyle: true,
                                padding: 20
                              }
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> The churn probability density peaks at higher monthly charges, confirming that cost is a major factor in customer churn.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card chart-card">
                    <h3>Tenure Impact on Churn Rate</h3>
                    <div className="chart-container">
                      <AnimatedChart
                        type="line"
                        data={tenureImpactOnChurn}
                        animate={!isLoading}
                        delay={animationDelays.chart2}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: {
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)'
                              },
                              title: {
                                display: true,
                                text: 'Tenure (months)',
                                color: 'var(--text-secondary)'
                              }
                            },
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: 'var(--border)',
                                lineWidth: 0.5
                              },
                              ticks: {
                                color: 'var(--text-secondary)',
                                callback: function(value) {
                                  return value + '%';
                                }
                              },
                              title: {
                                display: true,
                                text: 'Churn Rate (%)',
                                color: 'var(--text-secondary)'
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              display: false
                            },
                            tooltip: {
                              backgroundColor: 'var(--card-bg)',
                              titleColor: 'var(--text-primary)',
                              bodyColor: 'var(--text-secondary)',
                              borderColor: 'var(--border)',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `Churn Rate: ${context.parsed.y}%`;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="insight-text">
                      <p><strong>Key Insight:</strong> Churn risk is highest in the first 12 months and drops significantly after the 2-year mark, emphasizing the importance of early-life customer engagement.</p>
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