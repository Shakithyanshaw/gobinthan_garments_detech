import { assets } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation styles
import { Navigation } from 'swiper/modules';

const Categories = () => {
  const categories = [
    {
      name: 'Ladies Casual Wear',
      image: assets.Ladies_Casual_Wear,
      link: '/',
    },
    {
      name: 'Ladies Home Wear',
      image: assets.Ladies_Home_Wear,
      link: '/',
    },
    {
      name: 'Ladies Fashion Wear',
      image: assets.Ladies_Fashion_Wear,
      link: '/',
    },
    {
      name: 'Customizable tshirts',
      image: assets.Customizable_tshirts,
      link: '/',
    },
    {
      name: 'School Uniforms',
      image: assets.School_Uniforms,
      link: '/',
    },
    { name: 'Bed Clothes', image: assets.Bed_Clothes, link: '/' },
  ];

  return (
    <div
      className="container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
      id="categories"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-customRed text-center">
        Product Categories
      </h1>

      {/* Grid View for Larger Screens */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <a href={category.link} className="w-full">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-auto object-cover rounded-md mb-4 transform transition-transform duration-300 hover:scale-105"
              />
            </a>
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <a
                href={category.link}
                className="hover:text-customRed transition-colors duration-300 flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <span className="bg-customRed text-white p-0.5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 17l9-9m0 0H7m9 0v9"
                    />
                  </svg>
                </span>
              </a>
            </h2>
          </div>
        ))}
      </div>

      {/* Swiper View for Smaller Screens */}
      <div className="block md:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 }, // For screens >= 640px, show 2 slides
            1024: { slidesPerView: 3 }, // For screens >= 1024px, show 3 slides
            1440: { slidesPerView: 4 }, // For screens >= 1440px, show 4 slides
          }}
          className="w-full"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href={category.link} className="w-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-auto object-cover rounded-md mb-4 transform transition-transform duration-300 hover:scale-105"
                  />
                </a>
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                  <a
                    href={category.link}
                    className="hover:text-customRed transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>{category.name}</span>
                    <span className="bg-customRed text-white p-0.5 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 17l9-9m0 0H7m9 0v9"
                        />
                      </svg>
                    </span>
                  </a>
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
