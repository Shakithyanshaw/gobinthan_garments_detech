import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { Col, Row } from 'react-bootstrap';
import { FiHome, FiUser } from 'react-icons/fi';

const countryFlags = {
  UK: 'https://flagcdn.com/w40/gb.png',
  Switzerland: 'https://flagcdn.com/w40/ch.png',
  Canada: 'https://flagcdn.com/w40/ca.png',
};

const factoryLocations = [
  { id: 1, name: 'Thonikkal, Vavuniya', lat: 8.7513, lng: 80.497 },
  { id: 2, name: 'Nochchimottai, Vavuniya', lat: 8.7515, lng: 80.4975 },
];

const customerLocations = [
  { id: 3, name: 'London, UK', lat: 51.5074, lng: -0.1278, country: 'UK' },
  {
    id: 4,
    name: 'Switzerland',
    lat: 46.8182,
    lng: 8.2275,
    country: 'Switzerland',
  },
  {
    id: 5,
    name: 'Toronto, Canada',
    lat: 43.7001,
    lng: -79.4163,
    country: 'Canada',
  },
];

const Location = () => {
  const globeRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: location.lat, lng: location.lng, altitude: 2 },
        1500
      );
    }
  };

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().enableZoom = true;
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Global Presence
        </h1>

        <Row className="h-[calc(100vh-160px)] rounded-2xl overflow-hidden shadow-xl">
          {/* Left Panel - Locations List */}
          <Col md={4} className="bg-white p-6 border-r border-gray-200">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FiHome className="text-blue-600 mr-2 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Our Factories
                </h2>
              </div>
              <div className="space-y-2">
                {factoryLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
                      selectedLocation?.id === location.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-blue-50 border-2 border-transparent'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        selectedLocation?.id === location.id
                          ? 'bg-blue-600'
                          : 'bg-gray-400'
                      }`}
                    />
                    <span className="text-gray-700 font-medium">
                      {location.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center mb-4">
                <FiUser className="text-green-600 mr-2 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Customer Locations
                </h2>
              </div>
              <div className="space-y-2">
                {customerLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
                      selectedLocation?.id === location.id
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-50 hover:bg-green-50 border-2 border-transparent'
                    }`}
                  >
                    <img
                      src={countryFlags[location.country]}
                      alt={location.country}
                      className="w-8 h-5 object-cover rounded-sm mr-3 shadow-sm"
                    />
                    <span className="text-gray-700 font-medium">
                      {location.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Col>

          {/* Right Panel - Globe */}
          <Col
            md={8}
            className="bg-gray-900 p-0 relative flex justify-center items-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900/50" />
            <div className="relative flex justify-center items-center h-full w-full">
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                pointLat="lat"
                pointLng="lng"
                pointColor={(d) =>
                  selectedLocation?.id === d.id
                    ? '#ff0000'
                    : factoryLocations.some((f) => f.id === d.id)
                    ? '#3b82f6'
                    : '#10b981'
                }
                pointAltitude={(d) =>
                  selectedLocation?.id === d.id ? 0.4 : 0.1
                }
                pointRadius={(d) => (selectedLocation?.id === d.id ? 1.5 : 0.8)}
                labelsData={[...factoryLocations, ...customerLocations]}
                labelLat="lat"
                labelLng="lng"
                labelText="name"
                labelSize={1.2}
                labelColor={() => 'rgba(255, 255, 255, 0.75)'}
                labelResolution={2}
                labelDotRadius={0.5}
                labelDotOrientation={() => 'bottom'}
                atmosphereColor="rgba(100, 150, 255, 0.4)"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Location;
