// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Task, TaskPriority, TaskStatus, TaskCategory } from '@/types';
// import { mockTasks } from '@/mocks/data';

// interface TaskState {
//   tasks: Task[];
//   isLoading: boolean;
//   error: string | null;
  
//   // Actions
//   addTask: (task: Omit<Task, 'id'>) => void;
//   updateTask: (id: string, updates: Partial<Task>) => void;
//   deleteTask: (id: string) => void;
//   completeTask: (id: string) => void;
//   filterTasks: (filters: {
//     status?: TaskStatus;
//     priority?: TaskPriority;
//     category?: TaskCategory;
//     course?: string;
//     dueDate?: Date;
//   }) => Task[];
//   getTaskById: (id: string) => Task | undefined;
//   getTasksByCourse: (courseId: string) => Task[];
//   getUpcomingTasks: (days: number) => Task[];
//   getOverdueTasks: () => Task[];
// }

// export const useTaskStore = create<TaskState>()(
//   persist(
//     (set, get) => ({
//       tasks: mockTasks,
//       isLoading: false,
//       error: null,

//       addTask: (task) => {
//         const newTask: Task = {
//           ...task,
//           id: Math.random().toString(36).substring(2, 10),
//         };
//         set((state) => ({
//           tasks: [...state.tasks, newTask],
//         }));
//       },

//       updateTask: (id, updates) => {
//         set((state) => ({
//           tasks: state.tasks.map((task) =>
//             task.id === id ? { ...task, ...updates } : task
//           ),
//         }));
//       },

//       deleteTask: (id) => {
//         set((state) => ({
//           tasks: state.tasks.filter((task) => task.id !== id),
//         }));
//       },

//       completeTask: (id) => {
//         set((state) => ({
//           tasks: state.tasks.map((task) =>
//             task.id === id
//               ? { ...task, status: 'completed', actualTime: task.estimatedTime }
//               : task
//           ),
//         }));
//       },

//       filterTasks: (filters) => {
//         const { tasks } = get();
//         return tasks.filter((task) => {
//           let match = true;
          
//           if (filters.status && task.status !== filters.status) {
//             match = false;
//           }
          
//           if (filters.priority && task.priority !== filters.priority) {
//             match = false;
//           }
          
//           if (filters.category && task.category !== filters.category) {
//             match = false;
//           }
          
//           if (filters.course && task.course !== filters.course) {
//             match = false;
//           }
          
//           if (filters.dueDate) {
//             const taskDate = new Date(task.dueDate);
//             const filterDate = filters.dueDate;
            
//             if (
//               taskDate.getFullYear() !== filterDate.getFullYear() ||
//               taskDate.getMonth() !== filterDate.getMonth() ||
//               taskDate.getDate() !== filterDate.getDate()
//             ) {
//               match = false;
//             }
//           }
          
//           return match;
//         });
//       },

//       getTaskById: (id) => {
//         return get().tasks.find((task) => task.id === id);
//       },

//       getTasksByCourse: (courseId) => {
//         return get().tasks.filter((task) => task.course === courseId);
//       },

//       getUpcomingTasks: (days) => {
//         const now = new Date();
//         const future = new Date();
//         future.setDate(future.getDate() + days);
        
//         return get().tasks.filter((task) => {
//           const taskDate = new Date(task.dueDate);
//           return taskDate >= now && taskDate <= future && task.status !== 'completed';
//         });
//       },

//       getOverdueTasks: () => {
//         const now = new Date();
        
//         return get().tasks.filter((task) => {
//           const taskDate = new Date(task.dueDate);
//           return taskDate < now && task.status !== 'completed';
//         });
//       },
//     }),
//     {
//       name: 'task-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );