const express = require('express');
const router = express.Router();

// GET /api/stats — get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const waitlistCount = await db.collection('waitlist').countDocuments();
    const activeUsers = await db.collection('waitlist').countDocuments({ status: 'active' });
    const invitedUsers = await db.collection('waitlist').countDocuments({ status: 'invited' });
    res.json({ success: true, data: { waitlistCount, activeUsers, invitedUsers } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/stats/daily — get daily signups for last 7 days
router.get('/stats/daily', async (req, res) => {
  try {
    const results = [];
    for (let i = 6; i >= 0; i--) {
      const start = new Date();
      start.setDate(start.getDate() - i);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);
      const count = await db.collection('waitlist').countDocuments({ createdAt: { $gte: start, $lte: end } });
      results.push({ date: start.toISOString().split('T')[0], signups: count });
    }
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/stats/sessions — get active session count
router.get('/stats/sessions', async (req, res) => {
  try {
    const timeout = parseInt(process.env.ANALYTICS_SESSION_TIMEOUT_MINS || '30');
    const since = new Date(Date.now() - timeout * 60 * 1000);
    const count = await db.collection('analytics').distinct('sessionId', { createdAt: { $gte: since } });
    res.json({ success: true, data: { activeSessions: count.length } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/stats/event — track an analytics event
router.post('/stats/event', async (req, res) => {
  const { event, page, userId, metadata } = req.body;
  if (!event || !page) return res.status(400).json({ error: 'event and page are required' });
  try {
    await db.collection('analytics').insertOne({ event, page, userId, metadata, createdAt: new Date() });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
