# Job Queue System

A TypeScript-based job queue system with asynchronous processing using Node.js worker threads. This application provides a simple REST API to submit jobs and check their status.

## Features

- REST API for job submission and status checking
- Asynchronous job processing using Node.js worker threads
- Job status tracking (pending, processing, completed, failed)
- In-memory job storage and queue implementation

## Project Structure

```
src/
  ├── index.ts      # Main application entry point and API server
  ├── jobDetails.ts # Job types, status enum, and storage
  ├── jobQueue.ts   # Queue implementation
  └── worker.js     # Worker thread implementation
```

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:

   ```
   git clone [<repository-url>](https://github.com/abdulazeem-tk4vr/task-queue-processor)
   cd job-queue-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode

To run the application in development mode with automatic restarts:

```
npm run start
```

### Production Mode

To build and run the application in production mode:

1. Build the TypeScript code:

   ```
   npm run prepare
   ```

2. Start the application:
   ```
   npm run start
   ```

## API Endpoints

### Submit a Job

```
POST /jobs?job=<job-description>
```

**Response:**

- Status: 200 OK
- Body: `Task created with id <job-id>`

### Check Job Status

```
GET /jobs/:jobId
```

**Response:**

- Status: 200 OK
- Body: `The status of the task with jobId <job-id> is <status>`
- Status codes: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`

## Configuration

The server runs on port 3000 by default. You can modify this in the `src/index.ts` file.

## Dependencies

- express: Web server framework
- uuid: For generating unique job IDs
- node:worker_threads: For asynchronous job processing

## Suggested Improvements

1. Persistent storage for jobs (currently in-memory only)
2. Better error handling and logging
3. Job prioritization
4. Job timeout and retry mechanisms
5. Add tests
6. Fix the LIFO behavior in the jobQueue implementation (currently dequeues from the end)
