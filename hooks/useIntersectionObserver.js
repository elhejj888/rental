// src/hooks/useIntersectionObserver.js
import { useState, useEffect } from 'react';

const useIntersectionObserver = (options) => {
  const [target, setTarget] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target, options]);

  return [setTarget, isIntersecting];
};

export default useIntersectionObserver;
