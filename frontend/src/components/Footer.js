import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="bg-white text-gray-900 pt-10 px-6 md:px-20 lg:px-32 overflow-hidden "
      id="footer"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
        {/* Navigation Links */}
        <div className="w-full md:w-1/3">
          <ul className="flex flex-col gap-3 text-gray-900">
            <Link to="/" className="hover:text-gray-500 font-bold">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-500 font-bold">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-gray-500 font-bold">
              Contact Us
            </Link>
            <Link to="/help" className="hover:text-gray-500 font-bold">
              Help
            </Link>
            <Link to="/products" className="hover:text-gray-500 font-bold">
              Products
            </Link>
            <Link to="/careers" className="hover:text-gray-500 font-bold">
              Careers
            </Link>
          </ul>
        </div>

        {/* Contact Information and Social Media */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between gap-2 mt-4 sm:mt-44">
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-500 transition duration-300 text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-500 transition duration-300 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-500 transition duration-300 text-2xl"
            >
              <FaInstagram />
            </a>
          </div>

          {/* mail Details */}
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-900 text-lg" />

            <a
              href="mailto:info@kobinthan.com"
              className="hover:underline hover:text-gray-500"
            >
              info@kobinthan.com
            </a>
          </div>

          {/* phone Details */}
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-900 text-lg" />

            <a
              href="tel:+1234567890"
              className="hover:underline hover:text-gray-500"
            >
              +123 456 7890
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-10 py-4 flex justify-between items-center text-sm">
        {/* Left Side: Copyright */}
        <p className="text-gray-900">
          © 2024 Kobinthan Garments (Pvt) Ltd. All rights reserved.
        </p>

        {/* Right Side: Links */}
        <div>
          <a
            href="/"
            className="hover:underline hover:text-gray-500 transition duration-300"
          >
            Privacy Policy
          </a>{' '}
          |{' '}
          <a
            href="/"
            className="hover:underline hover:text-gray-500 transition duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
