import { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { api } from "@/lib/api";
import type { User } from "@shared/schema";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, username: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        try {
          // Try to get existing user from API
          const existingUser = await api.users.getByEmail(firebaseUser.email!);
          setUser(existingUser);
        } catch (error) {
          // User doesn't exist in our system yet
          setUser(null);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    // Handle redirect result for Google sign-in
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        // User signed in via redirect
        console.log("User signed in via redirect:", result.user);
      }
    }).catch((error) => {
      console.error("Redirect sign-in error:", error);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, username: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user in our system
      const newUser = await api.users.create({
        firebaseUid: result.user.uid,
        email: result.user.email!,
        name,
        username,
        coins: 0,
        streak: 0,
        gardenLevel: 1,
        totalChallenges: 0,
        challengePreferences: [],
        difficultyPreference: 2,
        comfortProfile: null
      });
      
      setUser(newUser);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = await api.users.update(user.id, updates);
      setUser(updatedUser);
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      firebaseUser,
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
