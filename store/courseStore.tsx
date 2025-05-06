// // import { create } from 'zustand';
// // import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Course, ClassSchedule } from '@/types';
// import { mockCourses, mockClassSchedules } from '@/mocks/data';

// interface CourseState {
//   courses: Course[];
//   classSchedules: ClassSchedule[];
//   isLoading: boolean;
//   error: string | null;
  
//   // Actions
//   addCourse: (course: Omit<Course, 'id'>) => string;
//   updateCourse: (id: string, updates: Partial<Course>) => void;
//   deleteCourse: (id: string) => void;
  
//   addClassSchedule: (schedule: Omit<ClassSchedule, 'id'>) => void;
//   updateClassSchedule: (id: string, updates: Partial<ClassSchedule>) => void;
//   deleteClassSchedule: (id: string) => void;
  
//   getCourseById: (id: string) => Course | undefined;
//   getClassSchedulesByCourse: (courseId: string) => ClassSchedule[];
//   getClassSchedulesByDay: (day: number) => ClassSchedule[];
// }

// export const useCourseStore = create<CourseState>()(
//   persist(
//     (set, get) => ({
//       courses: mockCourses,
//       classSchedules: mockClassSchedules,
//       isLoading: false,
//       error: null,

//       addCourse: (course) => {
//         const id = Math.random().toString(36).substring(2, 10);
//         const newCourse: Course = {
//           ...course,
//           id,
//         };
//         set((state) => ({
//           courses: [...state.courses, newCourse],
//         }));
//         return id;
//       },

//       updateCourse: (id, updates) => {
//         set((state) => ({
//           courses: state.courses.map((course) =>
//             course.id === id ? { ...course, ...updates } : course
//           ),
//         }));
//       },

//       deleteCourse: (id) => {
//         set((state) => ({
//           courses: state.courses.filter((course) => course.id !== id),
//           // Also delete associated class schedules
//           classSchedules: state.classSchedules.filter(
//             (schedule) => schedule.courseId !== id
//           ),
//         }));
//       },

//       addClassSchedule: (schedule) => {
//         const newSchedule: ClassSchedule = {
//           ...schedule,
//           id: Math.random().toString(36).substring(2, 10),
//         };
//         set((state) => ({
//           classSchedules: [...state.classSchedules, newSchedule],
//         }));
//       },

//       updateClassSchedule: (id, updates) => {
//         set((state) => ({
//           classSchedules: state.classSchedules.map((schedule) =>
//             schedule.id === id ? { ...schedule, ...updates } : schedule
//           ),
//         }));
//       },

//       deleteClassSchedule: (id) => {
//         set((state) => ({
//           classSchedules: state.classSchedules.filter(
//             (schedule) => schedule.id !== id
//           ),
//         }));
//       },

//       getCourseById: (id) => {
//         return get().courses.find((course) => course.id === id);
//       },

//       getClassSchedulesByCourse: (courseId) => {
//         return get().classSchedules.filter(
//           (schedule) => schedule.courseId === courseId
//         );
//       },

//       getClassSchedulesByDay: (day) => {
//         return get().classSchedules.filter((schedule) => schedule.day === day);
//       },
//     }),
//     {
//       name: 'course-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );