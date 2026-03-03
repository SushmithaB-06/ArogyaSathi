import React, { useState, useEffect } from 'react';
import { emergencyAPI } from '../services/apiService';
import { auth } from '../services/firebaseService';

export default function Emergency() {
  const [contacts, setContacts] = useState(null);
  const [sosLoading, setSosLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEmergencyContacts();
  }, []);

  const loadEmergencyContacts = async () => {
    try {
      const response = await emergencyAPI.getContacts('india');
      setContacts(response.data.contacts);
    } catch (err) {
      console.error('Error loading contacts:', err);
    }
  };

  const sendSOS = async () => {
    setSosLoading(true);
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Please login first');
        setSosLoading(false);
        return;
      }

      // Get user location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            await emergencyAPI.sendSOS(
              user.uid,
              latitude,
              longitude,
              'Emergency SOS from ArogyaSathi app'
            );

            alert('🚑 Emergency alert sent! Ambulance is being contacted.');
            setSosLoading(false);
          } catch (err) {
            setError('Error sending SOS. Please try again.');
            setSosLoading(false);
          }
        },
        () => {
          setError('Unable to get your location. Please enable location access.');
          setSosLoading(false);
        }
      );
    } catch (err) {
      setError('Error: ' + err.message);
      setSosLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-red-600 mb-6">🆘 Emergency Help</h1>
      
      <div className="bg-red-50 rounded-lg shadow-lg p-8 text-center border-2 border-red-500 mb-8">
        <button
          onClick={sendSOS}
          disabled={sosLoading}
          className="bg-red-600 text-white px-12 py-8 rounded-full text-3xl font-bold hover:bg-red-700 transition mb-6 disabled:opacity-50 w-full"
        >
          {sosLoading ? '⏳ Sending...' : '🚑 SOS - CALL AMBULANCE NOW'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <p className="text-gray-600 text-lg">
          ⚠️ Click the button above to send an emergency alert immediately
        </p>
      </div>

      {/* Emergency Contacts */}
      {contacts && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Emergency Contacts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded border-l-4 border-red-500">
              <p className="text-red-600 font-bold text-xl mb-2">🚑 Ambulance</p>
              <p className="text-3xl font-bold text-red-600">
                <a href={`tel:${contacts.ambulance}`} className="hover:underline">
                  {contacts.ambulance}
                </a>
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-500">
              <p className="text-blue-600 font-bold text-xl mb-2">🚓 Police</p>
              <p className="text-3xl font-bold text-blue-600">
                <a href={`tel:${contacts.police}`} className="hover:underline">
                  {contacts.police}
                </a>
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-500">
              <p className="text-yellow-600 font-bold text-xl mb-2">🌍 Disaster Management</p>
              <p className="text-3xl font-bold text-yellow-600">
                <a href={`tel:${contacts.disaster}`} className="hover:underline">
                  {contacts.disaster}
                </a>
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded border-l-4 border-green-500">
              <p className="text-green-600 font-bold text-xl mb-2">☎️ Health Helpline</p>
              <p className="text-3xl font-bold text-green-600">
                <a href={`tel:${contacts.healthline}`} className="hover:underline">
                  {contacts.healthline}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded">
            <p className="text-gray-700">
              <strong>💡 Tip:</strong> All numbers are clickable. Just click to call directly from your phone.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}