import { assets } from '../assets/assets';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Header1 from '../components/Header1';

const AboutUs = () => {
  return (
    <div className="w-full overflow-hidden">
      <BackgroundAnimation />
      <Header1 />
      {/* Who we are */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="who we are"
      >
        <div className="w-full max-w-none text-left">
          {/* Changed from text-center to text-left */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Who We Are
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed w-full">
            We are Kobithan Garments (PVT) LTD, a company driven by pure
            commitment to deliver exceptional clothing combined with comfort,
            style, and quality along with consciousness of sustainable
            development. With each stitch, we bring our two decades of
            excellence, ensuring every piece tells its own story of elegance and
            durability.
          </p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed w-full">
            With over 20 years in the industry, Kobithan Garments (Pvt) Ltd
            specializes in child garments, ladies wear, and custom clothing.
            Serving Jaffna, Vavuniya, and Kilinochchi, we are known for quality,
            reliability, and personalized service. At Kobithan Garments, we
            create style and comfort you can trust.
          </p>
        </div>
      </section>

      {/* Founder and Managing Director */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="Founder and Managing Director"
      >
        <div className="w-full max-w-none text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Founder and Managing Director
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed w-full">
            Kohilathevi Asokumar, a BFA graduate of Jaffna University, Vavuniya
            Campus, is the visionary behind Kobithan Garments (Pvt) Ltd. A
            celebrated entrepreneur, she was honored as the Best Woman
            Entrepreneur of the Northern Province in 2022, 2018, and 2014, with
            11 other awards and recognitions showcasing her leadership and
            dedication to excellence.
          </p>
          {/* Embedded YouTube Video */}
          <div className="w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full pb-[56.25%]">
              {' '}
              {/* Maintains 16:9 Aspect Ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Founder Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/*  Our Capabilities */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id=" Our Capabilities"
      >
        <div className="w-full max-w-none text-left">
          {/* Changed from text-center to text-left */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Our Capabilities
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed w-full">
            As Kobithan Garments (PVT) LTD we pride ourselves on our ability to
            craft high- quality products with efficiency and precision. We
            employ our advanced technology techniques to craft products that
            exceed international quality benchmarks, ensuring reliability and
            style for global markets.
          </p>
        </div>
      </section>

      {/* Export-Grade Stitching */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="export-grade-stitching"
      >
        {/* Heading */}
        <div className="text-left lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Export-Grade Stitching
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our precision craftsmanship ensures every garment is stitched to
              perfection, meeting international quality standards and
              benchmarks. We produce export-grade garments designed for
              durability, style, and functionality with the leverage of advanced
              stitching techniques and machineries.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <img
              src={assets.ROAD_MAP}
              alt="Export-Grade Stitching"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Socks Manufacturing */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="socks-manufacturing"
      >
        {/* Heading (First Line, Centered) */}
        <div className="text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Socks Manufacturing
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start">
          {/* Text Content (Right Side on Large Screens) */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We specialize in crafting premium quality socks as per the
              international quality expectations. Using cutting-edge technology
              and high-performance materials, our socks are tailored for global
              appeal.
            </p>
          </div>

          {/* Image Section (Left Side on Large Screens) */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-start">
            <img
              src={assets.ROAD_MAP}
              alt="Socks Manufacturing"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Meet customer expectations within deadline */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="meet customer expectations within deadline"
      >
        {/* Heading */}
        <div className="text-left lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Meet customer expectations within deadline
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our production center in Vavuniya is capable of producing 15000
              units per month, full and fully crafted by female employees and a
              few specially abled employees which is proudly considered as a
              step towards a sustainable future as per SDG-10.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <img
              src={assets.ROAD_MAP}
              alt="Export-Grade Stitching"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/*  Embroidery Works */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id=" Embroidery Works"
      >
        {/* Heading (First Line, Centered) */}
        <div className="text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Embroidery Works
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start">
          {/* Text Content (Right Side on Large Screens) */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              At Kobithan Garments (Pvt) Ltd, we offer premium embroidery
              services using advanced multi-head machinery to deliver
              intricateand high-quality designs with precision. Our expertise
              covers a wide range of applications, including corporate branding
              personalized apparel, fashion embellishments, and home textiles.
              We work with diverse fabrics such as cotton, silk, denim, and
              more, ensuring durable and vibrant results using high-quality
              threads, including specialty and metallic options. Whether it’s
              small custom orders or large-scale productions, we provide fully
              customizable solutions with exceptional attention to detail,
              making us your trusted partner for all embroidery needs.
            </p>
          </div>

          {/* Image Section (Left Side on Large Screens) */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-start">
            <img
              src={assets.ROAD_MAP}
              alt="Socks Manufacturing"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
