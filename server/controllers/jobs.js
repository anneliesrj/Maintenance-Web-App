// server/controllers/jobs.js

// Import necessary modules
const express = require('express');
const router = express.Router();
const Job = require('../models/job'); // Mongoose model

// Retrieve a job by ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ error: 'Error fetching job by ID', details: error.message });
  }
});

// Create a new job
router.post('/jobs', async (req, res) => {
  try {
    console.log('Received job data:', req.body);
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    console.log('Saved job:', savedJob);
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Error creating job', details: error.message });
  }
});

// Update a job
router.put('/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = req.body; 

    // Find the job by ID and update its properties
    const job = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' }); 
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Error updating job', details: error.message });
  }
});

// Archive a job
router.post('/jobs/archive/:id', async (req, res) => {
  const jobId = req.params.id;

  try {
    // Find the job by ID and update its status to "archived"
    const job = await Job.findByIdAndUpdate(jobId, { status: 'archived' }, { new: true });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job archived successfully' });
  } catch (error) {
    console.error('Error archiving job:', error);
    res.status(500).json({ error: 'Error archiving job' });
  }
});



// Update status of multiple jobs at once (batch update)
router.post('/jobs/update-status', async (req, res) => {
  console.log('Received update status request:', req.body);


  const { jobIds, newStatus } = req.body;

  try {
    // Validate the input
    if (!jobIds || !newStatus) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Update the status of the selected jobs in the database
    await Job.updateMany(
      { _id: { $in: jobIds } },
      { $set: { status: newStatus } }
    );

    res.status(200).json({ message: 'Jobs updated successfully' });
  } catch (error) {
    console.error('Error updating jobs:', error);
    res.status(500).json({ error: 'Error updating jobs' });
  }
});


// List all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ status: 1, dateSubmitted: -1 }); // Sort by status and date
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch jobs' });
  }
});


module.exports = router;
