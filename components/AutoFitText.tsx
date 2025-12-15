import React, { useRef, useState, useLayoutEffect } from 'react';

interface AutoFitTextProps {
  children: React.ReactNode;
  maxSize?: string; // e.g. "15vw"
  minSize?: number; // px
  className?: string;
  as?: React.ElementType;
  padding?: number;
}

const AutoFitText: React.FC<AutoFitTextProps> = ({ 
  children, 
  maxSize, 
  minSize = 12,
  className = "", 
  as: Component = "div",
  padding = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(100);
  const [ready, setReady] = useState(false);

  const fitText = () => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Get dimensions. Fallback to offsetWidth if clientWidth is 0
    const w = container.clientWidth || container.offsetWidth;
    const h = container.clientHeight || container.offsetHeight;

    const containerWidth = w - (padding * 2);
    const containerHeight = h - (padding * 2);
    
    // If invisible or collapsed, don't calculate yet
    if (containerWidth <= 0 || containerHeight <= 0) return;

    let min = minSize;
    let max = 600; 
    let optimal = min;

    // Convert maxSize from vw/vh/px to number if possible for upper bound
    // (Skipped complex parsing for simplicity, relying on binary search)

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = `${mid}px`;
      
      // Allow slight tolerance
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
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(fitText);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [children, padding, minSize, maxSize]);

  // Apply maxSize via style on the text span to ensure it doesn't exceed visual design cap
  const maxFontSizeStyle = maxSize ? { fontSize: `min(${fontSize}px, ${maxSize})` } : { fontSize: `${fontSize}px` };

  return (
    <Component 
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span 
        ref={textRef}
        style={{ 
          ...maxFontSizeStyle,
          opacity: ready ? 1 : 0,
          whiteSpace: 'nowrap',
          lineHeight: 1.1,
          transition: 'opacity 0.2s ease-in'
        }}
        className="font-display font-bold tracking-tight text-center inline-block"
      >
        {children}
      </span>
    </Component>
  );
};

export default AutoFitText;