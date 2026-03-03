import React, { useState } from 'react';

export default function MedicineReminder() {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');

  const addMedicine = () => {
    if (medicineName) {
      setMedicines([...medicines, { id: Date.now(), name: medicineName }]);
      setMedicineName('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Medicine Reminder</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          placeholder="Enter medicine name..."
          className="w-full border-2 border-gray-300 rounded p-3 mb-4 focus:outline-none focus:border-blue-500"
        />
        
        <button
          onClick={addMedicine}
          className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition"
        >
          Add Medicine
        </button>

        <div className="mt-8">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="bg-blue-50 p-4 rounded mb-3">
              <p className="font-bold text-blue-600">{medicine.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}