import { useEffect, useState } from "react";
import { Coins, Flame, Users, Leaf, Flower, Quote, User, Settings, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CoachChat } from "@/components/CoachChat";
import type { Challenge } from "@shared/schema";

export function Home() {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [greeting, setGreeting] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const { data: todayChallenge, isLoading: challengeLoading } = useQuery({
    queryKey: ["/api/challenges/user", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const challenges = await api.challenges.getByUser(user.id);
      const today = new Date().toDateString();
      return challenges.find(c => 
        c.createdAt && new Date(c.createdAt).toDateString() === today && !c.isCompleted
      ) || null;
    },
    enabled: !!user
  });

  const generateChallengeMutation = useMutation({
    mutationFn: () => {
      if (!user) throw new Error("User not found");
      return api.challenges.generate(user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/challenges/user"] });
    }
  });

  const acceptChallengeMutation = useMutation({
    mutationFn: (challengeId: number) => {
      return api.challenges.update(challengeId, { isAccepted: true });
    },
    onSuccess: (challenge) => {
      setCurrentChallenge(challenge);
      setChallengeCompleted(true);
      setShowCoach(true);
      queryClient.invalidateQueries({ queryKey: ["/api/challenges/user"] });
    }
  });

  const skipChallengeMutation = useMutation({
    mutationFn: (challenge: Challenge) => {
      setCurrentChallenge(challenge);
      setChallengeCompleted(false);
      setShowCoach(true);
      if (!user) throw new Error("User not found");
      return api.challenges.generate(user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/challenges/user"] });
    }
  });

  const handleGenerateChallenge = () => {
    generateChallengeMutation.mutate();
  };

  const handleAcceptChallenge = (challengeId: number) => {
    acceptChallengeMutation.mutate(challengeId);
  };

  const handleSkipChallenge = (challenge: Challenge) => {
    skipChallengeMutation.mutate(challenge);
  };

  const handleCoinsAwarded = async (coins: number) => {
    if (user) {
      await updateUserProfile({ 
        coins: (user.coins || 0) + coins,
        totalChallenges: (user.totalChallenges || 0) + (challengeCompleted ? 1 : 0)
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please sign in to continue</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header with Profile & Settings */}
      <div className="garden-bg px-6 pt-12 pb-8">
        <div className="flex justify-between items-start mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <User size={20} />
          </Button>
          
          <div className="text-center flex-1 mx-4">
            <p className="text-white/80 text-sm">{greeting}</p>
            <h1 className="text-white text-2xl font-bold">{user.name}</h1>
            
            <div className="flex items-center justify-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                <Coins className="text-yellow-300 text-sm" size={16} />
                <span className="text-white font-semibold text-sm">{user.coins || 0}</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                <Flame className="text-orange-300 text-sm" size={16} />
                <span className="text-white font-semibold text-sm">{user.streak || 0}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <Settings size={20} />
          </Button>
        </div>
        
        {/* Garden Preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-3">Your Courage Garden</h3>
          <div 
            className="h-32 bg-white/5 rounded-xl relative overflow-hidden"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center space-x-2 mb-2">
                  <Leaf className="text-green-300 animate-float" size={24} />
                  <Leaf className="text-green-400 animate-float" size={24} style={{ animationDelay: "0.5s" }} />
                  <Flower className="text-pink-300 animate-float" size={24} style={{ animationDelay: "1s" }} />
                </div>
                <p className="text-white/90 text-sm font-medium">
                  {user.totalChallenges || 0} challenges completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Today's Challenge */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Challenge</h2>
        
        {challengeLoading ? (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ) : todayChallenge ? (
          <Card className="mb-6 border border-gray-100">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{todayChallenge.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">{todayChallenge.category}</Badge>
                      <Badge variant="outline">{todayChallenge.difficulty}</Badge>
                    </div>
                  </div>
                </div>
                <span className="text-2xl">+{todayChallenge.reward} 🪙</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{todayChallenge.description}</p>
              
              <div className="flex space-x-3">
                <Button
                  onClick={() => handleAcceptChallenge(todayChallenge.id)}
                  disabled={acceptChallengeMutation.isPending}
                  className="flex-1 garden-bg text-white hover:shadow-lg transition-all duration-300"
                >
                  {acceptChallengeMutation.isPending ? "Accepting..." : "Accept Challenge"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSkipChallenge(todayChallenge)}
                  disabled={skipChallengeMutation.isPending}
                  className="px-6 hover:bg-gray-50 transition-all duration-300"
                >
                  {skipChallengeMutation.isPending ? "Generating..." : "Skip"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500 mb-4">No challenge for today yet</p>
              <Button
                onClick={handleGenerateChallenge}
                disabled={generateChallengeMutation.isPending}
                className="garden-bg text-white"
              >
                {generateChallengeMutation.isPending ? "Generating..." : "Generate Challenge"}
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Quote className="text-primary-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-primary-700 font-medium mb-2">
                  "Life begins at the end of your comfort zone."
                </p>
                <p className="text-primary-500 text-sm">— Neale Donald Walsch</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Coach Chat Modal */}
      {currentChallenge && (
        <CoachChat
          isOpen={showCoach}
          onClose={() => setShowCoach(false)}
          challengeTitle={currentChallenge.title}
          challengeCompleted={challengeCompleted}
          onCoinsAwarded={handleCoinsAwarded}
        />
      )}
    </div>
  );
}
