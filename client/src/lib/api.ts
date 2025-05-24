import { apiRequest } from "./queryClient";
import type { User, Challenge, Journal, JournalSummary, GardenPlant, Achievement } from "@shared/schema";

export const api = {
  // User API
  users: {
    get: (id: number): Promise<User> => 
      apiRequest("GET", `/api/users/${id}`).then(res => res.json()),
    
    getByEmail: (email: string): Promise<User> => 
      apiRequest("GET", `/api/users/email/${encodeURIComponent(email)}`).then(res => res.json()),
    
    getByUsername: (username: string): Promise<User> => 
      apiRequest("GET", `/api/users/username/${username}`).then(res => res.json()),
    
    create: (userData: any): Promise<User> => 
      apiRequest("POST", "/api/users", userData).then(res => res.json()),
    
    update: (id: number, userData: any): Promise<User> => 
      apiRequest("PUT", `/api/users/${id}`, userData).then(res => res.json()),
    
    assignTopicFromAnswers: (userId: number, answers: string[]): Promise<{ assignedTopic: string; user: User }> => 
      apiRequest("POST", `/api/users/${userId}/assign-topic-from-answers`, { answers }).then(res => res.json()),
  },

  // Challenge API
  challenges: {
    get: (id: number): Promise<Challenge> => 
      apiRequest("GET", `/api/challenges/${id}`).then(res => res.json()),
    
    getByUser: (userId: number): Promise<Challenge[]> => 
      apiRequest("GET", `/api/challenges/user/${userId}`).then(res => res.json()),
    
    generate: (userId: number): Promise<Challenge> => 
      apiRequest("GET", `/api/challenges/generate/${userId}`).then(res => res.json()),
    
    getByTopic: (topic: string): Promise<Challenge[]> => 
      apiRequest("GET", `/api/challenges/topic/${topic}`).then(res => res.json()),
    
    getByDifficulty: (difficulty: string): Promise<Challenge[]> => 
      apiRequest("GET", `/api/challenges/difficulty/${difficulty}`).then(res => res.json()),
    
    getByDate: (date: string): Promise<Challenge[]> => 
      apiRequest("GET", `/api/challenges/date?date=${date}`).then(res => res.json()),
    
    create: (challengeData: any): Promise<Challenge> => 
      apiRequest("POST", "/api/challenges", challengeData).then(res => res.json()),
    
    update: (id: number, challengeData: any): Promise<Challenge> => 
      apiRequest("PUT", `/api/challenges/${id}`, challengeData).then(res => res.json()),
    
    delete: (id: number): Promise<void> => 
      apiRequest("DELETE", `/api/challenges/${id}`).then(() => {}),
  },

  // Journal API
  journals: {
    get: (id: number): Promise<Journal> => 
      apiRequest("GET", `/api/journals/${id}`).then(res => res.json()),
    
    getByUser: (userId: number): Promise<Journal[]> => 
      apiRequest("GET", `/api/journals/user/${userId}`).then(res => res.json()),
    
    getByDate: (date: string): Promise<Journal[]> => 
      apiRequest("GET", `/api/journals/date?date=${date}`).then(res => res.json()),
    
    create: (journalData: any): Promise<Journal> => 
      apiRequest("POST", "/api/journals", journalData).then(res => res.json()),
    
    update: (id: number, journalData: any): Promise<Journal> => 
      apiRequest("PUT", `/api/journals/${id}`, journalData).then(res => res.json()),
    
    delete: (id: number): Promise<void> => 
      apiRequest("DELETE", `/api/journals/${id}`).then(() => {}),
  },

  // Journal Summary API
  journalSummaries: {
    get: (id: number): Promise<JournalSummary> => 
      apiRequest("GET", `/api/journal-summaries/${id}`).then(res => res.json()),
    
    getByUser: (userId: number): Promise<JournalSummary[]> => 
      apiRequest("GET", `/api/journal-summaries/user/${userId}`).then(res => res.json()),
    
    getByJournal: (journalId: number): Promise<JournalSummary> => 
      apiRequest("GET", `/api/journal-summaries/journal/${journalId}`).then(res => res.json()),
    
    getByDate: (date: string): Promise<JournalSummary[]> => 
      apiRequest("GET", `/api/journal-summaries/date?date=${date}`).then(res => res.json()),
    
    getByMood: (moodTag: string): Promise<JournalSummary[]> => 
      apiRequest("GET", `/api/journal-summaries/mood/${moodTag}`).then(res => res.json()),
    
    create: (summaryData: any): Promise<JournalSummary> => 
      apiRequest("POST", "/api/journal-summaries", summaryData).then(res => res.json()),
    
    update: (id: number, summaryData: any): Promise<JournalSummary> => 
      apiRequest("PUT", `/api/journal-summaries/${id}`, summaryData).then(res => res.json()),
    
    delete: (id: number): Promise<void> => 
      apiRequest("DELETE", `/api/journal-summaries/${id}`).then(() => {}),
  },
};
