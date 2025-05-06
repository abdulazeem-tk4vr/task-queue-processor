type uuid = String;
export const jobStore = new Map<uuid, Task>();

export enum Status {
  pending = "PENDING",
  processing = "PROCESSING",
  done = "DONE",
  failed = "FAILED",
}

export interface Task {
  job: object;
  jobId: string;
  status: Status;
  result: object;
}
