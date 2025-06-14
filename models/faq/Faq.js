const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  section: String,
  q: String,
  a: String,
  type: {
    type: String,
    enum: ['conceptual', 'practical'],
    required: true,
    default: 'conceptual'
  }
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
