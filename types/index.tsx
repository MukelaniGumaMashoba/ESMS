export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskCategory = 'assignment' | 'exam' | 'reading' | 'project' | 'meeting' | 'class' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO date string
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  course?: string;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  reminder?: string; // ISO date string
}

export interface StudySession {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  location?: string;
  participants?: string[]; // array of participant names
  course?: string;
  tasks?: string[]; // array of task IDs
  isRecurring?: boolean;
  recurrencePattern?: string; // e.g., "weekly", "daily"
}

export interface Course {
  id: string;
  name: string;
  instructor?: string;
  color: string;
}

export interface ClassSchedule {
  id: string;
  courseId: string;
  day: number; // 0-6, where 0 is Sunday
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  location?: string;
  isRecurring: boolean;
}

export interface ProductivityLog {
  id: string;
  date: string; // ISO date string
  studyDuration: number; // in minutes
  tasksCompleted: number;
  focusScore?: number; // 0-100
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  location?: string;
  description?: string;
  isExternal?: boolean; // whether it's from an external calendar
  source?: string; // e.g., "google", "outlook"
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  settings: UserSettings;
}

export interface UserSettings {
  defaultReminderTime: number; // minutes before event
  defaultStudyDuration: number; // in minutes
  defaultCalendarView: 'day' | 'week' | 'month';
  theme: 'light' | 'dark' | 'system';
  connectedCalendars: {
    google?: boolean;
    outlook?: boolean;
  };
  notificationsEnabled: boolean;
}