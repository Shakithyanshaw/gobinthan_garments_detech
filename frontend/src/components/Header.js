import ImageSlider from './ImageSlider';
import Navbar from './Navbar';
import fabricImage from '../assets/FABRIC.png';

const Header = () => {
  return (
    <div
      className="min-h-[85vh] sm:min-h-[80vh] lg:min-h-[120vh] ipad:min-h-[80vh] mb-4 bg-customRed bg-cover bg-center flex flex-col items-center w-full overflow-hidden relative"
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
        <Navbar />
      </div>

      {/* ImageSlider at the bottom */}
      <div className="absolute bottom-0 w-full ">
        <ImageSlider />
      </div>

      {/* Main content container */}
      <div className="relative z-0 container text-center mx-auto mt-20 md:px-20 lg:px-32 text-white">
        <h2 className=" text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] whitespace-nowrap font-semibold pt-0">
          Welcome to <br /> Kobinthan Garments
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4">
          We deliver premium fabrics, timeless designs, and exceptional
          craftsmanship, offering both traditional and modern styles to boost
          your confidence and celebrate your unique look.
        </p>

        {/* Centering the button and adding a link */}
        <div className="flex justify-center mt-3">
          <a
            href="/about"
            className="bg-white text-customRed px-6 py-2 rounded-full border-none hover:bg-customRed hover:text-white transition-all duration-300 flex items-center space-x-2"
          >
            <span>New Collection</span>
            <span className="bg-customRed text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
