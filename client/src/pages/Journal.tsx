import { useState } from "react";
import { Plus, Calendar, Smile, Meh, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function Journal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isWriting, setIsWriting] = useState(false);
  const [journalContent, setJournalContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const { data: journals = [], isLoading } = useQuery({
    queryKey: ["/api/journals/user", user?.id],
    queryFn: () => {
      if (!user) return [];
      return api.journals.getByUser(user.id);
    },
    enabled: !!user
  });

  const createJournalMutation = useMutation({
    mutationFn: (journalData: any) => {
      return api.journals.create(journalData);
    },
    onSuccess: () => {
      toast({
        title: "Journal entry saved! 📝",
        description: "Your reflection has been recorded",
      });
      setJournalContent("");
      setSelectedMood("");
      setIsWriting(false);
      queryClient.invalidateQueries({ queryKey: ["/api/journals/user"] });
    }
  });

  const moodOptions = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Content", value: "content" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😟", label: "Anxious", value: "anxious" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
  ];

  const handleSaveJournal = () => {
    if (!user || !journalContent.trim()) return;

    const wordCount = journalContent.trim().split(/\s+/).length;

    createJournalMutation.mutate({
      userId: user.id,
      content: journalContent.trim(),
      mood: selectedMood,
      wordCount,
      challengeId: null // In real app, might link to today's challenge
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please sign in to access your journal</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6 pt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Journal</h1>
          <Button
            onClick={() => setIsWriting(true)}
            className="garden-bg text-white"
          >
            <Plus className="mr-2" size={16} />
            New Entry
          </Button>
        </div>
        
        {isWriting && (
          <Card className="mb-6 border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Today, {new Date().toLocaleDateString("en-US", { 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </h3>
                  <p className="text-gray-500 text-sm">How are you feeling after today's challenges?</p>
                </div>
                <div className="flex space-x-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`w-8 h-8 rounded-full hover:scale-110 transition-transform ${
                        selectedMood === mood.value ? "ring-2 ring-primary-400" : ""
                      }`}
                      title={mood.label}
                    >
                      <span className="text-lg">{mood.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <Textarea
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent h-32 resize-none"
                placeholder="How did today's challenges make you feel? What did you learn about yourself?"
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{journalContent.trim().split(/\s+/).filter(w => w).length} words</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsWriting(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveJournal}
                    disabled={!journalContent.trim() || createJournalMutation.isPending}
                    className="garden-bg text-white"
                  >
                    {createJournalMutation.isPending ? "Saving..." : "Save Entry"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Previous Entries */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Previous Entries</h3>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : journals.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No journal entries yet</h3>
                <p className="text-gray-500 mb-4">Start writing to track your growth journey</p>
                <Button
                  onClick={() => setIsWriting(true)}
                  className="garden-bg text-white"
                >
                  Write Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            journals.map((entry) => (
              <Card key={entry.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric"
                        }) : "Recent entry"}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {entry.wordCount} words
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {entry.mood && (
                        <span className="text-lg">
                          {moodOptions.find(m => m.value === entry.mood)?.emoji || "😐"}
                        </span>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Journal Entry
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
