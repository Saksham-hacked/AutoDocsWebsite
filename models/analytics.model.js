const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['page_view', 'waitlist_signup', 'pricing_view', 'cta_click', 'plan_selected'],
  },
  page: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: null,
  },
  plan: {
  type: String,
  enum: ['hobby', 'pro', 'enterprise', null],
  default: null,
  },
  sessionId: {
    type: String,
    default: null,
  },
  ipAddress: {
    type: String,
    default: null,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, { timestamps: true });

analyticsSchema.index({ event: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
