import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../contexts/ThemeContext';
import './AnimatedChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AnimatedChart = ({ 
  type, 
  data, 
  options = {}, 
  className = '', 
  animate = true,
  delay = 0,
  enableMobileGestures = true,
  title
}) => {
  const { isDarkMode } = useTheme();
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mobile gesture settings
  const minSwipeDistance = 50;
  const doubleTapDelay = 300;
  const lastTapRef = useRef(0);

  const getEnhancedOptions = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      animation: animate && isVisible ? {
        duration: 1200,
        delay: delay,
        easing: 'easeInOutCubic',
        onProgress: function(animation) {
          if (containerRef.current) {
            const progress = animation.currentStep / animation.numSteps;
            containerRef.current.style.setProperty('--chart-progress', progress);
          }
        },
        onComplete: function() {
          if (containerRef.current) {
            containerRef.current.classList.add('chart-loaded');
          }
          setTimeout(() => setIsLoading(false), 200);
        }
      } : false,
      plugins: {
        legend: {
          display: !isMobile || type !== 'bar',
          position: isMobile ? 'bottom' : 'top',
          labels: {
            color: isDarkMode ? '#ffffff' : '#212529',
            font: {
              size: isMobile ? 10 : 12,
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            },
            usePointStyle: true,
            padding: isMobile ? 10 : 20,
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
          titleColor: isDarkMode ? '#ffffff' : '#212529',
          bodyColor: isDarkMode ? '#b0b0b0' : '#6c757d',
          borderColor: isDarkMode ? '#404040' : '#dee2e6',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          titleFont: {
            size: isMobile ? 12 : 14,
            weight: '600'
          },
          bodyFont: {
            size: isMobile ? 11 : 12
          },
          padding: isMobile ? 8 : 12,
          caretPadding: 10,
          animation: {
            duration: 300
          },
          // Enhanced callbacks for mobile
          callbacks: {
            title: function(context) {
              return context[0].label || 'Data Point';
            },
            label: function(context) {
              const label = context.dataset.label || 'Value';
              const value = typeof context.raw === 'number' 
                ? context.raw.toLocaleString() 
                : context.raw;
              return `${label}: ${value}`;
            }
          }
        },
        title: title && {
          display: true,
          text: title,
          color: isDarkMode ? '#ffffff' : '#212529',
          font: {
            size: isMobile ? 14 : 16,
            weight: 600,
          },
          padding: {
            top: 10,
            bottom: isMobile ? 15 : 20,
          },
        },
      },
      scales: type === 'pie' || type === 'doughnut' ? undefined : {
        x: {
          ticks: {
            color: isDarkMode ? '#b0b0b0' : '#6c757d',
            font: {
              size: isMobile ? 10 : 12
            },
            maxRotation: isMobile ? 45 : 0
          },
          grid: {
            color: isDarkMode ? '#404040' : '#dee2e6',
            lineWidth: 1,
            drawBorder: false
          },
          border: {
            display: false
          }
        },
        y: {
          ticks: {
            color: isDarkMode ? '#b0b0b0' : '#6c757d',
            font: {
              size: isMobile ? 10 : 12
            },
            callback: function(value) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M';
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K';
              }
              return value;
            }
          },
          grid: {
            color: isDarkMode ? '#404040' : '#dee2e6',
            lineWidth: 1,
            drawBorder: false
          },
          border: {
            display: false
          }
        }
      },
      elements: {
        point: {
          radius: isMobile ? 3 : 4,
          hoverRadius: isMobile ? 5 : 6,
          hitRadius: isMobile ? 15 : 10, // Larger hit area for mobile
        },
        bar: {
          borderWidth: 0,
          borderSkipped: false,
          borderRadius: {
            topLeft: 4,
            topRight: 4
          }
        },
        arc: {
          borderWidth: 2,
          hoverBorderWidth: 3
        }
      },
      // Mobile-specific optimizations
      onHover: (event, elements) => {
        if (isMobile && elements.length > 0) {
          // Provide haptic feedback on mobile
          if (navigator.vibrate) {
            navigator.vibrate(5);
          }
        }
      },
    };

    return { ...baseOptions, ...options };
  }, [isDarkMode, type, animate, isVisible, delay, title, options]);

  // Touch gesture handlers
  const handleTouchStart = useCallback((e) => {
    if (!enableMobileGestures) return;
    
    setTouchEnd(null);
    if (e.touches.length === 1) {
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
        time: Date.now()
      });
      
      // Handle double tap detection
      const now = Date.now();
      const timeDiff = now - lastTapRef.current;
      
      if (timeDiff < doubleTapDelay && timeDiff > 0) {
        handleDoubleTap();
      }
      lastTapRef.current = now;
    }
  }, [enableMobileGestures, doubleTapDelay]);

  const handleTouchMove = useCallback((e) => {
    if (!enableMobileGestures || !touchStart) return;
    
    // Prevent default scrolling when interacting with chart
    if (e.touches.length === 1) {
      const currentTouch = e.touches[0];
      const deltaX = Math.abs(currentTouch.clientX - touchStart.x);
      const deltaY = Math.abs(currentTouch.clientY - touchStart.y);
      
      // If moving horizontally more than vertically, prevent scrolling
      if (deltaX > deltaY) {
        e.preventDefault();
      }
    }
  }, [enableMobileGestures, touchStart]);

  const handleTouchEnd = useCallback((e) => {
    if (!enableMobileGestures) return;
    
    if (!touchStart || !e.changedTouches[0]) return;
    
    setTouchEnd({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    });
  }, [enableMobileGestures, touchStart]);

  const handleDoubleTap = useCallback(() => {
    if (enableMobileGestures) {
      setIsZoomed(!isZoomed);
      setZoomLevel(isZoomed ? 1 : 1.5);
      
      if (navigator.vibrate) {
        navigator.vibrate([10, 50, 10]);
      }
    }
  }, [enableMobileGestures, isZoomed]);

  // Handle swipe gestures
  useEffect(() => {
    if (!touchStart || !touchEnd || !enableMobileGestures) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;
    const swipeTime = touchEnd.time - touchStart.time;

    // Only handle quick swipes (less than 500ms)
    if (swipeTime < 500 && swipeTime > 50) {
      if (isLeftSwipe || isRightSwipe || isUpSwipe || isDownSwipe) {
        // Provide haptic feedback for swipe
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
        
        // Could add swipe-based navigation between chart views here
        console.log('Chart swipe detected:', {
          left: isLeftSwipe,
          right: isRightSwipe,
          up: isUpSwipe,
          down: isDownSwipe
        });
      }
    }
  }, [touchStart, touchEnd, minSwipeDistance, enableMobileGestures]);

  const getEnhancedData = useCallback(() => {
    if (!data || !data.datasets) return data;

    const enhancedData = { ...data };
    enhancedData.datasets = data.datasets.map((dataset, index) => {
      const enhanced = { ...dataset };

      // Add hover animations
      enhanced.hoverBackgroundColor = enhanced.hoverBackgroundColor || enhanced.backgroundColor;
      enhanced.hoverBorderColor = enhanced.hoverBorderColor || enhanced.borderColor;
      
      return enhanced;
    });

    return enhancedData;
  }, [data]);

  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('chart-animate-in');
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const renderChart = () => {
    const enhancedOptions = getEnhancedOptions();
    const enhancedData = getEnhancedData();

    const props = {
      key: JSON.stringify(enhancedData),
      ref: chartRef,
      data: enhancedData,
      options: enhancedOptions,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    };

    switch (type) {
      case 'bar':
        return <Bar {...props} />;
      case 'line':
        return <Line {...props} />;
      case 'pie':
        return <Pie {...props} />;
      case 'doughnut':
        return <Doughnut {...props} />;
      default:
        return <Bar {...props} />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`animated-chart-container ${className} ${isVisible ? 'visible' : ''} ${isZoomed ? 'zoomed' : ''}`}
      style={{
        '--animation-delay': `${delay}ms`,
        transform: `scale(${zoomLevel})`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      {isLoading && isVisible && (
        <div className="chart-loading-overlay">
          <div className="chart-skeleton">
            <div className="skeleton-bars">
              {[...Array(5)].map((_, i) => (
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
          </div>
          <div className="loading-text">Loading chart...</div>
        </div>
      )}
      
      {renderChart()}
      
      {/* Mobile gesture controls and hints */}
      {enableMobileGestures && window.innerWidth <= 768 && (
        <div className="chart-mobile-controls">
          {isZoomed && (
            <button 
              className="zoom-reset-btn"
              onClick={handleDoubleTap}
              aria-label="Reset zoom"
            >
              🔍 Reset
            </button>
          )}
          <div className="gesture-hint">
            📱 Double tap to {isZoomed ? 'reset' : 'zoom'}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedChart;