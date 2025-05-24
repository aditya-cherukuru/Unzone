import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { SplashScreen } from "@/components/SplashScreen";
import { OnboardingCarousel } from "@/components/OnboardingCarousel";
import { AuthScreen } from "@/components/AuthScreen";
import { ProfileSetup } from "@/components/ProfileSetup";
import { MainApp } from "@/components/MainApp";

type AppScreen = "splash" | "onboarding" | "auth" | "profile-setup" | "main";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const { firebaseUser, user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!firebaseUser) {
        // Not signed in
        if (currentScreen === "splash") {
          // Will be handled by splash screen completion
        } else {
          setCurrentScreen("auth");
        }
      } else if (!user) {
        // Firebase user exists but not in our system
        setCurrentScreen("profile-setup");
      } else if (!user.comfortProfile || !user.challengePreferences?.length) {
        // User exists but needs profile setup
        setCurrentScreen("profile-setup");
      } else {
        // Fully set up user
        setCurrentScreen("main");
      }
    }
  }, [firebaseUser, user, loading, currentScreen]);

  const handleSplashComplete = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("auth");
  };

  const handleAuthComplete = () => {
    // Will be handled by useEffect based on user state
  };

  const handleProfileSetupComplete = () => {
    setCurrentScreen("main");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative overflow-hidden">
      {currentScreen === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      {currentScreen === "onboarding" && (
        <OnboardingCarousel onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === "auth" && (
        <AuthScreen onComplete={handleAuthComplete} />
      )}
      
      {currentScreen === "profile-setup" && (
        <ProfileSetup onComplete={handleProfileSetupComplete} />
      )}
      
      {currentScreen === "main" && (
        <MainApp />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
