import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

interface AutoFitTextProps {
  children: React.ReactNode;
  maxSize?: string; // Optional CSS value (e.g. "200px") to cap the size
  minSize?: number; // Minimum font size in px
  className?: string;
  as?: React.ElementType;
  padding?: number; // Internal padding to account for
}

const AutoFitText: React.FC<AutoFitTextProps> = ({ 
  children, 
  maxSize, 
  minSize = 10,
  className = "", 
  as: Component = "div",
  padding = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(100); // Start large
  const [ready, setReady] = useState(false);

  // The "Algorithm": Resize logic
  const fitText = () => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const containerWidth = container.clientWidth - (padding * 2);
    const containerHeight = container.clientHeight - (padding * 2);
    
    // Safety check for invisible containers
    if (containerWidth <= 0 || containerHeight <= 0) return;

    // Binary search for optimal font size
    let min = minSize;
    let max = 500; // Unreasonable max
    let optimal = min;

    // Fast approximation
    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = `${mid}px`;
      
      if (text.scrollWidth <= containerWidth && text.scrollHeight <= containerHeight) {
        optimal = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    setFontSize(optimal);
    setReady(true);
  };

  useLayoutEffect(() => {
    fitText();
    // Resize observer to handle window resizing or layout shifts
    const observer = new ResizeObserver(() => {
      // Small debounce to prevent thrashing
      requestAnimationFrame(fitText);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [children, padding, minSize]);

  return (
    <Component 
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span 
        ref={textRef}
        style={{ 
          fontSize: `${fontSize}px`, 
          opacity: ready ? 1 : 0,
          whiteSpace: 'nowrap',
          lineHeight: 1.1,
          transition: 'opacity 0.2s ease-in'
        }}
        className="font-display font-bold tracking-tight text-center"
      >
        {children}
      </span>
    </Component>
  );
};

export default AutoFitText;