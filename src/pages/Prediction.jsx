import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import AnimatedChart from '../components/AnimatedChart';
import SkeletonLoader from '../components/SkeletonLoader';
import LoadingSpinner, { ProgressSpinner, LoadingOverlay } from '../components/LoadingSpinner';
import { useProgressiveLoading, useLazyLoading } from '../hooks/useLoading';
import { useTheme } from '../contexts/ThemeContext';
import './Prediction.css';
import '../components/AnimatedChart.css';

const Prediction = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    age: '',
    tenure: '',
    monthlyCharges: '',
    totalCharges: '',
    contract: 'Month-to-month',
    internetService: 'DSL',
    paymentMethod: 'Electronic check',
    gender: 'Male',
    partner: 'No',
    dependents: 'No',
    phoneService: 'Yes',
    onlineSecurity: 'No',
    onlineBackup: 'No',
    techSupport: 'No',
    streamingTV: 'No',
    streamingMovies: 'No'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Progressive loading states
  const {
    currentStage,
    isLoading: progressLoading,
    loadingProgress,
    nextStage,
    complete: completeLoading,
    reset: resetLoading
  } = useProgressiveLoading({
    loadingStages: ['validating', 'processing', 'analyzing', 'complete'],
    stageDelays: [0, 800, 1500, 2200],
    autoProgress: false
  });

  // Lazy loading for charts
  const { 
    elementRef: chartRef, 
    isVisible: isChartVisible,
    markAsLoaded: markChartLoaded 
  } = useLazyLoading();

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
    
    if (!formData.age || formData.age < 18 || formData.age > 100) {
      errors.age = 'Please enter a valid age (18-100)';
    }
    
    if (!formData.tenure || formData.tenure < 0 || formData.tenure > 100) {
      errors.tenure = 'Please enter a valid tenure (0-100 months)';
    }
    
    if (!formData.monthlyCharges || formData.monthlyCharges <= 0) {
      errors.monthlyCharges = 'Please enter valid monthly charges';
    }
    
    if (!formData.totalCharges || formData.totalCharges <= 0) {
      errors.totalCharges = 'Please enter valid total charges';
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
    resetLoading();

    try {
      // Stage 1: Validating
      nextStage();
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 2: Processing
      nextStage();
      await new Promise(resolve => setTimeout(resolve, 700));

      // Stage 3: Analyzing
      nextStage();
      
      // Simulate API call with more realistic prediction logic
      const age = parseInt(formData.age);
      const tenure = parseInt(formData.tenure);
      const monthlyCharges = parseFloat(formData.monthlyCharges);
      
      // Simple risk calculation based on form data
      let riskScore = 0;
      
      if (formData.contract === 'Month-to-month') riskScore += 30;
      if (monthlyCharges > 70) riskScore += 20;
      if (tenure < 12) riskScore += 25;
      if (formData.paymentMethod === 'Electronic check') riskScore += 15;
      if (formData.onlineSecurity === 'No') riskScore += 10;
      
      const churnProbability = Math.min(Math.max(riskScore + (Math.random() * 20 - 10), 5), 95);
      
      await new Promise(resolve => setTimeout(resolve, 700));

      // Stage 4: Complete
      completeLoading();
      
      const mockPrediction = {
        churnProbability,
        riskLevel: churnProbability > 70 ? 'High' : churnProbability > 40 ? 'Medium' : 'Low',
        confidence: 85 + Math.random() * 10,
        factors: [
          { name: 'Contract Type', impact: formData.contract === 'Month-to-month' ? 'High' : 'Low', value: formData.contract },
          { name: 'Monthly Charges', impact: monthlyCharges > 70 ? 'High' : 'Medium', value: `$${monthlyCharges}` },
          { name: 'Tenure', impact: tenure < 12 ? 'High' : 'Low', value: `${tenure} months` },
          { name: 'Payment Method', impact: formData.paymentMethod === 'Electronic check' ? 'Medium' : 'Low', value: formData.paymentMethod }
        ],
        recommendations: churnProbability > 50 ? 
          ['Consider offering loyalty incentives', 'Improve customer support', 'Upgrade contract terms'] :
          ['Monitor engagement', 'Maintain service quality', 'Regular check-ins']
      };
      
      setPrediction(mockPrediction);
      setLoading(false);
      markChartLoaded();
      
      // Scroll to results on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.querySelector('.prediction-results')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setLoading(false);
      resetLoading();
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Export functions
  const exportToPDF = async () => {
    if (!prediction) return;
    
    try {
      setLoading(true);
      
      const element = document.querySelector('.prediction-results');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: isDarkMode ? '#1a202c' : '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('Customer Churn Prediction Report', 20, 30);
      
      // Add date
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
      
      // Add prediction summary
      pdf.setFontSize(14);
      pdf.text(`Churn Probability: ${prediction.churnProbability.toFixed(1)}%`, 20, 55);
      pdf.text(`Risk Level: ${prediction.riskLevel}`, 20, 65);
      pdf.text(`Confidence: ${prediction.confidence.toFixed(1)}%`, 20, 75);
      
      // Add chart image
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 20, 85, imgWidth, imgHeight);
      
      // Add recommendations if high risk
      if (prediction.riskLevel === 'High') {
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.text('Recommended Actions:', 20, 30);
        
        pdf.setFontSize(12);
        const recommendations = [
          'Contact customer immediately for retention discussion',
          'Consider offering promotional discounts or upgrades',
          'Schedule personalized customer support session'
        ];
        
        recommendations.forEach((rec, index) => {
          pdf.text(`${index + 1}. ${rec}`, 25, 45 + (index * 10));
        });
      }
      
      pdf.save(`churn-prediction-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('PDF export failed:', error);
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
      ['Monthly Charges', formData.monthlyCharges],
      ['Total Charges', formData.totalCharges],
      ['Contract Type', formData.contract],
      ['Internet Service', formData.internetService],
      ['Payment Method', formData.paymentMethod],
      ['Gender', formData.gender],
      ['Partner', formData.partner],
      ['Dependents', formData.dependents],
      ['Phone Service', formData.phoneService],
      ['Online Security', formData.onlineSecurity],
      ['Online Backup', formData.onlineBackup],
      ['Tech Support', formData.techSupport],
      ['Streaming TV', formData.streamingTV],
      ['Streaming Movies', formData.streamingMovies],
      ['', ''],
      ['PREDICTION RESULTS', ''],
      ['Churn Probability (%)', prediction.churnProbability.toFixed(1)],
      ['Risk Level', prediction.riskLevel],
      ['Model Confidence (%)', prediction.confidence.toFixed(1)],
      ['', ''],
      ['RISK FACTORS', ''],
      ...prediction.factors.map(factor => [factor.name, `${factor.impact} (${factor.value})`])
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
        '#e3f2fd'
      ],
      borderColor: [
        prediction.churnProbability > 60 ? '#ff5252' : 
        prediction.churnProbability > 30 ? '#ffc107' : '#4caf50',
        '#90caf9'
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        prediction.churnProbability > 60 ? '#ff5252' : 
        prediction.churnProbability > 30 ? '#ffc107' : '#4caf50',
        '#bbdefb'
      ],
      hoverBorderWidth: 3
    }]
  } : null;

  const factorsData = prediction ? {
    labels: prediction.factors.map(factor => factor.name),
    datasets: [{
      label: 'Impact Score (%)',
      data: prediction.factors.map(factor => factor.impact),
      backgroundColor: prediction.factors.map(factor => 
        factor.impact > 70 ? '#ff6b6b' :
        factor.impact > 40 ? '#ffd43b' : '#51cf66'
      ),
      borderColor: prediction.factors.map(factor => 
        factor.impact > 70 ? '#ff5252' :
        factor.impact > 40 ? '#ffc107' : '#4caf50'
      ),
      borderWidth: 1,
      hoverBackgroundColor: prediction.factors.map(factor => 
        factor.impact > 70 ? '#ff5252' :
        factor.impact > 40 ? '#ffc107' : '#4caf50'
      ),
      hoverBorderWidth: 2
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
                      Age <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.age ? 'error' : ''}`}
                      placeholder="Enter age (18-100)"
                      min="18"
                      max="100"
                      required
                    />
                    {formErrors.age && <span className="error-text">{formErrors.age}</span>}
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
                  
                  <div className="form-group">
                    <label className="form-label">
                      Total Charges ($) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalCharges"
                      value={formData.totalCharges}
                      onChange={handleInputChange}
                      className={`form-control ${formErrors.totalCharges ? 'error' : ''}`}
                      placeholder="Enter total charges"
                      step="0.01"
                      min="0"
                      required
                    />
                    {formErrors.totalCharges && <span className="error-text">{formErrors.totalCharges}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                    <label className="form-label">Internet Service</label>
                    <select
                      name="internetService"
                      value={formData.internetService}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="DSL">DSL</option>
                      <option value="Fiber optic">Fiber optic</option>
                      <option value="No">No internet</option>
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
                    <label className="form-label">Partner</label>
                    <select
                      name="partner"
                      value={formData.partner}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Dependents</label>
                    <select
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Online Security</label>
                    <select
                      name="onlineSecurity"
                      value={formData.onlineSecurity}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Tech Support</label>
                    <select
                      name="techSupport"
                      value={formData.techSupport}
                      onChange={handleInputChange}
                      className="form-control form-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg prediction-btn"
                  disabled={loading || progressLoading}
                >
                  {loading || progressLoading ? (
                    <>
                      <LoadingSpinner 
                        variant="dots" 
                        size="small" 
                        inline 
                        color="primary"
                      />
                      <span className="loading-text">
                        {currentStage === 'validating' && 'Validating data...'}
                        {currentStage === 'processing' && 'Processing input...'}
                        {currentStage === 'analyzing' && 'Analyzing patterns...'}
                        {currentStage === 'complete' && 'Finalizing results...'}
                      </span>
                      <div className="loading-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${loadingProgress}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🔮</span>
                      <span>Predict Churn</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="results-section">
            {loading || progressLoading ? (
              <div className="prediction-results">
                <LoadingOverlay isVisible={true} backdrop={false}>
                  <SkeletonLoader variant="card" className="result-skeleton" />
                </LoadingOverlay>
                
                <div className="loading-stage-indicator">
                  <ProgressSpinner 
                    progress={loadingProgress} 
                    size="large"
                    showPercentage={true}
                  />
                  <div className="stage-text">
                    {currentStage === 'validating' && '🔍 Validating your data...'}
                    {currentStage === 'processing' && '⚙️ Processing information...'}
                    {currentStage === 'analyzing' && '🧠 Analyzing patterns...'}
                    {currentStage === 'complete' && '✨ Generating insights...'}
                  </div>
                </div>
              </div>
            ) : prediction ? (
              <div className="prediction-results" ref={chartRef}>
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
                    {isChartVisible ? (
                      <AnimatedChart 
                        type="doughnut"
                        data={probabilityData}
                        animate={true}
                        delay={300}
                        enableMobileGestures={true}
                        title="Churn Probability Distribution"
                        options={{
                          cutout: '60%',
                          plugins: {
                            legend: {
                              position: 'bottom'
                            }
                          }
                        }}
                      />
                    ) : (
                      <SkeletonLoader variant="chart" />
                    )}
                  </div>
                </div>

                <div className="card chart-card">
                  <h3>
                    <span className="chart-icon">📈</span>
                    Feature Impact Analysis
                  </h3>
                  <div className="chart-container">
                    {isChartVisible ? (
                      <AnimatedChart 
                        type="bar"
                        data={factorsData}
                        animate={true}
                        delay={600}
                        enableMobileGestures={true}
                        title="Risk Factors by Impact"
                      />
                    ) : (
                      <SkeletonLoader variant="chart" />
                    )}
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