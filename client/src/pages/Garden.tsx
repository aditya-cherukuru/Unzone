import { Leaf, Flower, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

export function Garden() {
  const { user } = useAuth();

  // Mock garden data - in real app this would come from API
  const gardenPlots = [
    { type: "seedling", name: "Confidence Sprout", progress: 75, emoji: "🌱" },
    { type: "fern", name: "Courage Fern", progress: 50, emoji: "🌿" },
    { type: "blossom", name: "Bravery Blossom", progress: 100, emoji: "🌸" },
    { type: "empty", name: "Ready to plant", progress: 0, emoji: "🌰" },
    { type: "flower", name: "Growth Flower", progress: 80, emoji: "🌺" },
    { type: "locked", name: "Locked", progress: 0, emoji: "🌰" },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please sign in to view your garden</p>
      </div>
    );
  }

  return (
    <div className="h-full garden-bg relative overflow-y-auto">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      
      <div className="relative z-10 p-6 pt-16">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Your Courage Garden</h1>
          <p className="text-white/80">
            {user.totalChallenges || 0} plants • Level {user.gardenLevel || 1}
          </p>
        </div>
        
        {/* Garden Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {gardenPlots.map((plot, index) => (
            <Card 
              key={index}
              className={`aspect-square bg-white/10 backdrop-blur-sm border border-white/20 ${
                plot.type === "empty" || plot.type === "locked" 
                  ? "border-dashed border-white/10" 
                  : ""
              }`}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <div 
                  className={`text-3xl mb-2 ${
                    plot.type !== "empty" && plot.type !== "locked" 
                      ? "animate-float" 
                      : "opacity-50"
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.5}s` 
                  }}
                >
                  {plot.emoji}
                </div>
                <p className={`text-xs text-center mb-2 ${
                  plot.type === "empty" || plot.type === "locked"
                    ? "text-white/50"
                    : "text-white/80"
                }`}>
                  {plot.name}
                </p>
                {plot.progress > 0 && plot.type !== "empty" && plot.type !== "locked" && (
                  <div className="w-full">
                    <Progress 
                      value={plot.progress} 
                      className="h-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Garden Stats */}
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-4">Garden Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.totalChallenges || 0}</div>
                <p className="text-white/70 text-sm">Total Challenges</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <p className="text-white/70 text-sm">In Bloom</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user.gardenLevel || 1}</div>
                <p className="text-white/70 text-sm">Garden Level</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">7</div>
                <p className="text-white/70 text-sm">Until Unlock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
