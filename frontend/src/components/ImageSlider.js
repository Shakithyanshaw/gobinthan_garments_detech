import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Ladies_Fashion_Wear from '../assets/Ladies_Fashion_Wear.png';
import Customizable_tshirts from '../assets/Customizable_tshirts.png';
import Ladies_Home_Wear from '../assets/Ladies_Home_Wear.png';
import School_Uniforms from '../assets/School_Uniforms.png';
import Bed_Clothes from '../assets/Bed_Clothes.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  });

  const images = [
    Ladies_Fashion_Wear,
    Customizable_tshirts,
    Ladies_Home_Wear,
    School_Uniforms,
    Bed_Clothes,
  ];

  const arcPositions = [
    { x: 0, y: -12, rotate: 0 }, // Central image (front)
    { x: -120, y: -4, rotate: -10 }, // Top-left image (behind central)
    { x: -230, y: 20, rotate: -20 }, // Bottom-left image (behind top-left)
    { x: 120, y: -4, rotate: 10 }, // Top-right image (behind central)
    { x: 230, y: 20, rotate: 20 }, // Bottom-right image (behind top-right)
  ];

  return (
    <div className="relative flex items-center justify-center h-[300px] w-full">
      {/* Image Container */}
      <div className="relative flex justify-center items-center w-full h-full">
        {images.map((image, index) => {
          const position =
            arcPositions[
              (index - currentIndex + images.length) % images.length
            ];
          return (
            <motion.img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="absolute rounded-t-[300px]"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
              animate={{
                x: position.x + '%',
                y: position.y + '%',
                rotate: position.rotate,
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.5 }}
              style={{
                width: '300px',
                height: '430px',
              }}
            />
          );
        })}
      </div>
      {/* Back Button */}
      <button
        className="absolute left-0 text-white bg-indigo-400 rounded-full p-2 z-1 flex items-center justify-center"
        onClick={handleBack}
      >
        <ChevronLeft size={24} />
      </button>
      {/* Next Button */}
      <button
        className="absolute right-0 text-white bg-indigo-400 rounded-full p-2 z-1 flex items-center justify-center"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageSlider;
