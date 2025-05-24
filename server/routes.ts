import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertChallengeSchema, insertJournalSchema, insertJournalSummarySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Challenge Routes
  app.get("/api/challenges/generate/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a challenge based on user preferences
      const challenges = [
        { title: "Start a conversation with a stranger", description: "Strike up a friendly conversation with someone you don't know", category: "Social", difficulty: "MEDIUM", reward: 25 },
        { title: "Try a new hobby for 30 minutes", description: "Explore something you've never done before", category: "Creative", difficulty: "EASY", reward: 15 },
        { title: "Take a different route to work", description: "Change your routine and discover something new", category: "Adventure", difficulty: "EASY", reward: 10 },
        { title: "Give a genuine compliment to 3 people", description: "Spread positivity and practice vulnerability", category: "Social", difficulty: "MEDIUM", reward: 20 },
        { title: "Eat at a restaurant alone", description: "Practice being comfortable with solitude in public", category: "Independence", difficulty: "HARD", reward: 35 }
      ];

      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      const challenge = await storage.createChallenge({
        userId,
        ...randomChallenge
      });

      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate challenge" });
    }
  });

  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const challenge = await storage.getChallenge(id);
      
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenge" });
    }
  });

  app.get("/api/challenges/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const challenges = await storage.getChallengesByUser(userId);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user challenges" });
    }
  });

  app.get("/api/challenges/topic/:topic", async (req, res) => {
    try {
      const challenges = await storage.getChallengesByTopic(req.params.topic);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenges by topic" });
    }
  });

  app.get("/api/challenges/date", async (req, res) => {
    try {
      const date = req.query.date as string;
      if (!date) {
        return res.status(400).json({ message: "Date parameter required" });
      }
      const challenges = await storage.getChallengesByDate(date);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenges by date" });
    }
  });

  app.get("/api/challenges/difficulty/:difficulty", async (req, res) => {
    try {
      const challenges = await storage.getChallengesByDifficulty(req.params.difficulty);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenges by difficulty" });
    }
  });

  app.get("/api/challenges/completed/:isCompleted", async (req, res) => {
    try {
      const isCompleted = req.params.isCompleted === "true";
      const challenges = await storage.getChallengesByCompleted(isCompleted);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenges by completion status" });
    }
  });

  app.get("/api/challenges", async (req, res) => {
    try {
      const challenges = await storage.getAllChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get challenges" });
    }
  });

  app.post("/api/challenges", async (req, res) => {
    try {
      const challengeData = insertChallengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(challengeData);
      res.status(201).json(challenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid challenge data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create challenge" });
    }
  });

  app.put("/api/challenges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const challenge = await storage.updateChallenge(id, updateData);
      
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to update challenge" });
    }
  });

  app.delete("/api/challenges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteChallenge(id);
      
      if (!success) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      
      res.json({ message: "Challenge deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete challenge" });
    }
  });

  // Journal Routes
  app.get("/api/journals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const journal = await storage.getJournal(id);
      
      if (!journal) {
        return res.status(404).json({ message: "Journal not found" });
      }
      
      res.json(journal);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journal" });
    }
  });

  app.get("/api/journals/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const journals = await storage.getJournalsByUser(userId);
      res.json(journals);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user journals" });
    }
  });

  app.get("/api/journals/date", async (req, res) => {
    try {
      const date = req.query.date as string;
      if (!date) {
        return res.status(400).json({ message: "Date parameter required" });
      }
      const journals = await storage.getJournalsByDate(date);
      res.json(journals);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journals by date" });
    }
  });

  app.get("/api/journals", async (req, res) => {
    try {
      const journals = await storage.getAllJournals();
      res.json(journals);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journals" });
    }
  });

  app.post("/api/journals", async (req, res) => {
    try {
      const journalData = insertJournalSchema.parse(req.body);
      const journal = await storage.createJournal(journalData);
      res.status(201).json(journal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid journal data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create journal" });
    }
  });

  app.put("/api/journals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const journal = await storage.updateJournal(id, updateData);
      
      if (!journal) {
        return res.status(404).json({ message: "Journal not found" });
      }
      
      res.json(journal);
    } catch (error) {
      res.status(500).json({ message: "Failed to update journal" });
    }
  });

  app.delete("/api/journals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteJournal(id);
      
      if (!success) {
        return res.status(404).json({ message: "Journal not found" });
      }
      
      res.json({ message: "Journal deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete journal" });
    }
  });

  // Journal Summary Routes
  app.get("/api/journal-summaries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const summary = await storage.getJournalSummary(id);
      
      if (!summary) {
        return res.status(404).json({ message: "Journal summary not found" });
      }
      
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journal summary" });
    }
  });

  app.get("/api/journal-summaries/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const summaries = await storage.getJournalSummariesByUser(userId);
      res.json(summaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user journal summaries" });
    }
  });

  app.get("/api/journal-summaries/journal/:journalId", async (req, res) => {
    try {
      const journalId = parseInt(req.params.journalId);
      const summary = await storage.getJournalSummaryByJournal(journalId);
      
      if (!summary) {
        return res.status(404).json({ message: "Journal summary not found" });
      }
      
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journal summary" });
    }
  });

  app.get("/api/journal-summaries/date", async (req, res) => {
    try {
      const date = req.query.date as string;
      if (!date) {
        return res.status(400).json({ message: "Date parameter required" });
      }
      const summaries = await storage.getJournalSummariesByDate(date);
      res.json(summaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journal summaries by date" });
    }
  });

  app.get("/api/journal-summaries/mood/:moodTag", async (req, res) => {
    try {
      const summaries = await storage.getJournalSummariesByMood(req.params.moodTag);
      res.json(summaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journal summaries by mood" });
    }
  });

  app.get("/api/journal-summaries", async (req, res) => {
    try {
      const summaries = await storage.getAllJournalSummaries();
      res.json(summaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get journal summaries" });
    }
  });

  app.post("/api/journal-summaries", async (req, res) => {
    try {
      const summaryData = insertJournalSummarySchema.parse(req.body);
      const summary = await storage.createJournalSummary(summaryData);
      res.status(201).json(summary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid journal summary data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create journal summary" });
    }
  });

  app.put("/api/journal-summaries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const summary = await storage.updateJournalSummary(id, updateData);
      
      if (!summary) {
        return res.status(404).json({ message: "Journal summary not found" });
      }
      
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to update journal summary" });
    }
  });

  app.delete("/api/journal-summaries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteJournalSummary(id);
      
      if (!success) {
        return res.status(404).json({ message: "Journal summary not found" });
      }
      
      res.json({ message: "Journal summary deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete journal summary" });
    }
  });

  // User Routes
  app.post("/api/users/:userId/assign-topic-from-answers", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { answers } = req.body;
      
      // Mock LLM processing - in real implementation this would call an LLM API
      const topics = ["Social Confidence", "Creative Expression", "Physical Activity", "Professional Skills", "Mindfulness"];
      const assignedTopic = topics[Math.floor(Math.random() * topics.length)];
      
      const user = await storage.updateUser(userId, { 
        challengePreferences: [assignedTopic] 
      });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ assignedTopic, user });
    } catch (error) {
      res.status(500).json({ message: "Failed to assign topic" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/users/admin/reset-daily-stats", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      
      for (const user of users) {
        await storage.updateUser(user.id, { 
          // Reset daily stats - implement according to your business logic
        });
      }
      
      res.json({ message: "Daily stats reset successfully", affectedUsers: users.length });
    } catch (error) {
      res.status(500).json({ message: "Failed to reset daily stats" });
    }
  });

  app.get("/api/users/username/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user by username" });
    }
  });

  app.get("/api/users/email/:email", async (req, res) => {
    try {
      const user = await storage.getUserByEmail(req.params.email);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user by email" });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to get users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const user = await storage.updateUser(id, updateData);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // Implement user deletion logic
      res.json({ message: "User deletion not implemented yet" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
