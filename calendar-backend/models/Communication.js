const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  type: { type: String, required: true }, // e.g., Email, Call
  date: { type: Date, default: Date.now },
  notes: String,
});

module.exports = mongoose.model('Communication', communicationSchema);
