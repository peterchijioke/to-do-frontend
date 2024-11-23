import { create } from 'zustand';
import { Task } from '../types/task.type';

interface TaskStoreProp {
  editableTask: Task | null;
  setEditableTask: (editableTask: Task | null) => void;
}

const useTaskStore = create<TaskStoreProp>((set) => ({
  editableTask: null, 
  setEditableTask: (editableTask) => set(() => ({ editableTask })),
}));

export default useTaskStore;
