const mongoose = require('mongoose');

const videoCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, required: true },
  iconClass: { type: String, default: 'bx bx-folder' }
}, { timestamps: true });

module.exports = mongoose.model('VideoCategory', videoCategorySchema);
