const express = require('express');
const router = express.Router();

// GET /api/stats — get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const waitlistCount = await db.collection('waitlist').countDocuments();
    const activeUsers = await db.collection('waitlist').countDocuments({ status: 'active' });
    res.json({ success: true, data: { waitlistCount, activeUsers } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/stats/daily — get daily signups
router.get('/stats/daily', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await db.collection('waitlist').countDocuments({ createdAt: { $gte: today } });
    res.json({ success: true, data: { date: today, signups: count } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
