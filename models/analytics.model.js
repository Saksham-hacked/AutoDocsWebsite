const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['page_view', 'waitlist_signup', 'pricing_view', 'cta_click'],
  },
  page: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: null,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
