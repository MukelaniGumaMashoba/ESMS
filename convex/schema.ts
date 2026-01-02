import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    role: v.union(v.literal("student"), v.literal("instructor"), v.literal("admin")),
    tokenIdentifier: v.string(), // For Convex auth
    password: v.optional(v.string()), // TODO: Remove in production, use proper auth provider
    createdAt: v.number(),
    updatedAt: v.number(),
    settings: v.optional(v.object({
      defaultReminderTime: v.optional(v.number()),
      defaultStudyDuration: v.optional(v.number()),
      defaultCalendarView: v.optional(v.union(v.literal("day"), v.literal("week"), v.literal("month"))),
      theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
      notificationsEnabled: v.optional(v.boolean()),
    })),
  })
    .index("by_email", ["email"])
    .index("by_token", ["tokenIdentifier"]),

  courses: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    instructorId: v.id("users"),
    category: v.string(), // e.g., "Commerce", "Science", "General", "Life Science"
    color: v.string(),
    thumbnail: v.optional(v.string()), // UploadThing URL
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    enrolledStudents: v.array(v.id("users")),
  })
    .index("by_instructor", ["instructorId"])
    .index("by_category", ["category"])
    .index("by_published", ["isPublished"]),

  videos: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    youtubeVideoId: v.string(),
    thumbnail: v.optional(v.string()),
    duration: v.optional(v.number()), // in seconds
    order: v.number(), // for ordering within course
    isEducational: v.boolean(), // filtered to be educational
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    views: v.number(),
    likes: v.number(),
  })
    .index("by_course", ["courseId"])
    .index("by_educational", ["isEducational"]),

  tasks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(), // timestamp
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    status: v.union(v.literal("pending"), v.literal("in-progress"), v.literal("completed")),
    category: v.union(
      v.literal("assignment"),
      v.literal("exam"),
      v.literal("reading"),
      v.literal("project"),
      v.literal("meeting"),
      v.literal("class"),
      v.literal("other")
    ),
    courseId: v.optional(v.id("courses")),
    estimatedTime: v.optional(v.number()),
    actualTime: v.optional(v.number()),
    reminder: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_status", ["status"])
    .index("by_due_date", ["dueDate"]),

  classSchedules: defineTable({
    courseId: v.id("courses"),
    day: v.number(), // 0-6, where 0 is Sunday
    startTime: v.string(), // HH:MM format
    endTime: v.string(), // HH:MM format
    location: v.optional(v.string()),
    isRecurring: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_course", ["courseId"])
    .index("by_day", ["day"]),

  studySessions: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    location: v.optional(v.string()),
    participants: v.array(v.id("users")),
    courseId: v.optional(v.id("courses")),
    taskIds: v.array(v.id("tasks")),
    isRecurring: v.boolean(),
    recurrencePattern: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"]),

  productivityLogs: defineTable({
    userId: v.id("users"),
    date: v.number(), // timestamp
    studyDuration: v.number(), // in minutes
    tasksCompleted: v.number(),
    focusScore: v.optional(v.number()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_date", ["date"]),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    enrolledAt: v.number(),
    progress: v.number(), // 0-100
    lastAccessedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_user_course", ["userId", "courseId"]),

  videoProgress: defineTable({
    userId: v.id("users"),
    videoId: v.id("videos"),
    progress: v.number(), // 0-100
    watchedDuration: v.number(), // in seconds
    lastWatchedAt: v.number(),
    completed: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_video", ["videoId"])
    .index("by_user_video", ["userId", "videoId"]),
});

