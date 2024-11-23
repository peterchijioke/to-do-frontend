import { create } from 'zustand';
import {  User } from '../types/task.type';
import { persist } from 'zustand/middleware';

interface TaskStoreProp {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<TaskStoreProp>()(persist(
  (set) => ({
  user: null, 
  setUser: (user) => set(() => ({ user })),
})
  ,{
name:'user-storage'
}));

export default useUserStore;
