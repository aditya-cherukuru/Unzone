import { useState, useEffect } from "react";
import { MessageCircle, Send, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { geminiCoach, CoachResponse } from "@/lib/gemini";
import { useAuth } from "@/hooks/useAuth";

interface CoachChatProps {
  isOpen: boolean;
  onClose: () => void;
  challengeTitle: string;
  challengeCompleted: boolean;
  onCoinsAwarded: (coins: number) => void;
}

export function CoachChat({ 
  isOpen, 
  onClose, 
  challengeTitle, 
  challengeCompleted, 
  onCoinsAwarded 
}: CoachChatProps) {
  const [userMessage, setUserMessage] = useState("");
  const [coachResponse, setCoachResponse] = useState<CoachResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "response">("input");
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setStep("input");
      setCoachResponse(null);
      setUserMessage("");
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    
    try {
      let response: CoachResponse;
      
      if (challengeCompleted) {
        response = await geminiCoach.handleChallengeCompletion(
          challengeTitle,
          userMessage,
          user?.name || "friend"
        );
      } else {
        response = await geminiCoach.handleChallengeSkip(
          challengeTitle,
          userMessage,
          user?.name || "friend"
        );
      }
      
      setCoachResponse(response);
      setStep("response");
      
      // Award coins
      if (response.coinsAwarded) {
        onCoinsAwarded(response.coinsAwarded);
      }
    } catch (error) {
      console.error("Coach error:", error);
      setCoachResponse({
        message: "I'm having some technical difficulties, but I'm proud of your courage in sharing! 🌟",
        encouragement: "Keep growing!",
        coinsAwarded: challengeCompleted ? 5 : 2
      });
      setStep("response");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onClose();
  };

  if (!isOpen) return null;

  const promptText = challengeCompleted 
    ? "Tell me about your experience! How did it feel to step outside your comfort zone?"
    : "No worries at all! What made this challenge feel too big today? I'm here to understand, not judge.";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X size={20} />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Your Growth Coach</h3>
                  <p className="text-white/90 text-sm">Let's reflect together</p>
                </div>
              </div>
            </div>

            {step === "input" && (
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Challenge: {challengeTitle}
                  </h4>
                  <div className={`p-3 rounded-lg ${
                    challengeCompleted 
                      ? "bg-green-50 border border-green-200" 
                      : "bg-blue-50 border border-blue-200"
                  }`}>
                    <p className="text-sm text-gray-700">{promptText}</p>
                  </div>
                </div>

                <Textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder={challengeCompleted 
                    ? "Share your feelings, what you learned, or how it went..."
                    : "What held you back? Was it fear, timing, or something else?"
                  }
                  className="w-full h-32 mb-4 resize-none"
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!userMessage.trim() || loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Coach is thinking...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={16} />
                      Share with Coach
                    </>
                  )}
                </Button>
              </div>
            )}

            {step === "response" && coachResponse && (
              <div className="p-6">
                <div className="space-y-4">
                  {/* Coach's Response */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <MessageCircle size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {coachResponse.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Coins Awarded */}
                  {coachResponse.coinsAwarded && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <Award className="text-yellow-600" size={20} />
                        <span className="font-semibold text-yellow-800">
                          +{coachResponse.coinsAwarded} Courage Coins Earned!
                        </span>
                        <span className="text-2xl">🪙</span>
                      </div>
                    </div>
                  )}

                  {/* Encouragement */}
                  <div className="text-center">
                    <p className="text-gray-600 text-sm italic">
                      {coachResponse.encouragement}
                    </p>
                  </div>

                  <Button
                    onClick={handleFinish}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  >
                    Continue Growing! 🌱
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}