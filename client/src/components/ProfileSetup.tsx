import { useState } from "react";
import { UserCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupProps {
  onComplete: () => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [comfortDescription, setComfortDescription] = useState("");
  const [challengeTypes, setChallengeTypes] = useState<string[]>([]);
  const [difficultyPreference, setDifficultyPreference] = useState([2]);
  const [loading, setLoading] = useState(false);
  
  const { updateUserProfile } = useAuth();
  const { toast } = useToast();

  const challengeOptions = [
    "Social Confidence",
    "Physical Activity", 
    "Creative Expression",
    "Professional Skills",
    "Mindfulness",
    "Adventure & Travel"
  ];

  const handleChallengeTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setChallengeTypes([...challengeTypes, type]);
    } else {
      setChallengeTypes(challengeTypes.filter(t => t !== type));
    }
  };

  const handleSubmit = async () => {
    if (!comfortDescription.trim()) {
      toast({
        title: "Please describe your comfort zone",
        description: "This helps us personalize your challenges",
        variant: "destructive"
      });
      return;
    }

    if (challengeTypes.length === 0) {
      toast({
        title: "Please select at least one area to grow in",
        description: "Choose what interests you most",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      await updateUserProfile({
        comfortProfile: { description: comfortDescription },
        challengePreferences: challengeTypes,
        difficultyPreference: difficultyPreference[0]
      });
      
      toast({
        title: "Profile saved!",
        description: "Let's start your growth journey",
      });
      
      onComplete();
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 text-center">
        <UserCircle className="text-4xl text-primary-600 mb-4 mx-auto" size={64} />
        <h2 className="font-display text-2xl font-bold text-primary-800 mb-2">Tell Us About You</h2>
        <p className="text-primary-600">Help us personalize your growth journey</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">What makes you most comfortable?</h3>
          <Textarea
            value={comfortDescription}
            onChange={(e) => setComfortDescription(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent h-32 resize-none"
            placeholder="Describe your comfort zone in your own words..."
          />
        </div>
        
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">What areas would you like to grow in?</h3>
          <div className="grid grid-cols-2 gap-3">
            {challengeOptions.map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-all"
              >
                <Checkbox
                  checked={challengeTypes.includes(type)}
                  onCheckedChange={(checked) => handleChallengeTypeChange(type, checked as boolean)}
                  className="text-primary-400 focus:ring-primary-400"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Challenge Intensity</h3>
          <div className="relative">
            <Slider
              value={difficultyPreference}
              onValueChange={setDifficultyPreference}
              max={3}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Gentle</span>
              <span>Moderate</span>
              <span>Bold</span>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full garden-bg text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Setting up your garden...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2" size={20} />
              Start My Journey
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
