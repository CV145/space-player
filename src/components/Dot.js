// Dot.js
import React, { useLayoutEffect, useRef } from 'react';
import '../styles/Dot.css';
import gsap from 'gsap';

function Dot({ x, y }) {
  const dotRef = useRef();

  useLayoutEffect(() => {
    let isAnimating = true;

    const animateDot = () => {
      if (!isAnimating) return;

      // Random values for animation
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;

      const animation = gsap.to(dotRef.current, {
        x: randomX, // Random X position
        y: randomY, // Random Y position
        ease: "none", // Easing function for smooth motion
        duration: 4, // Animation duration in seconds
        onComplete: () => {
          if (isAnimating) {
            animation.kill(); // Kill the current animation
            animateDot(); // Trigger a new animation when the current one completes
          }
        },
      });
    };

    // Start the initial animation
    animateDot();

    // Cleanup function to stop the animation
    return () => {
      isAnimating = false;
    };
  }, []);

  const dotStyle = {
    left: `${x}%`,
    top: `${y}%`,
  };

  return <div ref={dotRef} className="dot" style={dotStyle}></div>;
}

export default Dot;
