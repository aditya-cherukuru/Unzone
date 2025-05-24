import { 
  users, challenges, journals, journalSummaries, gardenPlants, achievements,
  type User, type InsertUser, type Challenge, type InsertChallenge,
  type Journal, type InsertJournal, type JournalSummary, type InsertJournalSummary,
  type GardenPlant, type InsertGardenPlant, type Achievement, type InsertAchievement
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Challenges
  getChallenge(id: number): Promise<Challenge | undefined>;
  getChallengesByUser(userId: number): Promise<Challenge[]>;
  getChallengesByTopic(topic: string): Promise<Challenge[]>;
  getChallengesByDifficulty(difficulty: string): Promise<Challenge[]>;
  getChallengesByDate(date: string): Promise<Challenge[]>;
  getChallengesByCompleted(isCompleted: boolean): Promise<Challenge[]>;
  getAllChallenges(): Promise<Challenge[]>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  updateChallenge(id: number, challenge: Partial<InsertChallenge>): Promise<Challenge | undefined>;
  deleteChallenge(id: number): Promise<boolean>;
  
  // Journals
  getJournal(id: number): Promise<Journal | undefined>;
  getJournalsByUser(userId: number): Promise<Journal[]>;
  getJournalsByDate(date: string): Promise<Journal[]>;
  getAllJournals(): Promise<Journal[]>;
  createJournal(journal: InsertJournal): Promise<Journal>;
  updateJournal(id: number, journal: Partial<InsertJournal>): Promise<Journal | undefined>;
  deleteJournal(id: number): Promise<boolean>;
  
  // Journal Summaries
  getJournalSummary(id: number): Promise<JournalSummary | undefined>;
  getJournalSummariesByUser(userId: number): Promise<JournalSummary[]>;
  getJournalSummaryByJournal(journalId: number): Promise<JournalSummary | undefined>;
  getJournalSummariesByDate(date: string): Promise<JournalSummary[]>;
  getJournalSummariesByMood(moodTag: string): Promise<JournalSummary[]>;
  getAllJournalSummaries(): Promise<JournalSummary[]>;
  createJournalSummary(summary: InsertJournalSummary): Promise<JournalSummary>;
  updateJournalSummary(id: number, summary: Partial<InsertJournalSummary>): Promise<JournalSummary | undefined>;
  deleteJournalSummary(id: number): Promise<boolean>;
  
  // Garden Plants
  getGardenPlantsByUser(userId: number): Promise<GardenPlant[]>;
  createGardenPlant(plant: InsertGardenPlant): Promise<GardenPlant>;
  updateGardenPlant(id: number, plant: Partial<InsertGardenPlant>): Promise<GardenPlant | undefined>;
  
  // Achievements
  getAchievementsByUser(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private challenges: Map<number, Challenge> = new Map();
  private journals: Map<number, Journal> = new Map();
  private journalSummaries: Map<number, JournalSummary> = new Map();
  private gardenPlants: Map<number, GardenPlant> = new Map();
  private achievements: Map<number, Achievement> = new Map();
  private currentId = 1;

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.firebaseUid === firebaseUid);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      coins: insertUser.coins ?? 0,
      streak: insertUser.streak ?? 0,
      gardenLevel: insertUser.gardenLevel ?? 1,
      totalChallenges: insertUser.totalChallenges ?? 0,
      comfortProfile: insertUser.comfortProfile ?? null,
      challengePreferences: insertUser.challengePreferences ?? null,
      difficultyPreference: insertUser.difficultyPreference ?? null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Challenges
  async getChallenge(id: number): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async getChallengesByUser(userId: number): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(c => c.userId === userId);
  }

  async getChallengesByTopic(topic: string): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(c => c.category === topic);
  }

  async getChallengesByDifficulty(difficulty: string): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(c => c.difficulty === difficulty);
  }

  async getChallengesByDate(date: string): Promise<Challenge[]> {
    const targetDate = new Date(date);
    return Array.from(this.challenges.values()).filter(c => 
      c.createdAt && c.createdAt.toDateString() === targetDate.toDateString()
    );
  }

  async getChallengesByCompleted(isCompleted: boolean): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(c => c.isCompleted === isCompleted);
  }

  async getAllChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }

  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = this.currentId++;
    const challenge: Challenge = { 
      ...insertChallenge, 
      id, 
      createdAt: new Date(),
      isCompleted: insertChallenge.isCompleted ?? false,
      completedAt: null,
      userId: insertChallenge.userId ?? null,
      reward: insertChallenge.reward ?? null
    };
    this.challenges.set(id, challenge);
    return challenge;
  }

  async updateChallenge(id: number, challengeUpdate: Partial<InsertChallenge>): Promise<Challenge | undefined> {
    const challenge = this.challenges.get(id);
    if (!challenge) return undefined;
    
    const updatedChallenge = { ...challenge, ...challengeUpdate };
    this.challenges.set(id, updatedChallenge);
    return updatedChallenge;
  }

  async deleteChallenge(id: number): Promise<boolean> {
    return this.challenges.delete(id);
  }

  // Journals
  async getJournal(id: number): Promise<Journal | undefined> {
    return this.journals.get(id);
  }

  async getJournalsByUser(userId: number): Promise<Journal[]> {
    return Array.from(this.journals.values()).filter(j => j.userId === userId);
  }

  async getJournalsByDate(date: string): Promise<Journal[]> {
    const targetDate = new Date(date);
    return Array.from(this.journals.values()).filter(j => 
      j.createdAt && j.createdAt.toDateString() === targetDate.toDateString()
    );
  }

  async getAllJournals(): Promise<Journal[]> {
    return Array.from(this.journals.values());
  }

  async createJournal(insertJournal: InsertJournal): Promise<Journal> {
    const id = this.currentId++;
    const journal: Journal = { 
      ...insertJournal, 
      id, 
      createdAt: new Date() 
    };
    this.journals.set(id, journal);
    return journal;
  }

  async updateJournal(id: number, journalUpdate: Partial<InsertJournal>): Promise<Journal | undefined> {
    const journal = this.journals.get(id);
    if (!journal) return undefined;
    
    const updatedJournal = { ...journal, ...journalUpdate };
    this.journals.set(id, updatedJournal);
    return updatedJournal;
  }

  async deleteJournal(id: number): Promise<boolean> {
    return this.journals.delete(id);
  }

  // Journal Summaries
  async getJournalSummary(id: number): Promise<JournalSummary | undefined> {
    return this.journalSummaries.get(id);
  }

  async getJournalSummariesByUser(userId: number): Promise<JournalSummary[]> {
    return Array.from(this.journalSummaries.values()).filter(js => js.userId === userId);
  }

  async getJournalSummaryByJournal(journalId: number): Promise<JournalSummary | undefined> {
    return Array.from(this.journalSummaries.values()).find(js => js.journalId === journalId);
  }

  async getJournalSummariesByDate(date: string): Promise<JournalSummary[]> {
    const targetDate = new Date(date);
    return Array.from(this.journalSummaries.values()).filter(js => 
      js.createdAt && js.createdAt.toDateString() === targetDate.toDateString()
    );
  }

  async getJournalSummariesByMood(moodTag: string): Promise<JournalSummary[]> {
    return Array.from(this.journalSummaries.values()).filter(js => js.moodTag === moodTag);
  }

  async getAllJournalSummaries(): Promise<JournalSummary[]> {
    return Array.from(this.journalSummaries.values());
  }

  async createJournalSummary(insertSummary: InsertJournalSummary): Promise<JournalSummary> {
    const id = this.currentId++;
    const summary: JournalSummary = { 
      ...insertSummary, 
      id, 
      createdAt: new Date() 
    };
    this.journalSummaries.set(id, summary);
    return summary;
  }

  async updateJournalSummary(id: number, summaryUpdate: Partial<InsertJournalSummary>): Promise<JournalSummary | undefined> {
    const summary = this.journalSummaries.get(id);
    if (!summary) return undefined;
    
    const updatedSummary = { ...summary, ...summaryUpdate };
    this.journalSummaries.set(id, updatedSummary);
    return updatedSummary;
  }

  async deleteJournalSummary(id: number): Promise<boolean> {
    return this.journalSummaries.delete(id);
  }

  // Garden Plants
  async getGardenPlantsByUser(userId: number): Promise<GardenPlant[]> {
    return Array.from(this.gardenPlants.values()).filter(gp => gp.userId === userId);
  }

  async createGardenPlant(insertPlant: InsertGardenPlant): Promise<GardenPlant> {
    const id = this.currentId++;
    const plant: GardenPlant = { 
      ...insertPlant, 
      id, 
      unlockedAt: new Date() 
    };
    this.gardenPlants.set(id, plant);
    return plant;
  }

  async updateGardenPlant(id: number, plantUpdate: Partial<InsertGardenPlant>): Promise<GardenPlant | undefined> {
    const plant = this.gardenPlants.get(id);
    if (!plant) return undefined;
    
    const updatedPlant = { ...plant, ...plantUpdate };
    this.gardenPlants.set(id, updatedPlant);
    return updatedPlant;
  }

  // Achievements
  async getAchievementsByUser(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(a => a.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id, 
      unlockedAt: new Date() 
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();
