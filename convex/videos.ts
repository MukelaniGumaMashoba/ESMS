import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get videos for a course
export const getVideosByCourse = query({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();

    // Sort by order
    return videos.sort((a, b) => a.order - b.order);
  },
});

// Get educational videos only
export const getEducationalVideos = query({
  args: {
    courseId: v.optional(v.id("courses")),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("videos").withIndex("by_educational", (q) =>
      q.eq("isEducational", true)
    );

    if (args.courseId) {
      query = query.filter((q) => q.eq(q.field("courseId"), args.courseId));
    }

    const videos = await query.collect();
    return videos.sort((a, b) => a.order - b.order);
  },
});

// Create video
export const createVideo = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    youtubeVideoId: v.string(),
    thumbnail: v.optional(v.string()),
    duration: v.optional(v.number()),
    order: v.number(),
    isEducational: v.boolean(),
    tags: v.array(v.string()),
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

    const now = Date.now();
    return await ctx.db.insert("videos", {
      courseId: args.courseId,
      title: args.title,
      description: args.description,
      youtubeVideoId: args.youtubeVideoId,
      thumbnail: args.thumbnail,
      duration: args.duration,
      order: args.order,
      isEducational: args.isEducational,
      tags: args.tags,
      createdAt: now,
      updatedAt: now,
      views: 0,
      likes: 0,
    });
  },
});

// Update video progress
export const updateVideoProgress = mutation({
  args: {
    videoId: v.id("videos"),
    progress: v.number(),
    watchedDuration: v.number(),
    completed: v.optional(v.boolean()),
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

    const existing = await ctx.db
      .query("videoProgress")
      .withIndex("by_user_video", (q) =>
        q.eq("userId", user._id).eq("videoId", args.videoId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        progress: args.progress,
        watchedDuration: args.watchedDuration,
        completed: args.completed ?? false,
        lastWatchedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("videoProgress", {
        userId: user._id,
        videoId: args.videoId,
        progress: args.progress,
        watchedDuration: args.watchedDuration,
        completed: args.completed ?? false,
        lastWatchedAt: Date.now(),
      });
    }
  },
});

// Increment video views
export const incrementVideoViews = mutation({
  args: {
    videoId: v.id("videos"),
  },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    await ctx.db.patch(args.videoId, {
      views: video.views + 1,
    });
  },
});

