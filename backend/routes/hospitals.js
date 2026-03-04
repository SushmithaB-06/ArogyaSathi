const express = require('express');
const router = express.Router();

// Mock hospital data - in real app, this would come from a database
const hospitalDatabase = [
  {
    id: 1,
    name: 'City General Hospital',
    address: '123 Main Street, Delhi',
    lat: 28.7041,
    lng: 77.1025,
    distance: '0.5 km',
    rating: 4.5,
    phone: '+91-11-1234-5678',
    services: ['Emergency', 'ICU', 'Pediatrics', 'Surgery'],
    isOpen: true
  },
  {
    id: 2,
    name: 'Max Healthcare',
    address: '456 Oak Avenue, Delhi',
    lat: 28.6139,
    lng: 77.2090,
    distance: '1.2 km',
    rating: 4.8,
    phone: '+91-11-8765-4321',
    services: ['Emergency', 'Surgery', 'Cardiology'],
    isOpen: true
  },
  {
    id: 3,
    name: 'Apollo Hospital',
    address: '789 Park Road, Delhi',
    lat: 28.5355,
    lng: 77.3910,
    distance: '2.1 km',
    rating: 4.7,
    phone: '+91-11-5555-6666',
    services: ['Emergency', 'ICU', 'Orthopedics'],
    isOpen: true
  },
  {
    id: 4,
    name: 'Fortis Healthcare',
    address: '321 Green Lane, Delhi',
    lat: 28.6292,
    lng: 77.2197,
    distance: '1.8 km',
    rating: 4.6,
    phone: '+91-11-9999-0000',
    services: ['Emergency', 'Neurology', 'Psychiatry'],
    isOpen: true
  },
  {
    id: 5,
    name: 'Delhi Medical Center',
    address: '654 Blue Street, Delhi',
    lat: 28.7589,
    lng: 77.2315,
    distance: '3.2 km',
    rating: 4.3,
    phone: '+91-11-4444-3333',
    services: ['General Medicine', 'Dentistry', 'Eye Care'],
    isOpen: true
  }
];

// Find nearby hospitals
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    console.log('Hospital Request:', { lat, lng, radius });

    // Validation
    if (!lat || !lng) {
      return res.status(400).json({ 
        success: false,
        error: 'Latitude and longitude are required' 
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Filter hospitals within radius
    const nearbyHospitals = hospitalDatabase
      .map(hospital => ({
        ...hospital,
        distanceInKm: calculateDistance(userLat, userLng, hospital.lat, hospital.lng)
      }))
      .filter(hospital => hospital.distanceInKm <= (radius / 1000))
      .sort((a, b) => a.distanceInKm - b.distanceInKm)
      .map(hospital => ({
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        lat: hospital.lat,
        lng: hospital.lng,
        distance: `${hospital.distanceInKm.toFixed(1)} km`,
        rating: hospital.rating,
        phone: hospital.phone,
        services: hospital.services,
        isOpen: hospital.isOpen
      }));

    console.log('Found hospitals:', nearbyHospitals.length);

    res.json({
      success: true,
      hospitals: nearbyHospitals,
      message: `Found ${nearbyHospitals.length} hospitals`
    });
  } catch (error) {
    console.error('Error in /nearby:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Search hospitals by name
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false,
        error: 'Search query is required' 
      });
    }

    const results = hospitalDatabase.filter(hospital =>
      hospital.name.toLowerCase().includes(query.toLowerCase()) ||
      hospital.address.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      results: results
    });
  } catch (error) {
    console.error('Error in /search:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Get all hospitals
router.get('/all', async (req, res) => {
  try {
    res.json({
      success: true,
      hospitals: hospitalDatabase
    });
  } catch (error) {
    console.error('Error in /all:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;