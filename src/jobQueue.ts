import { Task } from "./jobDetails";

export class jobQueue {
  queue: Task[];
  length: number;

  constructor() {
    this.queue = [];
    this.length = -1;
  }

  enqueue(task: Task) {
    this.queue.push(task);
    this.length++;
  }

  dequeue(): Task {
    if (this.length == -1) return null;
    const element = this.queue[this.length];
    this.queue.pop();
    this.length--
    return element;
  }

  size(): number {
    return this.length + 1;
  }
}

export const jbQueue = new jobQueue();
