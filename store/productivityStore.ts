// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ProductivityLog } from '@/types';
// import { mockProductivityLogs } from '@/mocks/data';

// interface ProductivityState {
//   logs: ProductivityLog[];
//   currentSession: {
//     startTime: string | null;
//     taskId: string | null;
//     isActive: boolean;
//   };
//   isLoading: boolean;
//   error: string | null;
  
//   // Actions
//   addLog: (log: Omit<ProductivityLog, 'id'>) => void;
//   updateLog: (id: string, updates: Partial<ProductivityLog>) => void;
//   deleteLog: (id: string) => void;
  
//   startStudySession: (taskId?: string) => void;
//   endStudySession: (notes?: string) => void;
//   pauseStudySession: () => void;
//   resumeStudySession: () => void;
  
//   getLogsByDateRange: (startDate: Date, endDate: Date) => ProductivityLog[];
//   getTotalStudyTime: (days: number) => number;
//   getAverageFocusScore: (days: number) => number;
//   getCompletedTasksCount: (days: number) => number;
// }

// export const useProductivityStore = create<ProductivityState>()(
//   persist(
//     (set, get) => ({
//       logs: mockProductivityLogs,
//       currentSession: {
//         startTime: null,
//         taskId: null,
//         isActive: false,
//       },
//       isLoading: false,
//       error: null,

//       addLog: (log) => {
//         const newLog: ProductivityLog = {
//           ...log,
//           id: Math.random().toString(36).substring(2, 10),
//         };
//         set((state) => ({
//           logs: [...state.logs, newLog],
//         }));
//       },

//       updateLog: (id, updates) => {
//         set((state) => ({
//           logs: state.logs.map((log) =>
//             log.id === id ? { ...log, ...updates } : log
//           ),
//         }));
//       },

//       deleteLog: (id) => {
//         set((state) => ({
//           logs: state.logs.filter((log) => log.id !== id),
//         }));
//       },

//       startStudySession: (taskId: string | undefined = undefined) => {
//         set({
//           currentSession: {
//             startTime: new Date().toISOString(),
//             taskId : taskId || null,  
//             isActive: true,
//           },
//         });
//       },

//       endStudySession: (notes = '') => {
//         const { currentSession, logs } = get();
        
//         if (currentSession.startTime) {
//           const startTime = new Date(currentSession.startTime);
//           const endTime = new Date();
//           const durationInMinutes = Math.round(
//             (endTime.getTime() - startTime.getTime()) / (1000 * 60)
//           );
          
//           // Find if there's already a log for today
//           const today = new Date();
//           today.setHours(0, 0, 0, 0);
          
//           const existingLogIndex = logs.findIndex((log) => {
//             const logDate = new Date(log.date);
//             logDate.setHours(0, 0, 0, 0);
//             return logDate.getTime() === today.getTime();
//           });
          
//           if (existingLogIndex >= 0) {
//             // Update existing log
//             const existingLog = logs[existingLogIndex];
//             set({
//               logs: logs.map((log, index) =>
//                 index === existingLogIndex
//                   ? {
//                       ...log,
//                       studyDuration: log.studyDuration + durationInMinutes,
//                       notes: log.notes
//                         ? `${log.notes}\n${notes}`
//                         : notes,
//                     }
//                   : log
//               ),
//               currentSession: {
//                 startTime: null,
//                 taskId: null,
//                 isActive: false,
//               },
//             });
//           } else {
//             // Create new log
//             const newLog: ProductivityLog = {
//               id: Math.random().toString(36).substring(2, 10),
//               date: today.toISOString(),
//               studyDuration: durationInMinutes,
//               tasksCompleted: 0,
//               notes,
//             };
            
//             set((state) => ({
//               logs: [...state.logs, newLog],
//               currentSession: {
//                 startTime: null,
//                 taskId: null,
//                 isActive: false,
//               },
//             }));
//           }
//         }
//       },

//       pauseStudySession: () => {
//         set((state) => ({
//           currentSession: {
//             ...state.currentSession,
//             isActive: false,
//           },
//         }));
//       },

//       resumeStudySession: () => {
//         set((state) => ({
//           currentSession: {
//             ...state.currentSession,
//             isActive: true,
//           },
//         }));
//       },

//       getLogsByDateRange: (startDate, endDate) => {
//         const { logs } = get();
//         const start = new Date(startDate);
//         start.setHours(0, 0, 0, 0);
//         const end = new Date(endDate);
//         end.setHours(23, 59, 59, 999);
        
//         return logs.filter((log) => {
//           const logDate = new Date(log.date);
//           return logDate >= start && logDate <= end;
//         });
//       },

//       getTotalStudyTime: (days) => {
//         const { logs } = get();
//         const now = new Date();
//         const past = new Date();
//         past.setDate(past.getDate() - days);
        
//         return logs
//           .filter((log) => {
//             const logDate = new Date(log.date);
//             return logDate >= past && logDate <= now;
//           })
//           .reduce((total, log) => total + log.studyDuration, 0);
//       },

//       getAverageFocusScore: (days) => {
//         const { logs } = get();
//         const now = new Date();
//         const past = new Date();
//         past.setDate(past.getDate() - days);
        
//         const filteredLogs = logs.filter((log) => {
//           const logDate = new Date(log.date);
//           return logDate >= past && logDate <= now && log.focusScore !== undefined;
//         });
        
//         if (filteredLogs.length === 0) return 0;
        
//         const totalScore = filteredLogs.reduce(
//           (total, log) => total + (log.focusScore || 0),
//           0
//         );
        
//         return Math.round(totalScore / filteredLogs.length);
//       },

//       getCompletedTasksCount: (days) => {
//         const { logs } = get();
//         const now = new Date();
//         const past = new Date();
//         past.setDate(past.getDate() - days);
        
//         return logs
//           .filter((log) => {
//             const logDate = new Date(log.date);
//             return logDate >= past && logDate <= now;
//           })
//           .reduce((total, log) => total + log.tasksCompleted, 0);
//       },
//     }),
//     {
//       name: 'productivity-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );