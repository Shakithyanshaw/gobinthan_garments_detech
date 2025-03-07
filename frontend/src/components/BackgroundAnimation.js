import React, { useEffect, useState } from 'react';
import './BackgroundAnimation.css'; // Import styles

const BackgroundAnimation = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size on mount and when resizing
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 480); // Consider screens 480px and below as small
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Update on resize

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const shapeContainer = document.querySelector('.animated-shapes');

    // Create floating shapes with more colors
    const createShape = () => {
      const shape = document.createElement('div');
      shape.classList.add('shape');

      // Random size
      const size = Math.random() * 100 + 30;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;

      // Random position
      shape.style.left = `${Math.random() * 100}vw`;
      shape.style.top = `${Math.random() * 100}vh`;

      // Random animation duration
      shape.style.animationDuration = `${Math.random() * 7 + 3}s`;

      // Random colors for variety
      const colors = [
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(255, 165, 0, 0.2)',
        'rgba(128, 0, 128, 0.2)',
      ];
      shape.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      shapeContainer.appendChild(shape);

      // Remove shape after animation
      setTimeout(() => {
        shape.remove();
      }, 12000);
    };

    // Adjust the frequency of shape creation for small screens
    const intervalShapes = setInterval(createShape, isSmallScreen ? 1200 : 700); // Longer interval for small screens

    return () => {
      clearInterval(intervalShapes);
    };
  }, [isSmallScreen]); // Rerun effect if screen size changes

  return (
    <div className="background">
      <div className="animated-shapes"></div>
      <div className="letters">KG</div>
    </div>
  );
};

export default BackgroundAnimation;
