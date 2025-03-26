import { Task, StudySession, Course, ClassSchedule, ProductivityLog, CalendarEvent, User } from '@/types';
import { colors } from '@/constants/color';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Current date helpers
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

// Mock courses
export const mockCourses: Course[] = [
  { id: 'c1', name: 'Computer Science 101', instructor: 'Dr. Smith', color: colors.primary },
  { id: 'c2', name: 'Data Structures', instructor: 'Prof. Johnson', color: colors.secondary },
  { id: 'c3', name: 'Calculus II', instructor: 'Dr. Williams', color: colors.success },
  { id: 'c4', name: 'Physics 201', instructor: 'Prof. Brown', color: colors.warning },
  { id: 'c5', name: 'English Literature', instructor: 'Dr. Davis', color: colors.danger },
];

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Complete Programming Assignment',
    description: 'Implement a binary search tree in Java',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString(),
    priority: 'high',
    status: 'in-progress',
    category: 'assignment',
    course: 'c2',
    estimatedTime: 180,
  },
  {
    id: 't2',
    title: 'Read Chapter 5',
    description: 'Read and take notes on Chapter 5 of the textbook',
    dueDate: tomorrow.toISOString(),
    priority: 'medium',
    status: 'pending',
    category: 'reading',
    course: 'c1',
    estimatedTime: 60,
  },
  {
    id: 't3',
    title: 'Prepare for Midterm Exam',
    description: 'Review all lecture notes and practice problems',
    dueDate: nextWeek.toISOString(),
    priority: 'high',
    status: 'pending',
    category: 'exam',
    course: 'c3',
    estimatedTime: 240,
  },
  {
    id: 't4',
    title: 'Group Project Meeting',
    description: 'Meet with team to discuss project progress',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 0).toISOString(),
    priority: 'medium',
    status: 'pending',
    category: 'meeting',
    course: 'c4',
    estimatedTime: 60,
  },
  {
    id: 't5',
    title: 'Essay Draft',
    description: 'Complete first draft of essay on Shakespeare',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4).toISOString(),
    priority: 'medium',
    status: 'pending',
    category: 'assignment',
    course: 'c5',
    estimatedTime: 120,
  },
];

// Mock study sessions
export const mockStudySessions: StudySession[] = [
  {
    id: 's1',
    title: 'Group Study - Data Structures',
    description: 'Review linked lists and trees',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0).toISOString(),
    location: 'Library, Room 204',
    participants: ['Alex', 'Jamie', 'Taylor'],
    course: 'c2',
    tasks: ['t1'],
  },
  {
    id: 's2',
    title: 'Calculus Problem Set',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0).toISOString(),
    location: 'Student Center',
    course: 'c3',
    tasks: ['t3'],
  },
  {
    id: 's3',
    title: 'Physics Lab Prep',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 16, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 18, 0).toISOString(),
    location: 'Science Building, Lab 3',
    course: 'c4',
  },
];

