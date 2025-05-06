import { Task } from "./jobIdentity";


export function processNewJob(incomingTask: Task) : Task {
    // call the worker thread to return this result
    incomingTask.result = {value : "completed"}
    return incomingTask

    // then emit an event back to the main thread to update the value of jobStore
}