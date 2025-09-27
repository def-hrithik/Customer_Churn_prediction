import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for progressive loading states
 * Provides better perceived performance with staged loading
 */
export const useProgressiveLoading = ({
  loadingStages = ['initial', 'loading', 'loaded'],
  stageDelays = [0, 500, 1000],
  autoProgress = true,
  onStageChange = null
} = {}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Calculate progress percentage
  useEffect(() => {
    const progress = (currentStage / (loadingStages.length - 1)) * 100;
    setLoadingProgress(progress);
    setIsLoading(currentStage < loadingStages.length - 1);
  }, [currentStage, loadingStages.length]);

  // Auto-progress through stages
  useEffect(() => {
    if (!autoProgress || currentStage >= loadingStages.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStage(prev => Math.min(prev + 1, loadingStages.length - 1));
    }, stageDelays[currentStage + 1] || 500);

    return () => clearTimeout(timer);
  }, [currentStage, loadingStages.length, stageDelays, autoProgress]);

  // Notify stage changes
  useEffect(() => {
    if (onStageChange && typeof onStageChange === 'function') {
      onStageChange(loadingStages[currentStage], currentStage, loadingProgress);
    }
  }, [currentStage, onStageChange, loadingStages, loadingProgress]);

  const nextStage = useCallback(() => {
    setCurrentStage(prev => Math.min(prev + 1, loadingStages.length - 1));
  }, [loadingStages.length]);

  const setStage = useCallback((stage) => {
    if (typeof stage === 'string') {
      const index = loadingStages.indexOf(stage);
      if (index !== -1) {
        setCurrentStage(index);
      }
    } else if (typeof stage === 'number') {
      setCurrentStage(Math.max(0, Math.min(stage, loadingStages.length - 1)));
    }
  }, [loadingStages]);

  const complete = useCallback(() => {
    setCurrentStage(loadingStages.length - 1);
    setIsLoading(false);
    setLoadingProgress(100);
  }, [loadingStages.length]);

  const reset = useCallback(() => {
    setCurrentStage(0);
    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);
  }, []);

  const setLoadingError = useCallback((errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  }, []);

  return {
    currentStage: loadingStages[currentStage],
    stageIndex: currentStage,
    isLoading,
    loadingProgress,
    error,
    nextStage,
    setStage,
    complete,
    reset,
    setError: setLoadingError,
    stages: loadingStages
  };
};

/**
 * Hook for lazy loading with intersection observer
 */
export const useLazyLoading = ({
  threshold = 0.1,
  rootMargin = '50px 0px',
  triggerOnce = true
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (triggerOnce) {
            observer.unobserve(elementRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(elementRef);

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [elementRef, threshold, rootMargin, triggerOnce]);

  const markAsLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return {
    elementRef: setElementRef,
    isVisible,
    isLoaded,
    markAsLoaded
  };
};

/**
 * Hook for preloading images with progress tracking
 */
export const useImagePreloader = (imageSources = []) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imageSources.length) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageSources.length;

    const updateProgress = () => {
      const currentProgress = (loadedCount / totalImages) * 100;
      setProgress(currentProgress);
      
      if (loadedCount === totalImages) {
        setIsLoading(false);
      }
    };

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
          loadedCount++;
          updateProgress();
          resolve(true);
        };
        
        img.onerror = () => {
          setFailedImages(prev => new Set([...prev, src]));
          loadedCount++;
          updateProgress();
          resolve(false);
        };
        
        img.src = src;
      });
    };

    // Preload all images
    Promise.all(imageSources.map(preloadImage))
      .then(() => {
        setIsLoading(false);
      });

  }, [imageSources]);

  return {
    loadedImages,
    failedImages,
    isLoading,
    progress,
    isImageLoaded: (src) => loadedImages.has(src),
    isImageFailed: (src) => failedImages.has(src)
  };
};

/**
 * Hook for data fetching with loading states
 */
export const useAsyncData = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies, retryCount]);

  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
    setRetryCount(0);
  }, []);

  return {
    data,
    isLoading,
    error,
    retry,
    reset,
    refetch: fetchData
  };
};