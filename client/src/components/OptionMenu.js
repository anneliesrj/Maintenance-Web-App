//client/src/components/OptionMenu.js

import React, { useState } from 'react';
import AddJob from './AddJob'; 
import UpdateJobForm from './UpdateJob';

// State to track or store the adding job and updating job 
const OptionMenu = ({ updateJobList, jobList }) => {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);

  // Handle click event when button is clicked
  const handleAddJobClick = () => {
    setIsAddingJob(true);
    setIsUpdateDropdownOpen(false);
  };

  const handleUpdateJobClick = () => {
    setIsAddingJob(false);
    setIsUpdateDropdownOpen(!isUpdateDropdownOpen);
  };

  // Handle job selection from update dropdown
  const handleJobSelect = (jobId) => {
    const selectedJob = jobList.find((job) => job._id === jobId);
    setSelectedJob(selectedJob);
    setIsUpdateDropdownOpen(false); 
  };

  return (
<div className="option-menu-wrapper">
  <div className="option-menu">
    {/* Add Job button */}
    <button onClick={handleAddJobClick}>Add Job</button>

    {/* Update Job button */}
    <button onClick={handleUpdateJobClick}>Update Job</button>

    {/* Render AddJob component if isAddingJob is true */}
    {isAddingJob && <AddJob updateJobList={updateJobList} />}

    {/* Dropdown menu */}
    {isUpdateDropdownOpen && (
      <div className="update-dropdown">
        <select onChange={(e) => handleJobSelect(e.target.value)}>
          <option value="">Select a Job to Update</option>
          {jobList.map((job) => (
            <option key={job._id} value={job._id}>
              {job.name}
            </option>
          ))}
        </select>
      </div>
    )}

    {/* Render UpdateJobForm when a job is selected */}
    {selectedJob && <UpdateJobForm jobData={selectedJob} onUpdate={handleUpdateJobClick} />}
  </div>
</div>
  );
};

export default OptionMenu;
