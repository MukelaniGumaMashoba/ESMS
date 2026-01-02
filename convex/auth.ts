import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get current user by token
export const getCurrentUser = query({
  args: {
    tokenIdentifier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.tokenIdentifier) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .first();

    if (user) {
      // Remove password from response
      const { password, ...userWithoutPassword } = user as any;
      return userWithoutPassword;
    }

    return null;
  },
});

// Create or update user
export const createOrUpdateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    const now = Date.now();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
        avatar: args.avatar,
        updatedAt: now,
      });
      return existingUser._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        avatar: args.avatar,
        role: "student",
        createdAt: now,
        updatedAt: now,
        tokenIdentifier: identity.tokenIdentifier,
      });
    }
  },
});

