import CartNavbar from './CartNavbar';
import fabricImage from '../assets/FABRIC.png';

const CardHeader = () => {
  return (
    <div
      className="min-h-[25vh] sm:min-h-[30vh] lg:min-h-[30vh] ipad:min-h-[30vh] mb-4 bg-customRed bg-cover bg-center flex flex-col items-center w-full overflow-hidden relative"
      style={{
        backgroundImage: `url(${fabricImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      id="Header"
    >
      {/* Navbar positioned at the top */}
      <div className="relative z-10 w-full mb-10">
        <CartNavbar />
      </div>
    </div>
  );
};

export default CardHeader;
