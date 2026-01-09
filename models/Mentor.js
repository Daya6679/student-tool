const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mentor_id: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subjects: { type: String, required: true }
});

module.exports = mongoose.model('Mentor', mentorSchema);