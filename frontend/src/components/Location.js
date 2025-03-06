import { useState, useCallback } from 'react';
import Globe from 'react-globe.gl';

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [pointsData, setPointsData] = useState([]);

  // Sample locations data
  const locations = [
    { name: 'Factory 1', lat: 51.5074, lng: -0.1278, type: 'factory' }, // London
    { name: 'Factory 2', lat: 40.7128, lng: -74.006, type: 'factory' }, // New York
    { name: 'Factory 3', lat: 35.6762, lng: 139.6503, type: 'factory' }, // Tokyo
    { name: 'Customer 1', lat: 48.8566, lng: 2.3522, type: 'customer' }, // Paris
    { name: 'Customer 2', lat: -33.8688, lng: 151.2093, type: 'customer' }, // Sydney
    { name: 'Customer 3', lat: -23.5505, lng: -46.6333, type: 'customer' }, // São Paulo
  ];

  const handleLocationClick = useCallback(
    (location) => {
      setSelectedLocation(location);
      // Add to points data if not already present
      if (!pointsData.find((point) => point.name === location.name)) {
        setPointsData((prev) => [...prev, location]);
      }
    },
    [pointsData]
  );

  return (
    <div
      className="container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
      id="placeorder"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-customRed text-left">
        Factory and Customers
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Locations List */}
        <div className="w-full lg:w-1/2">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-customRed">Factories</h2>
            {locations
              .filter((l) => l.type === 'factory')
              .map((location) => (
                <div
                  key={location.name}
                  onClick={() => handleLocationClick(location)}
                  className="p-3 mb-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
                >
                  {location.name}
                </div>
              ))}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-customRed">Customers</h2>
            {locations
              .filter((l) => l.type === 'customer')
              .map((location) => (
                <div
                  key={location.name}
                  onClick={() => handleLocationClick(location)}
                  className="p-3 mb-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
                >
                  {location.name}
                </div>
              ))}
          </div>
        </div>

        {/* Right Side - Globe */}
        <div className="w-full lg:w-1/2 h-96">
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            pointsData={pointsData}
            pointColor={(d) => (d.type === 'factory' ? '#ff0000' : '#00ff00')}
            pointLabel={(d) => `
              <b>${d.name}</b>
              <div>Lat: ${d.lat.toFixed(2)}°</div>
              <div>Lng: ${d.lng.toFixed(2)}°</div>
            `}
            pointRadius={0.5}
            onPointClick={setSelectedLocation}
            backgroundColor="rgba(0,0,0,0)"
            width={600}
            height={600}
            animateIn={false}
            cameraDistance={selectedLocation ? 2.5 : 1.5} // Adjust zoom level when a location is selected
            enableZoom={true}
            cameraPosition={
              selectedLocation
                ? {
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                    altitude: 2.5,
                  }
                : { lat: 0, lng: 0, altitude: 1.5 }
            } // Update camera position based on selected location
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
