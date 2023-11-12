// client/src/components/ArchiveJob.js
import React from 'react';
import axios from 'axios';

const ArchiveJob = ({ jobId, onArchive }) => {
  const handleArchiveClick = async () => {
    try {
      // Send a request to archive the job by its ID
      await axios.put(`http://localhost:5000/api/jobs/archive/${jobId}`);

      // Notify the component that the job has been archived
      onArchive(jobId);
    } catch (error) {
      console.error('Error archiving job:', error);
    }
  };

  return (
    <div>
      <button onClick={handleArchiveClick}>Archive Job</button>
    </div>
  );
};

export default ArchiveJob;
