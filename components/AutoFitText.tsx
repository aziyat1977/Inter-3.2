import React from 'react';

interface AutoFitTextProps {
  children: React.ReactNode;
  maxSize?: string; // e.g., "15vw"
  className?: string;
  as?: React.ElementType;
}

const AutoFitText: React.FC<AutoFitTextProps> = ({ 
  children, 
  maxSize = "8vw", 
  className = "", 
  as: Component = "div" 
}) => {
  return (
    <Component 
      className={`font-display font-bold leading-none tracking-tight text-center w-full ${className}`}
      style={{ fontSize: `min(${maxSize}, 20vh)` }}
    >
      {children}
    </Component>
  );
};

export default AutoFitText;