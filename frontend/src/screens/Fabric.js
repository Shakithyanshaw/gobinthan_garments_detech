import { assets } from '../assets/assets';
import Header1 from '../components/Header1';

const AboutUs = () => {
  return (
    <div className="w-full overflow-hidden">
      <Header1 />

      {/* Viscose Fabric */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="Viscose Fabric"
      >
        {/* Heading */}
        <div className="text-left lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Viscose Fabric
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              <span className="font-bold">Soft:</span> Viscose is soft to the
              touch and has a smooth feel. <br />
              <span className="font-bold">Breathable:</span> Viscose is
              breathable and doesn't trap body heat. <br />
              <span className="font-bold">Absorbent:</span> Viscose absorbs dye
              and retains colour well. <br />
              <span className="font-bold">Drapes well:</span> Viscose drapes
              well and can imitate the feel of silk, wool, cotton, and linen.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <img
              src={assets.FABRIC}
              alt="Export-Grade Stitching"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 100% Cotton Fabric  */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="100% Cotton Fabric"
      >
        {/* Heading (First Line, Centered) */}
        <div className="text-left lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            100% Cotton Fabric 
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start">
          {/* Text Content (Right Side on Large Screens) */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              <span className="font-bold">Breathable:</span> Allows air to pass
              through, keeping you comfortable. <br />
              <span className="font-bold">Soft:</span> Feels pleasant against
              the skin. <br />
              <span className="font-bold">Durable:</span> Can withstand many hot
              washes and repeated use. <br />
              <span className="font-bold">Hypoallergenic:</span> Ideal for
              people with allergies or sensitive skin. <br />
              <span className="font-bold">Absorbent:</span> Soaks up moisture,
              keeping you dry. <br />
              <span className="font-bold">Easy to clean:</span> Can be washed in
              the washing machine. <br />
              <span className="font-bold">Draping:</span> Adapts nicely to your
              body.
            </p>
          </div>

          {/* Image Section (Left Side on Large Screens) */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-start">
            <img
              src={assets.FABRIC}
              alt="Socks Manufacturing"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Polycotton Fabric */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="Polycotton Fabric "
      >
        {/* Heading */}
        <div className="text-left lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Polycotton Fabric 
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              <span className="font-bold">Durable:</span> The polyester in the
              blend makes the fabric durable and resistant to damage. <br />
              <span className="font-bold">Breathable:</span> The cotton in the
              blend makes the fabric breathable. <br />
              <span className="font-bold">Wrinkle resistant:</span> The
              polyester in the blend makes the fabric wrinkle resistant. <br />
              <span className="font-bold">Soft:</span> The cotton in the blend
              makes the fabric feel softer. <br />
              <span className="font-bold">Easy to wash:</span> The polyester in
              the blend makes the fabric easy to wash and fast to dry. <br />
              <span className="font-bold">Doesn’t hold odors:</span> Unlike
              polyester, polycotton fabric doesn’t hold odors.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <img
              src={assets.FABRIC}
              alt="Export-Grade Stitching"
              className="w-full max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/*  Polyester Fabric  */}
      <section
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        id="Polyester Fabric "
      >
        {/* Heading (First Line, Centered) */}
        <div className="text-left lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-customRed">
            Polyester Fabric 
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start">
          {/* Text Content (Right Side on Large Screens) */}
          <div className="lg:w-1/2 w-full text-left">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              <span className="font-bold">Durable:</span> Polyester is a strong,
              resilient, and abrasion-resistant fabric that doesn't tear,
              stretch, or pill easily. <br />
              <span className="font-bold">Wrinkle-resistant:</span> Polyester is
              less likely to wrinkle than other fabrics, so it doesn't need to
              be ironed as often. <br />
              <span className="font-bold">Dries quickly:</span> Polyester's
              hydrophobic properties allow it to dry quickly, retaining only
              0.4% moisture. <br />
              <span className="font-bold">Stain-resistant:</span> Polyester's
              moisture resistance makes it less likely to stain. <br />
              <span className="font-bold">UV resistant:</span> Polyester is
              resistant to UV rays. <br />
              <span className="font-bold">Can be recycled:</span> Polyester can
              be recycled.
            </p>
          </div>

          {/* Image Section (Left Side on Large Screens) */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-start">
            <img
              src={assets.FABRIC}
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
