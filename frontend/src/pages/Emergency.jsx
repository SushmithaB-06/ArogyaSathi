import React from 'react';

export default function Emergency() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Emergency Help</h1>
      
      <div className="bg-red-50 rounded-lg shadow-lg p-8 text-center">
        <button className="bg-red-600 text-white px-8 py-6 rounded-full text-2xl font-bold hover:bg-red-700 transition mb-6">
          🆘 SOS - Call Ambulance
        </button>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Emergency Contacts</h3>
          <p className="text-gray-600 mb-3">🚑 Ambulance: 102</p>
          <p className="text-gray-600 mb-3">🚓 Police: 100</p>
          <p className="text-gray-600">📞 National Disaster Management: 1078</p>
        </div>
      </div>
    </div>
  );
}