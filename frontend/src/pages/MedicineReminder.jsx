import React, { useState, useEffect } from 'react';
import { medicineAPI } from '../services/apiService';
import { auth } from '../services/firebaseService';

export default function MedicineReminder() {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load reminders when component mounts
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const response = await medicineAPI.getReminders(user.uid);
        setMedicines(response.data.reminders || []);
      }
    } catch (err) {
      console.error('Error loading reminders:', err);
    }
  };

  const addMedicine = async () => {
    if (!medicineName || !dosage || !frequency) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Please login first');
        return;
      }

      const response = await medicineAPI.addReminder({
        userId: user.uid,
        medicineName,
        dosage,
        frequency: frequency.split(',').map(f => f.trim()),
        startDate: new Date().toISOString(),
        endDate: null
      });

      // Clear form
      setMedicineName('');
      setDosage('');
      setFrequency('');

      // Reload reminders
      await loadReminders();
      alert('Medicine reminder added successfully!');
    } catch (err) {
      setError('Error adding medicine. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicine = async (reminderId) => {
    try {
      await medicineAPI.deleteReminder(reminderId);
      await loadReminders();
      alert('Medicine reminder deleted!');
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">💊 Medicine Reminder</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Add New Medicine</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Medicine Name</label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            placeholder="e.g., Aspirin"
            className="w-full border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Dosage</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 500mg"
            className="w-full border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Frequency (times per day, comma-separated)
          </label>
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g., 8:00 AM, 2:00 PM, 8:00 PM"
            className="w-full border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={addMedicine}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : '➕ Add Medicine'}
        </button>
      </div>

      {/* Reminders List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Your Reminders</h2>
        {medicines.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-600">No medicine reminders yet. Add one above!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {medicines.map((medicine) => (
              <div key={medicine.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{medicine.medicineName}</h3>
                    <p className="text-gray-600">Dosage: {medicine.dosage}</p>
                  </div>
                  <button
                    onClick={() => deleteMedicine(medicine.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-bold text-gray-700 mb-2">Times to take:</p>
                  {medicine.frequency && medicine.frequency.map((time, idx) => (
                    <p key={idx} className="text-gray-600">⏰ {time}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}