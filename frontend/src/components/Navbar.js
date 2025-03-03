import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  // Helper function to capitalize the first letter of each word
  const capitalize = (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="gap-2 container mx-auto flex justify-between items-center py-0 px-6 md:px-35 lg:px-40 bg-transparent">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.top_logo}
            alt="Logo"
            className="w-24 md:w-24"
            style={{ cursor: 'pointer' }} // Optional: Change cursor to pointer for better UX
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 text-customRed bg-white px-6 py-2 rounded-full shadow-md">
          {['/', '/about', '/contact', '/products', '/fabrics'].map(
            (path, index) => (
              <Link
                key={index}
                to={path}
                className={`cursor-pointer px-3 py-2 ${
                  location.pathname === path
                    ? 'bg-customRed text-white rounded-full'
                    : ''
                }`}
              >
                {path === '/' ? 'Home' : capitalize(path.slice(1))}
              </Link>
            )
          )}
        </ul>

        {/* Careers Button */}
        <button className="hidden md:block bg-white px-8 py-2 rounded-full">
          Careers
        </button>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu}
          className="md:hidden w-6 cursor-pointer"
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-full h-full bg-gradient-to-b from-customRed to-white text-customRed transition-transform duration-500 ${
          showMobileMenu ? 'translate-x-0 z-50' : 'translate-x-full z-[-1]'
        }`}
      >
        <div className="flex justify-between items-center p-6 py-0">
          <img src={assets.top_logo} alt="Logo" className="w-24" />
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross}
            className="w-8 cursor-pointer hover:scale-110 transition-transform"
            alt="Close"
          />
        </div>

        <ul className="flex flex-col items-center gap-6 mt-12 text-lg font-semibold">
          {['/', '/about', '/contact', '/products', '/fabrics'].map(
            (path, index) => (
              <Link
                key={index}
                to={path}
                onClick={() => setShowMobileMenu(false)}
                className={`px-6 py-3 rounded-full text-white bg-customRed shadow-lg hover:bg-red-500 hover:shadow-xl transition-all ${
                  location.pathname === path ? 'bg-red-600' : ''
                }`}
              >
                {path === '/' ? 'Home' : capitalize(path.slice(1))}
              </Link>
            )
          )}
          <a
            href="/career"
            onClick={() => setShowMobileMenu(false)}
            className="px-6 py-3 rounded-full text-white bg-customRed shadow-lg hover:bg-red-500 hover:shadow-xl transition-all"
          >
            Careers
          </a>
        </ul>

        <div className="absolute bottom-6 flex justify-center w-full">
          <p className="text-sm text-gray-500">
            © 2024 Kobinthan Garments (Pvt) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
