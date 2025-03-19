import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const location = useLocation();

  const capitalize = (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Update the screen size detection on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024); // Adjust 1024px breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'transparent',
        }}
      >
        <Link to="/">
          <img
            src={assets.top_logo}
            alt="Logo"
            style={{ width: '96px', cursor: 'pointer' }}
          />
        </Link>

        {/* Only show this on desktop screens */}
        {isDesktop && (
          <ul
            style={{
              display: 'flex',
              gap: '28px',
              backgroundColor: 'white',
              padding: '8px 24px',
              borderRadius: '999px',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            {['/', '/about', '/contact', '/products', '/fabrics'].map(
              (path, index) => (
                <Link
                  key={index}
                  to={path}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '999px',
                    color: location.pathname === path ? 'white' : '#801001',
                    backgroundColor:
                      location.pathname === path ? '#801001' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {path === '/' ? 'Home' : capitalize(path.slice(1))}
                </Link>
              )
            )}
          </ul>
        )}

        {/* Only show this on desktop screens */}
        {isDesktop && (
          <button
            style={{
              backgroundColor: 'white',
              padding: '8px 32px',
              borderRadius: '999px',
            }}
          >
            Careers
          </button>
        )}

        {/* Menu Icon for Mobile View */}
        {!isDesktop && (
          <img
            onClick={() => setShowMobileMenu(true)}
            src={assets.menu}
            style={{ width: '24px', cursor: 'pointer' }}
            alt="Menu"
          />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #801001, white)',
          color: '#801001',
          transform: showMobileMenu ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s ease-in-out',
          zIndex: showMobileMenu ? 50 : -1,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
          }}
        >
          <img src={assets.top_logo} alt="Logo" style={{ width: '96px' }} />
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross}
            style={{
              width: '32px',
              cursor: 'pointer',
              transform: 'scale(1.1)',
            }}
            alt="Close"
          />
        </div>

        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            marginTop: '48px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          {['/', '/about', '/contact', '/products', '/fabrics'].map(
            (path, index) => (
              <Link
                key={index}
                to={path}
                onClick={() => setShowMobileMenu(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '999px',
                  color: 'white',
                  backgroundColor:
                    location.pathname === path ? '#b22222' : '#801001',
                  textDecoration: 'none',
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                {path === '/' ? 'Home' : capitalize(path.slice(1))}
              </Link>
            )
          )}
          <a
            href="/career"
            onClick={() => setShowMobileMenu(false)}
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              color: 'white',
              backgroundColor: '#801001',
              textDecoration: 'none',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            Careers
          </a>
        </ul>

        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '14px', color: 'gray' }}>
            © 2024 Kobinthan Garments (Pvt) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
