const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  iconClass: { type: String, default: 'bx bx-folder' }
}, { timestamps: true });

module.exports = mongoose.model('Domain', domainSchema);
