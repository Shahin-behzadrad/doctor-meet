import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
  }),

  doctors: defineTable({
    name: v.string(),
    specialty: v.string(),
    image: v.optional(v.string()),
    rating: v.number(),
    reviewCount: v.number(),
    nextAvailable: v.string(),
    tags: v.array(v.string()),
    bio: v.optional(v.string()),
    experience: v.number(),
    location: v.string(),
    fee: v.number(),
  }),

  appointments: defineTable({
    doctorId: v.id("doctors"),
    userId: v.id("users"),
    date: v.string(),
    timeSlot: v.string(),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("upcoming"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  })
    .index("by_user", ["userId"])
    .index("by_doctor", ["doctorId"])
    .index("by_status", ["status"])
    .index("by_date", ["date"]),
});
