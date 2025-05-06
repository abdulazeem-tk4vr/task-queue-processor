const { parentPort, workerData: task } = require("worker_threads");
parentPort.postMessage({ message: `hogaya for ${task.jobId}` });
