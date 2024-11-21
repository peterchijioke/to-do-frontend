export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}


export type Tasks = Task[];

// User Type
export type User = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  uuid: string;
  username: string;
  email: string;

};

// Task Type
export type Task = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  uuid: string;
  status:TaskStatus;
  title: string;
  description: string;
  dueDate: string;
  creator: User;
};
