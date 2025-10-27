import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import AnimatedChart from '../components/AnimatedChart';
import { useTheme } from '../contexts/ThemeContext';
import './Prediction.css';
import '../components/AnimatedChart.css';
import axios from 'axios';


const Prediction = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    seniorCitizen: '',
    tenure: '',
    monthlyCharges: '',
    contract: 'Month-to-month',
    paymentMethod: 'Electronic check'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (formData.seniorCitizen !== '0' && formData.seniorCitizen !== '1'){
      errors.seniorCitizen = 'Please Select Senior Citizen Status';
    }

    if (!formData.tenure || formData.tenure < 0 || formData.tenure > 100) {
      errors.tenure = 'Please enter a valid tenure (0-100 months)';
    }
    
    if (!formData.monthlyCharges || formData.monthlyCharges <= 0) {
      errors.monthlyCharges = 'Please enter valid monthly charges';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const orderedInput = {
      seniorCitizen: formData.seniorCitizen,
      tenure: formData.tenure,
      contract: formData.contract,
      paymentMethod: formData.paymentMethod,
      monthlyCharges: formData.monthlyCharges,
    };

      const response = await axios.post("/api/predict", orderedInput);
      
      // Use the complete response from the backend directly
      setPrediction(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!prediction) return;
    
    const csvData = [
      ['Field', 'Value'],
      ['Date', new Date().toLocaleDateString()],
      ['Customer Age', formData.age],
      ['Tenure (months)', formData.tenure],
      ['Monthly Charges ($)', formData.monthlyCharges],
      ['Contract Type', formData.contract],
      ['Payment Method', formData.paymentMethod],
      ['', ''],
      ['PREDICTION RESULTS', ''],
      ['Churn Probability (%)', prediction.churnProbability.toFixed(1)],
      ['Risk Level', prediction.riskLevel],
      ['Model Confidence (%)', prediction.confidence.toFixed(1)],
      ['', ''],
      ['RISK FACTORS', ''],
      ...prediction.factors.map(factor => [factor.name, `Impact: ${factor.impact}% (${factor.value})`])
    ];
    
    const csvContent = csvData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `churn-prediction-data-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const probabilityData = prediction ? {
    labels: ['Churn Risk', 'Retention Likelihood'],
    datasets: [{
      data: [prediction.churnProbability, 100 - prediction.churnProbability],
      backgroundColor: [
        prediction.churnProbability > 60 ? '#ff6b6b' : 
        prediction.churnProbability > 30 ? '#ffd43b' : '#51cf66',
        isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)'
      ],
      borderColor: [
        prediction.churnProbability > 60 ? '#ff5252' : 
        prediction.churnProbability > 30 ? '#ffc107' : '#4caf50',
        isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)'
      ],
      borderWidth: 3,
      hoverBackgroundColor: [
        prediction.churnProbability > 60 ? '#ff5252' : 
        prediction.churnProbability > 30 ? '#ffc107' : '#4caf50',
        isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)'
      ],
      hoverBorderWidth: 4,
      hoverBorderColor: [
        prediction.churnProbability > 60 ? '#d32f2f' : 
        prediction.churnProbability > 30 ? '#f57c00' : '#388e3c',
        isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(59, 130, 246, 0.3)'
      ],
      cutout: '65%',
      rotation: -90,
      circumference: 360
    }]
  } : null;

  const factorsData = prediction ? {
    labels: prediction.factors.map(factor => factor.name),
    datasets: [{
      label: 'Impact Score (%)',
      data: prediction.factors.map(factor => factor.impact),
      backgroundColor: prediction.factors.map(factor => {
        if (factor.impact > 70) return 'rgba(255, 107, 107, 0.8)'; // High impact - Red
        if (factor.impact > 40) return 'rgba(255, 212, 59, 0.8)';  // Medium impact - Yellow  
        return 'rgba(81, 207, 102, 0.8)'; // Low impact - Green
      }),
      borderColor: prediction.factors.map(factor => {
        if (factor.impact > 70) return '#ff5252'; // High impact - Dark Red
        if (factor.impact > 40) return '#ffc107'; // Medium impact - Dark Yellow
        return '#4caf50'; // Low impact - Dark Green
      }),
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
      hoverBackgroundColor: prediction.factors.map(factor => {
        if (factor.impact > 70) return 'rgba(255, 107, 107, 1)';
        if (factor.impact > 40) return 'rgba(255, 212, 59, 1)';
        return 'rgba(81, 207, 102, 1)';
      }),
      hoverBorderColor: prediction.factors.map(factor => {
        if (factor.impact > 70) return '#d32f2f'; // Darker red on hover
        if (factor.impact > 40) return '#f57c00'; // Darker orange on hover
        return '#388e3c'; // Darker green on hover
      }),
      hoverBorderWidth: 3,
      // Add gradient effect
      gradient: {
        backgroundColor: {
          axis: 'y',
          colors: {
            0: 'rgba(81, 207, 102, 0.1)',
            100: 'rgba(255, 107, 107, 0.9)'
          }
        }
      }
    }]
  } : null;

  return (
    <div className="prediction">
      <div className="container">
        <div className="prediction-header">
          <h1>Customer Churn Prediction</h1>
          <p>Enter customer details to predict churn probability using our AI model</p>
        </div>

        <div className="prediction-layout">
          <div className="form-section">
            <div className="card form-card">
              <div className="form-header">
                <h2>
                  <span className="form-icon">📝</span>
                  Customer Information
                </h2>
                {window.innerWidth < 768 && prediction && (
                  <button 
                    className="toggle-form-btn"
                    onClick={toggleFormVisibility}
                    aria-label="Toggle form visibility"
                  >
                    {isFormVisible ? '👁️' : '📊'}
                  </button>
                )}
              </div>
              
              <form 
                onSubmit={handleSubmit} 
                className={`prediction-form ${isFormVisible ? 'visible' : 'hidden'}`}
              >
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Senior Citizen <span className="required">*</span>
                    </label>
                    <select
                      name="seniorCitizen"
                      value={formData.seniorCitizen}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.seniorCitizen ? 'error' : ''}`}
                      required
                    >
                      <option value="">Select</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                    {formErrors.seniorCitizen && (
                      <span className="error-text">{formErrors.seniorCitizen}</span>
                    )}
                  </div>

                  
                  <div className="form-group">
                    <label className="form-label">
                      Tenure (months) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="tenure"
                      value={formData.tenure}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.tenure ? 'error' : ''}`}
                      placeholder="Enter tenure"
                      min="0"
                      max="100"
                      required
                    />
                    {formErrors.tenure && <span className="error-text">{formErrors.tenure}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Contract Type</label>
                    <select
                      name="contract"
                      value={formData.contract}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Month-to-month">Month-to-month</option>
                      <option value="One year">One year</option>
                      <option value="Two year">Two year</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Electronic check">Electronic check</option>
                      <option value="Mailed check">Mailed check</option>
                      <option value="Bank transfer">Bank transfer</option>
                      <option value="Credit card">Credit card</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Monthly Charges ($) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="monthlyCharges"
                      value={formData.monthlyCharges}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.monthlyCharges ? 'error' : ''}`}
                      placeholder="Enter monthly charges"
                      step="0.01"
                      min="0"
                      required
                    />
                    {formErrors.monthlyCharges && <span className="error-text">{formErrors.monthlyCharges}</span>}
                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg prediction-btn"
                  disabled={loading}
                >
                  <span className="btn-icon">🔮</span>
                  <span>Predict Churn</span>
                </button>
              </form>
            </div>
          </div>

          <div className="results-section">
            {prediction ? (
              <div className="prediction-results">
                <div className="card result-card">
                  <div className="result-header">
                    <h2>
                      <span className="result-icon">🎯</span>
                      Prediction Results
                    </h2>
                    <div className="export-buttons">
                      <button
                        onClick={exportToPDF}
                        className="btn btn-secondary export-btn"
                        disabled={loading}
                        title="Export as PDF"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 16l4-4h-3V4h-2v8H8l4 4zm9-13h-6v1.99h6V18H3V4.99h6V3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor"/>
                        </svg>
                        PDF
                      </button>
                      <button
                        onClick={exportToCSV}
                        className="btn btn-secondary export-btn"
                        disabled={loading}
                        title="Export as CSV"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="currentColor"/>
                        </svg>
                        CSV
                      </button>
                    </div>
                  </div>
                  
                  <div className="result-summary">
                    <div className={`churn-probability ${
                      prediction.churnProbability > 60 ? 'high-risk' : 
                      prediction.churnProbability > 30 ? 'medium-risk' : 'low-risk'
                    }`}>
                      <div className="probability-value">
                        {prediction.churnProbability.toFixed(1)}%
                      </div>
                      <div className="probability-label">Churn Probability</div>
                      <div className="risk-indicator">
                        {prediction.churnProbability > 60 ? '🔴' : 
                         prediction.churnProbability > 30 ? '🟡' : '🟢'}
                      </div>
                    </div>
                    
                    <div className="result-details">
                      <div className="detail-item">
                        <span className="detail-label">Risk Level:</span>
                        <span className={`detail-value ${prediction.riskLevel.toLowerCase()}-risk`}>
                          {prediction.riskLevel}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Confidence:</span>
                        <span className="detail-value">{prediction.confidence.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card chart-card">
                  <h3>
                    <span className="chart-icon">📊</span>
                    Risk Distribution
                  </h3>
                  <div className="chart-container">
                    <AnimatedChart 
                      type="doughnut"
                      data={probabilityData}
                      animate={true}
                      delay={300}
                      enableMobileGestures={true}
                      title="Churn Probability Distribution"
                      options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          cutout: '65%',
                          animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 2000,
                            easing: 'easeOutQuart'
                          },
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                padding: 20,
                                font: {
                                  size: 14,
                                  weight: '500'
                                },
                                color: isDarkMode ? '#ffffff' : '#374151',
                                usePointStyle: true,
                                pointStyle: 'circle'
                              }
                            },
                            tooltip: {
                              backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                              titleColor: isDarkMode ? '#ffffff' : '#374151',
                              bodyColor: isDarkMode ? '#d1d5db' : '#6b7280',
                              borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.3)',
                              borderWidth: 1,
                              cornerRadius: 8,
                              displayColors: true,
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.parsed.toFixed(1)}%`;
                                }
                              }
                            }
                          },
                          elements: {
                            arc: {
                              borderJoinStyle: 'round'
                            }
                          }
                        }}
                      />
                  </div>
                </div>

                <div className="card chart-card">
                  <h3>
                    <span className="chart-icon">📈</span>
                    Feature Impact Analysis
                  </h3>
                  <div className="chart-container">
                    <AnimatedChart 
                      type="bar"
                      data={factorsData}
                      animate={true}
                      delay={600}
                      enableMobileGestures={true}
                      title="Risk Factors by Impact"
                      options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          animation: {
                            duration: 2500,
                            easing: 'easeOutBounce',
                            delay: (context) => {
                              return context.dataIndex * 200;
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100,
                              grid: {
                                color: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.3)',
                                lineWidth: 1
                              },
                              ticks: {
                                color: isDarkMode ? '#d1d5db' : '#6b7280',
                                font: {
                                  size: 12,
                                  weight: '500'
                                },
                                callback: function(value) {
                                  return value + '%';
                                }
                              },
                              title: {
                                display: true,
                                text: 'Impact Score (%)',
                                color: isDarkMode ? '#ffffff' : '#374151',
                                font: {
                                  size: 14,
                                  weight: '600'
                                }
                              }
                            },
                            x: {
                              grid: {
                                display: false
                              },
                              ticks: {
                                color: isDarkMode ? '#d1d5db' : '#6b7280',
                                font: {
                                  size: 11,
                                  weight: '500'
                                },
                                maxRotation: 45,
                                minRotation: 0
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              display: false
                            },
                            tooltip: {
                              backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                              titleColor: isDarkMode ? '#ffffff' : '#374151',
                              bodyColor: isDarkMode ? '#d1d5db' : '#6b7280',
                              borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.3)',
                              borderWidth: 1,
                              cornerRadius: 8,
                              displayColors: false,
                              callbacks: {
                                title: function(context) {
                                  return context[0].label;
                                },
                                label: function(context) {
                                  const factor = prediction.factors[context.dataIndex];
                                  return [
                                    `Impact Score: ${context.parsed.y.toFixed(1)}%`,
                                    `Value: ${factor.value}`,
                                    `Risk Level: ${context.parsed.y > 70 ? 'High' : context.parsed.y > 40 ? 'Medium' : 'Low'}`
                                  ];
                                }
                              }
                            }
                          },
                          elements: {
                            bar: {
                              borderSkipped: false,
                              borderRadius: {
                                topLeft: 8,
                                topRight: 8,
                                bottomLeft: 4,
                                bottomRight: 4
                              }
                            }
                          },
                          interaction: {
                            intersect: false,
                            mode: 'index'
                          }
                        }}
                      />
                  </div>
                </div>

                {prediction.riskLevel === 'High' && (
                  <div className="card recommendations-card">
                    <h3>
                      <span className="rec-icon">💡</span>
                      Recommended Actions
                    </h3>
                    <div className="recommendations">
                      <div className="recommendation">
                        <span className="rec-bullet">🎯</span>
                        Contact customer immediately for retention discussion
                      </div>
                      <div className="recommendation">
                        <span className="rec-bullet">💰</span>
                        Consider offering promotional discounts or upgrades
                      </div>
                      <div className="recommendation">
                        <span className="rec-bullet">📞</span>
                        Schedule personalized customer support session
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card placeholder-card">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🎯</div>
                  <h3>Ready for Prediction</h3>
                  <p>Fill out the customer information form and click "Predict Churn" to see AI-powered results and visualizations.</p>
                  <div className="placeholder-features">
                    <div className="feature">✨ Real-time analysis</div>
                    <div className="feature">📊 Interactive charts</div>
                    <div className="feature">🎯 Actionable insights</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;