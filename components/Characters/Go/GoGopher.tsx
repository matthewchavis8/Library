'use client';

import React, { useState, useEffect } from 'react';

type Point = {
  x: number;
  y: number;
};

type EyePosition = {
  left: Point;
  right: Point;
};

const GoGopher = () => {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState<EyePosition>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const svgElement = document.getElementById('gopher-svg');
    if (!svgElement) {
      return;
    }

    const svgRect = svgElement.getBoundingClientRect();

    const getEyeCenter = (cx: number, cy: number): Point => ({
      x: svgRect.left + (cx / 360) * svgRect.width,
      y: svgRect.top + (cy / 400) * svgRect.height,
    });

    const leftEyeCenter = getEyeCenter(145, 130);
    const rightEyeCenter = getEyeCenter(215, 130);
    const maxDistance = 10;

    const calculateEyePosition = (eyeCenter: Point): Point => {
      const dx = mousePos.x - eyeCenter.x;
      const dy = mousePos.y - eyeCenter.y;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy), maxDistance);
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    };

    setEyePosition({
      left: calculateEyePosition(leftEyeCenter),
      right: calculateEyePosition(rightEyeCenter),
    });
  }, [mousePos]);

  return (
    <div className="w-14 h-14 flex items-center justify-center">
      <svg
        id="gopher-svg"
        viewBox="0 0 360 400"
        className="w-full h-full max-w-md"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Body */}
        <path
          d="M100 80 
             Q100 60 120 60 
             L240 60 
             Q260 60 260 80
             L260 280
             Q260 320 220 320
             L140 320
             Q100 320 100 280 Z"
          fill="#6AD7E5"
          stroke="#000"
          strokeWidth="3"
        />

        {/* Ears */}
        <circle cx="100" cy="100" r="20" fill="#6AD7E5" stroke="#000" strokeWidth="3" />
        <circle cx="260" cy="100" r="20" fill="#6AD7E5" stroke="#000" strokeWidth="3" />

        {/* Glasses */}
        <path
          d="M130 130 
               Q180 125 230 130"
          fill="none"
          stroke="#000"
          strokeWidth="3"
        />
        <circle cx="145" cy="130" r="25" fill="none" stroke="#000" strokeWidth="3" />
        <circle cx="215" cy="130" r="25" fill="none" stroke="#000" strokeWidth="3" />

        {/* Eyes */}
        <circle cx="145" cy="130" r="20" fill="white" />
        <circle cx="215" cy="130" r="20" fill="white" />

        {/* Pupils */}
        <circle
          cx={145 + eyePosition.left.x}
          cy={130 + eyePosition.left.y}
          r="8"
          fill="black"
        />
        <circle
          cx={215 + eyePosition.right.x}
          cy={130 + eyePosition.right.y}
          r="8"
          fill="black"
        />

        {/* Nose */}
        <ellipse cx="180" cy="160" rx="12" ry="8" fill="#FFB99C" stroke="#000" strokeWidth="2" />

        {/* Teeth */}
        <rect x="165" y="175" width="30" height="25" fill="#FFF" stroke="#000" strokeWidth="2" />
        <line x1="180" y1="175" x2="180" y2="200" stroke="#000" strokeWidth="2" />

        {/* Arms */}
        <rect x="90" y="180" width="20" height="40" rx="10" fill="#6AD7E5" stroke="#000" strokeWidth="3" />
        <rect x="250" y="180" width="20" height="40" rx="10" fill="#6AD7E5" stroke="#000" strokeWidth="3" />

        {/* Feet */}
        <rect x="140" y="310" width="30" height="20" rx="10" fill="#FFB99C" stroke="#000" strokeWidth="2" />
        <rect x="190" y="310" width="30" height="20" rx="10" fill="#FFB99C" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default GoGopher;
