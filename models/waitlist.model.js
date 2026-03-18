const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  plan: {
    type: String,
    enum: ['hobby', 'pro', 'enterprise'],
    default: 'hobby',
  },
  referredBy: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'invited', 'active'],
    default: 'pending',
  },
  invitedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Waitlist', waitlistSchema);
