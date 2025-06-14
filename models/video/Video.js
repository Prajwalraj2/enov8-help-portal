const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoCategory', required: true },
  description: { type: String },
  order: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
