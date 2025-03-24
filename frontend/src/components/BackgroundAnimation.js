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
    const lineContainer = document.querySelector('.running-lines');

    // Create running lines (box shapes with animation)
    const createLine = () => {
      const line = document.createElement('div');
      line.classList.add('line');

      // Random position and speed for the running line
      const size = Math.random() * 100 + 50; // Random width for the box
      line.style.width = `${size}px`;

      // Position from top to create dynamic movement
      line.style.top = `${Math.random() * 100}vh`;

      // Random animation duration (speed)
      const animationDuration = Math.random() * 5 + 5; // between 5s and 10s
      line.style.animationDuration = `${animationDuration}s`;

      lineContainer.appendChild(line);

      // Remove line after animation
      setTimeout(() => {
        line.remove();
      }, animationDuration * 1000);
    };

    // Adjust frequency of line creation for small screens
    const intervalLines = setInterval(createLine, isSmallScreen ? 1500 : 800); // Longer interval for small screens

    return () => {
      clearInterval(intervalLines);
    };
  }, [isSmallScreen]);

  return (
    <div className="background">
      <div className="running-lines"></div>
      <div className="letters">KG</div>
    </div>
  );
};

export default BackgroundAnimation;
