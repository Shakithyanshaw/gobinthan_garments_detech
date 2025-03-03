import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { Store } from '../Store';
import SearchBox from './SearchBox';
import { Badge, NavDropdown } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';

const CartNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const capitalize = (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="gap-2 container mx-auto flex justify-between items-center py-0 px-6 md:px-35 lg:px-40 bg-transparent">
        <Link to="/">
          <img
            src={assets.top_logo}
            alt="Logo"
            className="w-24 md:w-24"
            style={{ cursor: 'pointer' }} // Optional: Change cursor to pointer for better UX
          />
        </Link>

        <ul className="hidden md:flex gap-3 text-customRed bg-white px-6 py-2 rounded-full shadow-md">
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

        <div className="flex items-center gap-3 mt-3">
          <SearchBox />
          <Link
            to="/cart"
            className="nav-link relative flex items-center text-white"
          >
            <BsCart3 className="text-white text-lg mr-1" />{' '}
            {/* White trolley cart icon */}
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger" className="absolute bottom-3 left-5">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
          {userInfo ? (
            <NavDropdown
              title={<span className="text-white">{userInfo.name}</span>} // White text for dropdown title
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">
                <span className="text-gray">User Profile</span>{' '}
                {/* White text */}
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/orderhistory">
                <span className="text-gray">Order History</span>{' '}
                {/* White text */}
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="#signout"
                onClick={signoutHandler}
              >
                <span className="text-gray">Signout</span> {/* White text */}
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link text-white" to="/signin">
              <span className="text-white">Signin</span> {/* White text */}
            </Link>
          )}
        </div>

        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu}
          className="md:hidden w-6 cursor-pointer"
          alt="Menu"
        />
      </div>

      {showMobileMenu && (
        <div className="md:hidden fixed top-0 right-0 w-full h-full bg-gradient-to-b from-customRed to-white text-customRed transition-transform duration-500 translate-x-0 z-50">
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
                  className="px-6 py-3 rounded-full text-white bg-customRed shadow-lg hover:bg-red-500 hover:shadow-xl transition-all"
                >
                  {path === '/' ? 'Home' : capitalize(path.slice(1))}
                </Link>
              )
            )}
          </ul>

          <div className="flex flex-col items-center mt-12 gap-4">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
            {userInfo ? (
              <>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <Link to="/orderhistory" className="nav-link">
                  Order History
                </Link>
                <Link
                  to="#signout"
                  className="nav-link"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            )}
          </div>

          <div className="absolute bottom-6 flex justify-center w-full">
            <p className="text-sm text-gray-500">
              © 2024 Kobinthan Garments (Pvt) Ltd. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartNavbar;
