const express = require('express');
const router = express.Router();
const axios = require('axios');

// Find nearby hospitals
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Mock hospital data (replace with Google Maps API later)
    const hospitals = [
      {
        id: 1,
        name: 'City General Hospital',
        address: '123 Main Street',
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        distance: '0.5 km',
        rating: 4.5,
        phone: '+91-11-1234-5678',
        services: ['Emergency', 'ICU', 'Pediatrics'],
        isOpen: true
      },
      {
        id: 2,
        name: 'Medical Center',
        address: '456 Oak Avenue',
        lat: parseFloat(lat) + 0.01,
        lng: parseFloat(lng) + 0.01,
        distance: '1.2 km',
        rating: 4.2,
        phone: '+91-11-8765-4321',
        services: ['Emergency', 'Surgery'],
        isOpen: true
      }
    ];

    res.json({
      success: true,
      hospitals: hospitals
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search hospitals by name
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    res.json({
      success: true,
      results: [
        { id: 1, name: 'City Hospital', address: '123 Main St' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;