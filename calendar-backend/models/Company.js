const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedin: String,
  emails: [String],
  phoneNumbers: [String],
  comments: String,
  periodicity: String,
});

module.exports = mongoose.model('Company', companySchema);
