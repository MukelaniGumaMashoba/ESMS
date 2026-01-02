import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Simple password-based auth (for development)
// In production, use Clerk or another auth provider
export const signUp = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User already exists");
    }

    // In production, hash the password
    // For now, store it (NOT RECOMMENDED FOR PRODUCTION)
    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      role: "student",
      tokenIdentifier: `email:${args.email}`, // Simple identifier
      createdAt: now,
      updatedAt: now,
      password: args.password, // TODO: Hash this in production
    });

    return userId;
  },
});

export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In production, verify hashed password
    if ((user as any).password !== args.password) {
      throw new Error("Invalid email or password");
    }

    return {
      userId: user._id,
      tokenIdentifier: user.tokenIdentifier,
    };
  },
});

