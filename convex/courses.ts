import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all published courses
export const getPublishedCourses = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return courses;
  },
});

// Get courses by category
export const getCoursesByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    return courses;
  },
});

// Get course by ID
export const getCourseById = query({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.courseId);
  },
});

// Get courses for instructor
export const getInstructorCourses = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const courses = await ctx.db
      .query("courses")
      .withIndex("by_instructor", (q) => q.eq("instructorId", user._id))
      .collect();

    return courses;
  },
});

// Create course
export const createCourse = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    color: v.string(),
    thumbnail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const now = Date.now();
    return await ctx.db.insert("courses", {
      name: args.name,
      description: args.description,
      instructorId: user._id,
      category: args.category,
      color: args.color,
      thumbnail: args.thumbnail,
      isPublished: false,
      createdAt: now,
      updatedAt: now,
      enrolledStudents: [],
    });
  },
});

// Update course
export const updateCourse = mutation({
  args: {
    courseId: v.id("courses"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    color: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const course = await ctx.db.get(args.courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user || course.instructorId !== user._id) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.courseId, {
      ...(args.name && { name: args.name }),
      ...(args.description !== undefined && { description: args.description }),
      ...(args.category && { category: args.category }),
      ...(args.color && { color: args.color }),
      ...(args.thumbnail !== undefined && { thumbnail: args.thumbnail }),
      ...(args.isPublished !== undefined && { isPublished: args.isPublished }),
      updatedAt: Date.now(),
    });
  },
});

// Enroll in course
export const enrollInCourse = mutation({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if already enrolled
    const existingEnrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .first();

    if (existingEnrollment) {
      return existingEnrollment._id;
    }

    // Create enrollment
    const enrollmentId = await ctx.db.insert("enrollments", {
      userId: user._id,
      courseId: args.courseId,
      enrolledAt: Date.now(),
      progress: 0,
      lastAccessedAt: Date.now(),
    });

    // Add to course's enrolled students
    const course = await ctx.db.get(args.courseId);
    if (course) {
      await ctx.db.patch(args.courseId, {
        enrolledStudents: [...course.enrolledStudents, user._id],
      });
    }

    return enrollmentId;
  },
});

