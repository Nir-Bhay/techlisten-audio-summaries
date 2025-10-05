const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  templateId: {
    type: String,
    required: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  cssContent: {
    type: String,
    required: true
  },
  sections: [{
    id: String,
    type: String,
    title: String,
    content: mongoose.Schema.Types.Mixed,
    order: Number
  }],
  seoData: {
    title: String,
    description: String,
    keywords: [String]
  },
  publishedUrl: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  analytics: {
    views: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    averageTimeOnPage: { type: Number, default: 0 },
    bounceRate: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

portfolioSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
