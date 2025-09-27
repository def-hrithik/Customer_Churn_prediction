import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ 
  variant = 'card', 
  count = 1, 
  className = '',
  width = '100%',
  height = 'auto',
  animation = true
}) => {
  const skeletons = Array(count).fill(0);

  const renderCardSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-text-group">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-short"></div>
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-button"></div>
        <div className="skeleton-button skeleton-secondary"></div>
      </div>
    </div>
  );

  const renderChartSkeleton = () => (
    <div className="skeleton-chart">
      <div className="skeleton-chart-header">
        <div className="skeleton-line skeleton-chart-title"></div>
      </div>
      <div className="skeleton-chart-body">
        <div className="skeleton-chart-bars">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="skeleton-bar"
              style={{ 
                height: `${Math.random() * 60 + 40}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        <div className="skeleton-chart-legend">
          <div className="skeleton-legend-item">
            <div className="skeleton-legend-color"></div>
            <div className="skeleton-line skeleton-legend-text"></div>
          </div>
          <div className="skeleton-legend-item">
            <div className="skeleton-legend-color"></div>
            <div className="skeleton-line skeleton-legend-text"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="skeleton-form">
      <div className="skeleton-form-group">
        <div className="skeleton-line skeleton-label"></div>
        <div className="skeleton-input"></div>
      </div>
      <div className="skeleton-form-row">
        <div className="skeleton-form-group">
          <div className="skeleton-line skeleton-label"></div>
          <div className="skeleton-input"></div>
        </div>
        <div className="skeleton-form-group">
          <div className="skeleton-line skeleton-label"></div>
          <div className="skeleton-input"></div>
        </div>
      </div>
      <div className="skeleton-form-group">
        <div className="skeleton-line skeleton-label"></div>
        <div className="skeleton-textarea"></div>
      </div>
      <div className="skeleton-form-actions">
        <div className="skeleton-button skeleton-primary"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-table-cell skeleton-table-header-cell"></div>
        ))}
      </div>
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {[...Array(4)].map((_, cellIndex) => (
            <div key={cellIndex} className="skeleton-table-cell">
              <div className="skeleton-line"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderListSkeleton = () => (
    <div className="skeleton-list">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-list-item">
          <div className="skeleton-avatar skeleton-small"></div>
          <div className="skeleton-list-content">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-subtitle"></div>
          </div>
          <div className="skeleton-list-actions">
            <div className="skeleton-icon"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTextSkeleton = () => (
    <div className="skeleton-text">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line skeleton-short"></div>
    </div>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return renderCardSkeleton();
      case 'chart':
        return renderChartSkeleton();
      case 'form':
        return renderFormSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'text':
        return renderTextSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div 
      className={`skeleton-container ${className} ${!animation ? 'no-animation' : ''}`}
      style={{ width, height }}
    >
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;