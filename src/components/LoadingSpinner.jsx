import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  variant = 'default', 
  size = 'medium', 
  color = 'primary',
  text = '',
  className = '',
  inline = false
}) => {
  const sizeClass = `spinner-${size}`;
  const colorClass = `spinner-${color}`;
  const variantClass = `spinner-${variant}`;
  const containerClass = `spinner-container ${inline ? 'spinner-inline' : ''} ${className}`;

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`spinner-dots ${sizeClass} ${colorClass}`}>
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
          </div>
        );
      
      case 'bars':
        return (
          <div className={`spinner-bars ${sizeClass} ${colorClass}`}>
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
            <div className="bar bar4"></div>
            <div className="bar bar5"></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`spinner-pulse ${sizeClass} ${colorClass}`}>
            <div className="pulse-ring pulse-ring-1"></div>
            <div className="pulse-ring pulse-ring-2"></div>
            <div className="pulse-ring pulse-ring-3"></div>
          </div>
        );
      
      case 'wave':
        return (
          <div className={`spinner-wave ${sizeClass} ${colorClass}`}>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        );
      
      case 'orbit':
        return (
          <div className={`spinner-orbit ${sizeClass} ${colorClass}`}>
            <div className="orbit-center"></div>
            <div className="orbit-ring">
              <div className="orbit-dot"></div>
            </div>
          </div>
        );
      
      case 'gradient':
        return (
          <div className={`spinner-gradient ${sizeClass} ${colorClass}`}>
            <div className="gradient-ring"></div>
          </div>
        );
      
      case 'squares':
        return (
          <div className={`spinner-squares ${sizeClass} ${colorClass}`}>
            <div className="square square1"></div>
            <div className="square square2"></div>
            <div className="square square3"></div>
            <div className="square square4"></div>
          </div>
        );
      
      case 'chart':
        return (
          <div className={`spinner-chart ${sizeClass} ${colorClass}`}>
            <div className="chart-bar" style={{ animationDelay: '0s', height: '40%' }}></div>
            <div className="chart-bar" style={{ animationDelay: '0.1s', height: '60%' }}></div>
            <div className="chart-bar" style={{ animationDelay: '0.2s', height: '80%' }}></div>
            <div className="chart-bar" style={{ animationDelay: '0.3s', height: '50%' }}></div>
            <div className="chart-bar" style={{ animationDelay: '0.4s', height: '70%' }}></div>
          </div>
        );
      
      default:
        return (
          <div className={`spinner-default ${sizeClass} ${colorClass}`}>
            <div className="spinner-ring"></div>
          </div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {renderSpinner()}
      {text && (
        <div className="spinner-text">
          {text}
        </div>
      )}
    </div>
  );
};

// Progress spinner component
export const ProgressSpinner = ({ 
  progress = 0, 
  size = 'medium',
  color = 'primary',
  showPercentage = true,
  className = ''
}) => {
  const circumference = 2 * Math.PI * 45; // radius of 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`progress-spinner spinner-${size} spinner-${color} ${className}`}>
      <svg className="progress-ring" viewBox="0 0 100 100">
        <circle
          className="progress-ring-background"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          className="progress-ring-progress"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <div className="progress-percentage">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Loading overlay component
export const LoadingOverlay = ({ 
  isVisible = false, 
  children,
  spinner = 'default',
  text = 'Loading...',
  className = '',
  backdrop = true
}) => {
  if (!isVisible) return children;

  return (
    <div className="loading-overlay-container">
      {children}
      <div className={`loading-overlay ${backdrop ? 'with-backdrop' : ''} ${className}`}>
        <div className="loading-overlay-content">
          <LoadingSpinner 
            variant={spinner} 
            size="large" 
            text={text}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;