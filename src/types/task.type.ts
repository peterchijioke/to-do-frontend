export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}

export interface Task {
   id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}
export type Tasks = Task[];