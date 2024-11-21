import { Tasks, TaskStatus } from "../types/task.type";

export const dummyTasks: Tasks = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write detailed documentation for the new feature module.",
    status: TaskStatus.InProgress,
    createdAt: "2024-11-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Plan team meeting",
    description: "Schedule and prepare an agenda for the upcoming team meeting.",
    status: TaskStatus.Pending,
    createdAt: "2024-11-18T14:30:00Z",
  },
  {
    id: "3",
    title: "Update UI components",
    description: "Refactor existing UI components to improve responsiveness.",
    status: TaskStatus.Completed,
    createdAt: "2024-11-15T09:45:00Z",
  },
  
 
];