// Mock class schedule
export const mockClassSchedules: ClassSchedule[] = [
  {
    id: 'cs1',
    courseId: 'c1',
    day: 1, // Monday
    startTime: '09:00',
    endTime: '10:30',
    location: 'Hall A, Room 101',
    isRecurring: true,
  },
  {
    id: 'cs2',
    courseId: 'c1',
    day: 3, // Wednesday
    startTime: '09:00',
    endTime: '10:30',
    location: 'Hall A, Room 101',
    isRecurring: true,
  },
  {
    id: 'cs3',
    courseId: 'c2',
    day: 1, // Monday
    startTime: '13:00',
    endTime: '14:30',
    location: 'Hall B, Room 203',
    isRecurring: true,
  },
  {
    id: 'cs4',
    courseId: 'c2',
    day: 3, // Wednesday
    startTime: '13:00',
    endTime: '14:30',
    location: 'Hall B, Room 203',
    isRecurring: true,
  },
  {
    id: 'cs5',
    courseId: 'c3',
    day: 2, // Tuesday
    startTime: '11:00',
    endTime: '12:30',
    location: 'Math Building, Room 305',
    isRecurring: true,
  },
  {
    id: 'cs6',
    courseId: 'c3',
    day: 4, // Thursday
    startTime: '11:00',
    endTime: '12:30',
    location: 'Math Building, Room 305',
    isRecurring: true,
  },
  {
    id: 'cs7',
    courseId: 'c4',
    day: 2, // Tuesday
    startTime: '14:00',
    endTime: '15:30',
    location: 'Science Building, Room 405',
    isRecurring: true,
  },
  {
    id: 'cs8',
    courseId: 'c4',
    day: 4, // Thursday
    startTime: '14:00',
    endTime: '15:30',
    location: 'Science Building, Room 405',
    isRecurring: true,
  },
  {
    id: 'cs9',
    courseId: 'c5',
    day: 1, // Monday
    startTime: '15:30',
    endTime: '17:00',
    location: 'Arts Building, Room 201',
    isRecurring: true,
  },
  {
    id: 'cs10',
    courseId: 'c5',
    day: 3, // Wednesday
    startTime: '15:30',
    endTime: '17:00',
    location: 'Arts Building, Room 201',
    isRecurring: true,
  },
];

// Mock productivity logs
export const mockProductivityLogs: ProductivityLog[] = [
  {
    id: 'p1',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString(),
    studyDuration: 120,
    tasksCompleted: 2,
    focusScore: 85,
  },
  {
    id: 'p2',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
    studyDuration: 90,
    tasksCompleted: 1,
    focusScore: 70,
  },
  {
    id: 'p3',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4).toISOString(),
    studyDuration: 180,
    tasksCompleted: 3,
    focusScore: 90,
  },
  {
    id: 'p4',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    studyDuration: 150,
    tasksCompleted: 2,
    focusScore: 80,
  },
  {
    id: 'p5',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    studyDuration: 210,
    tasksCompleted: 4,
    focusScore: 95,
  },
  {
    id: 'p6',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    studyDuration: 60,
    tasksCompleted: 1,
    focusScore: 65,
  },
  {
    id: 'p7',
    date: today.toISOString(),
    studyDuration: 30,
    tasksCompleted: 0,
    focusScore: 75,
  },
];

// Mock calendar events (including external ones)
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Computer Science Lecture',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30).toISOString(),
    location: 'Hall A, Room 101',
    color: mockCourses[0].color,
  },
  {
    id: 'e2',
    title: 'Data Structures Lab',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30).toISOString(),
    location: 'Hall B, Room 203',
    color: mockCourses[1].color,
  },
  {
    id: 'e3',
    title: 'Group Study Session',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0).toISOString(),
    location: 'Library, Room 204',
    color: mockCourses[1].color,
  },
  {
    id: 'e4',
    title: 'Dentist Appointment',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 0).toISOString(),
    location: 'Downtown Dental Clinic',
    isExternal: true,
    source: 'google',
    color: colors.info,
  },
  {
    id: 'e5',
    title: 'Calculus Lecture',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 30).toISOString(),
    location: 'Math Building, Room 305',
    color: mockCourses[2].color,
  },
  {
    id: 'e6',
    title: 'Physics Lab',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 30).toISOString(),
    location: 'Science Building, Room 405',
    color: mockCourses[3].color,
  },
  {
    id: 'e7',
    title: 'Club Meeting',
    startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 17, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 18, 30).toISOString(),
    location: 'Student Center, Room 102',
    isExternal: true,
    source: 'outlook',
    color: colors.warning,
  },
];

// Mock user
export const mockUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  settings: {
    defaultReminderTime: 30,
    defaultStudyDuration: 60,
    defaultCalendarView: 'week',
    theme: 'light',
    connectedCalendars: {
      google: true,
      outlook: true,
    },
    notificationsEnabled: true,
  },
};