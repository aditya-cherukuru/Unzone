import { useState } from "react";
import { MessageCircle, Send, Sparkles, Heart, Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

interface CoachProps {
  onBack?: () => void;
}

export function Coach({ onBack }: CoachProps = {}) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: "coach",
      content: `Hi ${user?.name || "friend"}! 🌟 I'm your personal growth coach. I'm here to help you reflect on your comfort zone journey, celebrate your wins, and support you through challenges. What's on your mind today?`,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date()
    };

    setConversations(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate coach response (replace with actual Gemini integration)
    setTimeout(() => {
      const coachResponse = {
        id: Date.now() + 1,
        type: "coach",
        content: "That's wonderful to hear! It takes real courage to step outside your comfort zone. Tell me more about how that made you feel - what emotions came up for you during that experience?",
        timestamp: new Date()
      };
      setConversations(prev => [...prev, coachResponse]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBack?.()}
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center space-x-3 ml-12">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Your Growth Coach</h1>
            <p className="text-white/90 text-sm">Always here to support your journey</p>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`flex ${conv.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                conv.type === "user"
                  ? "bg-purple-500 text-white ml-4"
                  : "bg-white border border-gray-200 mr-4 shadow-sm"
              }`}
            >
              {conv.type === "coach" && (
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Heart size={12} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Coach</span>
                </div>
              )}
              <p className={`text-sm leading-relaxed ${
                conv.type === "user" ? "text-white" : "text-gray-800"
              }`}>
                {conv.content}
              </p>
              <p className={`text-xs mt-2 ${
                conv.type === "user" ? "text-white/70" : "text-gray-500"
              }`}>
                {conv.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Quick topics to explore:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "How was today's challenge?",
              "I'm feeling anxious about something",
              "I want to grow but don't know how",
              "Help me set a new goal"
            ].map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                onClick={() => setMessage(prompt)}
                className="text-xs h-8 px-3 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 min-h-[80px] resize-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 h-[80px]"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}