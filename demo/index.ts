import express from "express";
import { successResponse } from "./responses";
import { v4 as uuidv4 } from "uuid";
import { jobQueue, jobStore, Status, Task } from "./jobIdentity";
import { processNewJob } from "./jobProcessor";
const app = express();
const port = 3000;

app.use(express.json());

app.post("/jobs", (req, res) => {
  const incomingJob = req.body.job;
  let newUUID = uuidv4();
  const newTask: Task = {
    job: incomingJob,
    jobId: newUUID,
    status: Status.pending,
    result: { value: null },
  };

  jobQueue.push(newTask);

  res
    .status(201)
    .json(
      successResponse("A job has been published with structure", { newTask })
    );
});

app.get("/jobs/:jobId", (req, res) => {
  const jobId = req.params.jobId; // this bydefault is a string
  const incomingTask: Task = jobStore.get(jobId);
  console.log("The incoming task is", incomingTask)
  return res.status(201).json(
    successResponse("A job has been requested and it's status is", {
      incomingTask,
    })
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function startProcessing() {
  while (true) {
    if (jobQueue.length > 0) {
      const incomingTask: Task = jobQueue.shift();
      incomingTask.status = Status.processing;
      jobStore.set(incomingTask.jobId, incomingTask);
      console.log("A The task is", jobStore[incomingTask.jobId] )
      jobStore[incomingTask.jobId] = processNewJob(incomingTask);
      console.log("B The task is", jobStore[incomingTask.jobId] )
    }

    // how does the processNewjob work when async/await is there, do we proceed to manual sleep now, or are we waiting for the worker thread

    await new Promise((resolve) => setTimeout(resolve, 20000)); // manual sleep
  }
}

startProcessing();
