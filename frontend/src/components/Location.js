import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const locations = {
  'New York': { coordinates: [-74.006, 40.7128] },
  London: { coordinates: [-0.1278, 51.5074] },
  Tokyo: { coordinates: [139.6917, 35.6895] },
  India: { coordinates: [78.9629, 20.5937] },
  China: { coordinates: [104.1954, 35.8617] },
  Germany: { coordinates: [10.4515, 51.1657] },
};

const MapChart = ({ selectedLocation }) => {
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (selectedLocation && locations[selectedLocation]) {
      const [x, y] = locations[selectedLocation].coordinates;
      setCenter([x, y]);
      setZoom(4);
    }
  }, [selectedLocation]);

  return (
    <ComposableMap projection="geoMercator">
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>

        {Object.entries(locations).map(([name, { coordinates }]) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={6}
              fill="#FF5533"
              stroke="#FFF"
              strokeWidth={2}
              onClick={() => console.log('Clicked:', name)}
            />
            <text
              textAnchor="middle"
              y={-15}
              style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default function Location() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Keep your existing sidebar structure */}
      <div
        style={{ width: '250px', padding: '20px', backgroundColor: '#f8f8f8' }}
      >
        <h3>Customer Locations</h3>
        <ul>
          {['New York', 'London', 'Tokyo'].map((location) => (
            <li
              key={location}
              onClick={() => setSelectedLocation(location)}
              style={{
                cursor: 'pointer',
                padding: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              {location}
            </li>
          ))}
        </ul>

        <h3>Factory Locations</h3>
        <ul>
          {['India', 'China', 'Germany'].map((location) => (
            <li
              key={location}
              onClick={() => setSelectedLocation(location)}
              style={{
                cursor: 'pointer',
                padding: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              {location}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1 }}>
        <MapChart selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}
