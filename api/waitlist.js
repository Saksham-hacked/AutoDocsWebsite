const express = require('express');
const router = express.Router();

// GET /api/waitlist — fetch all waitlist entries
router.get('/waitlist', async (req, res) => {
  try {
    const entries = await db.collection('waitlist').find().toArray();
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/waitlist — add email to waitlist
router.post('/waitlist', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    await db.collection('waitlist').insertOne({ email, createdAt: new Date() });
    res.status(201).json({ success: true, message: 'Added to waitlist' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/waitlist/:id — remove entry from waitlist
router.delete('/waitlist/:id', async (req, res) => {
  try {
    await db.collection('waitlist').deleteOne({ _id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
