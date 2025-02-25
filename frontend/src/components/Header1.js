import Navbar from './Navbar';

const Header = () => {
  return (
    <div
      className="min-h-[25vh] sm:min-h-[30vh] lg:min-h-[50vh] ipad:min-h-[30vh] mb-4 bg-customRed bg-cover bg-center flex flex-col items-center w-full overflow-hidden relative"
      style={{
        backgroundImage: "url('/FABRIC.png')",
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

      {/* Main content container */}
      <div className="relative z-0 container text-center mx-auto mt-20 md:px-20 lg:px-32 text-white">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[82px] whitespace-nowrap font-semibold pt-0">
          Welcome to <br /> Kobinthan Garments
        </h2>
      </div>
    </div>
  );
};

export default Header;
