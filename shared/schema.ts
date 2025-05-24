import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  coins: integer("coins").default(0),
  streak: integer("streak").default(0),
  gardenLevel: integer("garden_level").default(1),
  totalChallenges: integer("total_challenges").default(0),
  comfortProfile: jsonb("comfort_profile"),
  challengePreferences: text("challenge_preferences").array(),
  difficultyPreference: integer("difficulty_preference").default(2),
  createdAt: timestamp("created_at").defaultNow(),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(), // EASY, MEDIUM, HARD
  reward: integer("reward").default(25),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  challengeId: integer("challenge_id").references(() => challenges.id),
  content: text("content").notNull(),
  mood: text("mood"),
  wordCount: integer("word_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const journalSummaries = pgTable("journal_summaries", {
  id: serial("id").primaryKey(),
  journalId: integer("journal_id").references(() => journals.id),
  userId: integer("user_id").references(() => users.id),
  summary: text("summary").notNull(),
  sentiment: text("sentiment"), // POSITIVE, NEUTRAL, NEGATIVE
  moodTag: text("mood_tag"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gardenPlants = pgTable("garden_plants", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(),
  name: text("name").notNull(),
  progress: integer("progress").default(0),
  isBloooming: boolean("is_blooming").default(false),
  position: integer("position").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertJournalSchema = createInsertSchema(journals).omit({
  id: true,
  createdAt: true,
});

export const insertJournalSummarySchema = createInsertSchema(journalSummaries).omit({
  id: true,
  createdAt: true,
});

export const insertGardenPlantSchema = createInsertSchema(gardenPlants).omit({
  id: true,
  unlockedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  unlockedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Journal = typeof journals.$inferSelect;
export type InsertJournal = z.infer<typeof insertJournalSchema>;
export type JournalSummary = typeof journalSummaries.$inferSelect;
export type InsertJournalSummary = z.infer<typeof insertJournalSummarySchema>;
export type GardenPlant = typeof gardenPlants.$inferSelect;
export type InsertGardenPlant = z.infer<typeof insertGardenPlantSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
