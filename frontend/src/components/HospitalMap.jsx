import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hospital icon
const hospitalIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNkYzI2MjYiIHJ4PSI4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSI+4pyqPC90ZXh0Pjwvc3ZnPg==',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// User location icon
const userIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxNiIgZmlsbD0iIzQyODVGNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iOCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// Map center component
function MapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], 13);
    }
  }, [center, map]);
  return null;
}

export default function HospitalMap({ hospitals, center }) {
  const defaultCenter = { lat: 28.7041, lng: 77.1025 };
  const mapCenter = center || defaultCenter;

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 h-96">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        {/* OpenStreetMap Tiles - COMPLETELY FREE */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* User Location */}
        {center && (
          <Marker position={[center.lat, center.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-bold">📍 Your Location</p>
                <p className="text-sm text-gray-600">
                  {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Hospital Markers */}
        {hospitals &&
          hospitals.map((hospital, idx) => (
            <Marker
              key={idx}
              position={[hospital.lat, hospital.lng]}
              icon={hospitalIcon}
            >
              <Popup>
                <div className="w-64">
                  <h3 className="font-bold text-lg text-blue-600 mb-2">
                    🏥 {hospital.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {hospital.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    ⭐ Rating: {hospital.rating}/5
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    📞 {hospital.phone}
                  </p>

                  {hospital.services && (
                    <div className="mb-3">
                      <p className="font-bold text-sm mb-1">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {hospital.services.map((service, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-bold text-center hover:bg-green-700"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://www.openstreetmap.org/directions?from=${center?.lat},${center?.lng}&to=${hospital.lat},${hospital.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold text-center hover:bg-blue-700"
                    >
                      🗺️ Route
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Map center component */}
        <MapCenter center={center} />
      </MapContainer>
    </div>
  );
}