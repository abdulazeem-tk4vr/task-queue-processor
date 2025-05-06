export enum Status {
  pending = "PENDING",
  processing = " PROCESSING",
  completed = "COMPLETED",
  failed = "FAILED",
}

export interface Task {
  jobId: uuid;
  job: any;
  status: Status; // ENUM
  result: any;
}

export type uuid = string;
export const jobStore = new Map<uuid, Task>(); // maps a jobId to the entire job struct
export const jobQueue: Task[] = [];  // TODO : upgrade to a job Queue data strucuture 
