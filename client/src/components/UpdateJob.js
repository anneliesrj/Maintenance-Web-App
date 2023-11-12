// client/src/components/UpdateJob.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/updateJob.css';

// Function for Update form
function UpdateJobForm({ jobData, onUpdate }) {
  const [job, setJob] = useState({
    name: jobData.name || '', 
    description: jobData.description || '',
    location: jobData.location || '',
    priority: jobData.priority || 'low', 
    status: jobData.status || 'submitted', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the job details
      const response = await axios.put(`http://localhost:5000/api/jobs/${jobData._id}`, job);
      console.log('Job updated:', response.data);
      // Call the onUpdate function to close the form and update the job list
      onUpdate();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    // Render update job form
    <div className="update-job-form">
      <h2>Update Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={job.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Priority:
          <select
            name="priority"
            value={job.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />

        <label>
          Status:
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
          >
            <option value="submitted">Submitted</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <br />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default UpdateJobForm;
