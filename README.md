# Maintenance Management Web App with Full Stack Express & React

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Credits](#credits)

### Description
The Maintenance Management Web App, is an app for tracking and managing maintenance tasks. This full-stack application allows users to streamline their jobs, from submitting new jobs to updating job details, and even batch updating job statuses. Read on to discover the key features and instructions for deploying and using this powerful tool.

#### Key Features:
- **Job Submission:**
  Users can submit jobs with detailed information, including job description, location, and priority. Each job automatically receives a status, which can be one of the following: submitted, in progress, or completed.

- **Job Listing and Sorting:**
  View a list of all submitted jobs, conveniently ordered by status and date submitted. This feature provides a quick overview of the jobs.

- **Job Updates:**
  Easily update information about a single job as needed. Whether it's a change in description, location, or priority, the application supports updates to keep jobs up-to-date.

- **Batch Job Status Updates:**
  Manage multiple jobs by updating their statuses in batches. This feature enables users to streamline processes, saving time and ensuring that the application remains up-to-date with the latest job statuses.

- **Job Archiving:**
    Archive specific jobs to remove them from the active list while retaining essential information. Archiving provides a way to declutter the interface without losing valuable historical data.

- **Status Filtering:**
    Filter jobs based on their status to focus on specific tasks. This functionality allows users to view only the jobs that are submitted, in progress, or completed, facilitating targeted management.

### Installation

#### Install the React Frontend

To use the Frontend of this project, React needs to be installed. Follow these steps to install React:

1. Clone the repository: `git clone maintenance-app`
2. Navigate to the project directory: `cd maintenance-app`
3. Go to the client folder: `cd client` 
4. Install dependencies: `npm install`
5. Start the frontend: `npm start`

#### Backend Setup (Express, MongoDB, Mongoose)

Before you can use the backend of this project, you'll need to install Express and Mongoose. These are essential Node.js packages for creating a server and connecting to a MongoDB database. If you don't have them installed already, follow these steps:

1. Open your terminal or command prompt.
2. Make sure you're in the project's root directory, and then navigate to the `server` directory: `cd server`
3. Initialise a Node.js Project: `npm init -y`
4. Install Express and Mongoose: `npm install express mongoose`
5. Start the backend: `node app.js`

That's it. Now you're ready to use the Maintenance App

### Usage

When both the backend and frontend server are started, go to http://localhost:3000 to access the frontend. 

The frontend of the app provides a user-friendly interface where you can store all your jobs and keep track of them. 


### Credits
This app was developed by Annelies as part of the Full Stack Web & Software Engineer Bootcamp with HyperionDev. 
