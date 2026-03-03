import React, { useState } from 'react';
import { hospitalAPI } from '../services/apiService';

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const findHospitals = async () => {
    setLoading(true);
    setError('');
    setHospitals([]);

    try {
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              // Call backend API
              const response = await hospitalAPI.findNearby(latitude, longitude, 5000);
              setHospitals(response.data.hospitals || []);
              setHasSearched(true);
            } catch (err) {
              setError('Error finding hospitals. Please try again.');
              console.error('Error:', err);
            } finally {
              setLoading(false);
            }
          },
          () => {
            setError('Unable to get your location. Please enable location access.');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
        setLoading(false);
      }
    } catch (err) {
      setError('Error: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Find Hospitals</h1>
      
      <button
        onClick={findHospitals}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50 mb-8"
      >
        {loading ? '⏳ Finding Hospitals...' : '📍 Find Nearby Hospitals'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {hasSearched && hospitals.length === 0 && !loading && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          No hospitals found in your area.
        </div>
      )}

      <div className="grid gap-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-blue-600">{hospital.name}</h3>
                <p className="text-gray-600">📍 {hospital.address}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{hospital.distance}</p>
                <p className="text-yellow-500">⭐ {hospital.rating}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline">{hospital.phone}</a>
            </p>

            <div className="mb-3">
              <p className="font-bold text-gray-700 mb-2">Services:</p>
              <div className="flex flex-wrap gap-2">
                {hospital.services && hospital.services.map((service, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`tel:${hospital.phone}`}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition text-center"
              >
                📞 Call Hospital
              </a>
              <button
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition"
              >
                🗺️ Get Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}