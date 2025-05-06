import { jobStore, Status, Task, uuid } from "./jobDetails";
import { v4 as uuidv4 } from "uuid";
import { jbQueue } from "./jobQueue";

const { Worker } = require("node:worker_threads");
const activeWorkers = new Map<string, Promise<any>>();

const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/jobs", (req, res) => {
  const incomingJob = req.query.job;
  const newTask: Task = {
    job: incomingJob,
    jobId: uuidv4(),
    status: Status.pending,
    result: null, // TODO : need to fill this up later and maybe make it look better so that it isnt empty
  };
  jbQueue.enqueue(newTask);
  res.status(200).send(`Task created with id ${newTask.jobId}`);
});

app.get("/jobs/:jobId", (req, res) => {
  const incomingJobId = req.params.jobId;

  if (incomingJobId == null || incomingJobId == undefined)
    return res.status(404).send("The incoming jobId is invalid");

  const fetchedTask: Task = jobStore.get(incomingJobId);

  const status: Status = fetchedTask.status;
  res
    .status(200)
    .send(`The status of the task with jobId ${incomingJobId} is ${status}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function runWorker(task: Task): Promise<any> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/worker.js", { workerData: task });

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  while (true) {
    if (jbQueue.size() > 0) {
      const consumerTask: Task = jbQueue.dequeue();
      const id: uuid = consumerTask.jobId;
      consumerTask.status = Status.processing;
      jobStore.set(id, consumerTask);
      // dedicate the task to a thread and start processing

      // Run worker but DO NOT await, fire and store
      const workerPromise = runWorker(consumerTask);
      activeWorkers.set(id, workerPromise);

      workerPromise
        .then((result) => {
          consumerTask.status = Status.completed;
          consumerTask.result = result;
          jobStore.set(id, consumerTask);

          activeWorkers.delete(id);
          console.log(`✅ Job ${id} completed`, result);
        })
        .catch((err) => {
          consumerTask.status = Status.failed;
          jobStore.set(id, consumerTask);

          activeWorkers.delete(id);
          console.log(`❌ Job ${id} failed`, err);
        });
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

main();
