import { assets } from './assets/assets';
import Categories from './components/Categories';
import Footer from './components/Footer';
import Header from './components/Header';
import Location from './components/Location';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Review Our Portfolio',
      image: assets.Review_Our_Portfolio,
    },
    {
      id: 2,
      title: 'Note the Model No',
      image: assets.Note_the_Model_No,
    },
    {
      id: 3,
      title: 'Send via WhatsApp',
      image: assets.Send_us_the_model_numbers_and_quantity_via_WhatsApp,
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <Header />

      {/* About Us Section */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="about"
      >
        <div className="max-w-4xl text-left">
          {' '}
          {/* Changed from text-center to text-left */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            About Us
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            For over 20 years, Kobithan Garments (PVT) LTD has delivered premium
            apparel through exceptional craftsmanship, innovative design, and
            sustainable practices. We turn ideas into garments that inspire
            style and confidence with a blend of sophistication.
          </p>
          <button
            onClick={() => navigate('/about')}
            className="bg-customRed text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Discover Our Story</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Roadmap Section */}
      <section
        className="bg-gradient-to-r from-customRed/10 to-blue-100/50 py-16"
        id="roadmap"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-customRed mb-12">
            Life Journey of Your Apparel
          </h1>
          <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src={assets.ROAD_MAP}
              alt="Production Roadmap"
              className="w-full h-auto max-w-[850px] mx-auto"
            />
          </div>
        </div>
      </section>

      <Categories />

      {/* Order Placement Section */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 "
        id="placeorder"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-customRed mb-8">
            How to Place Your Order
          </h1>

          {/* Steps Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                  <img
                    src={step.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={step.title}
                  />
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-customRed text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Order Section */}
          <div className="bg-gradient-to-br from-customRed/5 to-blue-100/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
                  Custom Order Placement
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Send us a message through WhatsApp for personalized service.
                  Our representatives are available from 9 AM to 5 PM to assist
                  with your custom orders. We guarantee a response within 24
                  hours.
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={assets.whatsapp_logo}
                    className="w-8 h-8"
                    alt="WhatsApp"
                  />
                  <span className="text-lg font-semibold">Start Chat</span>
                </a>
              </div>
              <div className="mt-8 md:mt-0">
                <img
                  src={assets.custom_order}
                  alt="Custom Order"
                  className="w-64 h-64 object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Location />
      <Footer />
    </div>
  );
};

export default Home;
