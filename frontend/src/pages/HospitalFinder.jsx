import React, { useState } from 'react';

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([]);

  const findHospitals = () => {
    // TODO: Call API with user location
    setHospitals([
      { id: 1, name: 'City Hospital', distance: '0.5 km', rating: 4.5 },
      { id: 2, name: 'Medical Center', distance: '1.2 km', rating: 4.2 },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Find Hospitals</h1>
      
      <button
        onClick={findHospitals}
        className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition mb-8"
      >
        📍 Find Nearby Hospitals
      </button>

      <div className="grid gap-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{hospital.name}</h3>
            <p className="text-gray-600 mb-2">Distance: {hospital.distance}</p>
            <p className="text-gray-600">Rating: ⭐ {hospital.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}