const express = require('express');
const router = express.Router();

// Add medicine reminder
router.post('/reminder', async (req, res) => {
  try {
    const { userId, medicineName, dosage, frequency, startDate, endDate } = req.body;

    if (!userId || !medicineName) {
      return res.status(400).json({ error: 'User ID and medicine name are required' });
    }

    const reminder = {
      id: Date.now().toString(),
      userId,
      medicineName,
      dosage,
      frequency,
      startDate,
      endDate,
      createdAt: new Date()
    };

    // TODO: Save to Firebase
    res.json({
      success: true,
      message: 'Reminder set successfully',
      reminder: reminder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user reminders
router.get('/reminders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // TODO: Fetch from Firebase
    res.json({
      success: true,
      reminders: [
        {
          id: '1',
          medicineName: 'Aspirin',
          dosage: '500mg',
          frequency: ['8:00 AM', '2:00 PM', '8:00 PM']
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update reminder
router.put('/reminder/:reminderId', async (req, res) => {
  try {
    const { reminderId } = req.params;
    const updates = req.body;

    // TODO: Update in Firebase
    res.json({
      success: true,
      message: 'Reminder updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete reminder
router.delete('/reminder/:reminderId', async (req, res) => {
  try {
    const { reminderId } = req.params;

    // TODO: Delete from Firebase
    res.json({
      success: true,
      message: 'Reminder deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;