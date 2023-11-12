// client/src/components/JobList.js

import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const JobList = ({ jobList, onUpdateStatus }) => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  // Function to toggle selection of a job
  const toggleCheckbox = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  // Function to update the status of selected jobs
  const handleUpdateStatus = async (status) => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/update-status', {
        jobIds: selectedJobs,
        newStatus: status,
      });

      console.log(response.data.message);

      // Update the job list in the local state 
      const updatedJobList = jobList.map((job) => {
        if (selectedJobs.includes(job._id)) {
          return { ...job, status }; // Update the status of selected jobs
        }
        return job;
      });

      setSelectedJobs([]); // Clear the selection
      onUpdateStatus(updatedJobList); // Update the job list 
    } catch (error) {
      console.error('Error updating jobs:', error);
    }
  };

  // Function to archive selected jobs
  const handleArchiveJobs = async () => {
    try {
      for (const jobId of selectedJobs) {
        const response = await axios.post(`http://localhost:5000/api/jobs/archive/${jobId}`, {});
        console.log(response.data.message);
      }

      // Remove the archived jobs from the displayed job list
      const updatedJobList = jobList.filter((job) => !selectedJobs.includes(job._id));
      onUpdateStatus(updatedJobList);

      // Clear the selection
      setSelectedJobs([]);
    } catch (error) {
      console.error('Error archiving jobs:', error);
    }
  };

 // Function to filter jobs based on the selected filter
  const filteredJobList = () => {
    if (filter === 'all') {
      // Filter out archived jobs
      return jobList.filter((job) => job.status !== 'archived');
    } else if (filter === 'submitted') {
      return jobList.filter((job) => job.status === 'submitted');
    } else if (filter === 'inprogress') {
      return jobList.filter((job) => job.status === 'in progress');
    } else if (filter === 'completed') {
      return jobList.filter((job) => job.status === 'completed');
    } else if (filter === 'archived') {
      // Filter only archived jobs
      return jobList.filter((job) => job.status === 'archived');
    }
  };


  return (
    <div>
      <h2>Job List</h2>
      {/* Filter dropdown */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Jobs</option>
        <option value="submitted">Submitted</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="archived">Archived</option>
      </select>
      {/* Render job list in a table*/}
      <table className="job-table">
        <thead> 
          <tr>
            <th></th> {/* Empty header cell for checkboxes */}
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobList().map((job) => (
            <tr key={job._id}>
              <td>
                <input
                  type="checkbox"
                  value={job._id}
                  checked={selectedJobs.includes(job._id)}
                  onChange={() => toggleCheckbox(job._id)}
                />
              </td>
              <td>{job.name}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>{job.priority}</td>
              <td>{job.status}</td>
              <td>{new Date(job.dateSubmitted).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Status buttons */}
      <div>
        <button onClick={() => handleUpdateStatus('submitted')}>Set Submitted</button>
        <button onClick={() => handleUpdateStatus('in progress')}>Set In Progress</button>
        <button onClick={() => handleUpdateStatus('completed')}>Set Completed</button>
      </div>
  
      {/* Archive button */}
      <button onClick={handleArchiveJobs}>Archive</button>
    </div>
  );
  
};

JobList.propTypes = {
  jobList: PropTypes.array.isRequired,
  onUpdateStatus: PropTypes.func.isRequired, 
};

export default JobList;
