const mongoose = require('mongoose');

// Define a Mongoose schema for the job model
const jobSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  priority: String,
  status: String,
  dateSubmitted: { type: Date, default: Date.now },
  archived: {
    type: Boolean,
    default: false,
  },
});

// Export the Mongoose model
module.exports = mongoose.model('Job', jobSchema);
