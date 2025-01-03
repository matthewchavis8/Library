'use client';

import React, { useState, useEffect } from 'react';

const RustCrab = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 }});

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const leftEyeCenter = { x: 145, y: 160 };
    const rightEyeCenter = { x: 215, y: 160 };
    const maxDistance = 3;

    const calculateEyePosition = (eyeCenter: any) => {
      const angle = Math.atan2(mousePos.y - eyeCenter.y, mousePos.x - eyeCenter.x);
      return {
        x: Math.cos(angle) * maxDistance,
        y: Math.sin(angle) * maxDistance
      };
    };

    setEyePosition({
      left: calculateEyePosition(leftEyeCenter),
      right: calculateEyePosition(rightEyeCenter)
    });
  }, [mousePos]);

  return (
    <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Base image */}
      <div className="relative w-64 h-64">
        <img 
          src="/" 
          alt="Ferris base" 
          className="w-full h-full"
        />
        
        {/* Overlay for the tracking eyes */}
        <svg 
          viewBox="0 0 256 256" 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          {/* Pupils - Track mouse movement */}
          <circle 
            cx={98 + eyePosition.left.x} 
            cy={128 + eyePosition.left.y} 
            r="6" 
            fill="black" 
          />
          <circle 
            cx={158 + eyePosition.right.x} 
            cy={128 + eyePosition.right.y} 
            r="6" 
            fill="black" 
          />

          {/* Eye highlights */}
          <circle 
            cx={96 + eyePosition.left.x} 
            cy={126 + eyePosition.left.y} 
            r="2" 
            fill="white" 
          />
          <circle 
            cx={156 + eyePosition.right.x} 
            cy={126 + eyePosition.right.y} 
            r="2" 
            fill="white" 
          />
        </svg>
      </div>
    </div>
  );
};

export default RustCrab;