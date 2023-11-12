// client/src/components/AddJob.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addJob.css';

const AddJob = ({ updateJobList }) => {
  const [job, setJob] = useState({
    name: '',
    description: '',
    location: '',
    priority: 'low',
    status: 'submitted',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to backend to create a new job
      const response = await axios.post('http://localhost:5000/api/jobs', job);
      console.log('Job submitted:', response.data);
      // Clear the form
      setJob({
        name: '',
        description: '',
        location: '',
        priority: 'low',
        status: 'submitted',
      });
      // Update the job list by calling updateJobList function
      updateJobList(response.data);
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <div>
      <h2>Add a New Job</h2>
      {/* Render Add Job form */}
      <form onSubmit={handleSubmit} className="job-form">
        <div className='add-job-form'>
          <div>
          <label>Name:</label>
          <input type="text" name="name" value={job.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={job.description} onChange={handleChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={job.location} onChange={handleChange} />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={job.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={job.status} onChange={handleChange}>
            <option value="submitted">Submitted</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add Job</button>
         </div> 
      </form>
    </div>
  
  );
};

export default AddJob;
