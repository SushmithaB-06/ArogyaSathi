const express = require('express');
const router = express.Router();

// Emergency SOS
router.post('/sos', async (req, res) => {
  try {
    const { userId, lat, lng, description } = req.body;

    if (!userId || !lat || !lng) {
      return res.status(400).json({ error: 'User ID and location are required' });
    }

    const sosAlert = {
      id: Date.now().toString(),
      userId,
      location: { lat, lng },
      description,
      timestamp: new Date(),
      status: 'active'
    };

    // TODO: Send to emergency services
    // TODO: Notify nearby hospitals
    // TODO: Save to Firebase

    res.json({
      success: true,
      message: 'Emergency alert sent',
      alert: sosAlert
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get emergency contacts
router.get('/contacts/:country', async (req, res) => {
  try {
    const { country } = req.params;

    const contacts = {
      india: {
        ambulance: '102',
        police: '100',
        disaster: '1078',
        healthline: '104'
      }
    };

    res.json({
      success: true,
      contacts: contacts[country.toLowerCase()] || contacts.india
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;