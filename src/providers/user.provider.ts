import { create } from 'zustand';
import { Task, User } from '../types/task.type';

interface TaskStoreProp {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<TaskStoreProp>((set) => ({
  user: null, 
  setUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
