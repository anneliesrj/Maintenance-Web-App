// client/src/App.js

import React, { useState, useEffect } from 'react';
import JobList from './components/JobList';
import OptionMenu from './components/OptionMenu';
import './styles/styles.css';

function App() {
  const [jobList, setJobList] = useState([]);

  // Function to update the job list
  const updateJobList = (newJob) => {
    setJobList([...jobList, newJob]);
  };

  useEffect(() => {
    // Fetch job data from the server
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobList(data);
        } else {
          console.error('Failed to fetch job data');
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs(); // Call the function to fetch job data
  }, []); 

  return (
    // Render menu and joblist
    <div className="App">
      <OptionMenu updateJobList={updateJobList} jobList={jobList} /> 
      <JobList jobList={jobList} onUpdateStatus={updateJobList} />
    </div>
  );
}

export default App;
