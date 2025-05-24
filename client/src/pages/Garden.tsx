import { useState } from "react";
import { Leaf, Flower, Sprout, Sparkles, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { WishPond } from "@/components/WishPond";

interface GardenProps {
  onBack?: () => void;
}

export function Garden({ onBack }: GardenProps = {}) {
  const { user } = useAuth();
  const [showWishPond, setShowWishPond] = useState(false);

  // Simplified, mature garden elements
  const gardenPlots = [
    { type: "plant", name: "Confidence", progress: 75, color: "from-green-400 to-green-600" },
    { type: "plant", name: "Courage", progress: 50, color: "from-emerald-400 to-emerald-600" },
    { type: "plant", name: "Growth", progress: 100, color: "from-blue-400 to-blue-600" },
    { type: "empty", name: "Available", progress: 0, color: "from-gray-300 to-gray-400" },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please sign in to view your garden</p>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-y-auto">
      {/* Sophisticated Garden Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-green-700 to-green-900">
        {/* Dense Forest Background */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {/* Dense tree coverage */}
          <div className="absolute top-0 left-0 text-8xl text-green-900 animate-tree-sway" style={{ animationDelay: "0s" }}>🌲</div>
          <div className="absolute top-4 left-12 text-7xl text-green-800 animate-tree-sway" style={{ animationDelay: "1s" }}>🌲</div>
          <div className="absolute top-8 left-24 text-6xl text-green-900 animate-tree-sway" style={{ animationDelay: "2s" }}>🌲</div>
          <div className="absolute top-0 right-0 text-8xl text-green-900 animate-tree-sway" style={{ animationDelay: "3s" }}>🌲</div>
          <div className="absolute top-4 right-12 text-7xl text-green-800 animate-tree-sway" style={{ animationDelay: "4s" }}>🌲</div>
          <div className="absolute top-8 right-24 text-6xl text-green-900 animate-tree-sway" style={{ animationDelay: "5s" }}>🌲</div>
          
          {/* Middle layer trees */}
          <div className="absolute top-16 left-8 text-5xl text-green-700 animate-tree-sway" style={{ animationDelay: "2s" }}>🌲</div>
          <div className="absolute top-20 right-16 text-5xl text-green-700 animate-tree-sway" style={{ animationDelay: "6s" }}>🌲</div>
          <div className="absolute top-24 left-20 text-4xl text-green-800 animate-tree-sway" style={{ animationDelay: "1s" }}>🌲</div>
          <div className="absolute top-28 right-8 text-4xl text-green-800 animate-tree-sway" style={{ animationDelay: "7s" }}>🌲</div>
        </div>
      </div>
      
      <div className="relative z-10 p-6 pt-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBack?.()}
          className="absolute top-4 left-4 text-white hover:bg-white/20 z-20"
        >
          <ArrowLeft size={20} />
        </Button>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2 drop-shadow-lg">Your Courage Garden</h1>
          <p className="text-white/90 drop-shadow">
            {user.totalChallenges || 0} plants • Level {user.gardenLevel || 1}
          </p>
        </div>
        
        {/* Simplified Garden Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {gardenPlots.map((plot, index) => (
            <Card 
              key={index}
              className={`aspect-square bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-300 ${
                plot.type === "empty" 
                  ? "border-dashed border-white/20" 
                  : "hover:scale-105"
              }`}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-full bg-white/10 mb-4 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${plot.color}`}></div>
                </div>
                <p className={`text-sm text-center mb-3 font-medium ${
                  plot.type === "empty"
                    ? "text-white/60"
                    : "text-white/90"
                }`}>
                  {plot.name}
                </p>
                {plot.progress > 0 && plot.type !== "empty" && (
                  <div className="w-full">
                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${plot.color} transition-all duration-500`}
                        style={{ width: `${plot.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/80 font-semibold">{plot.progress}%</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Large Sophisticated Wish Pond */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div 
              className="w-72 h-48 rounded-full bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-700 shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-white/20"
              onClick={() => setShowWishPond(true)}
            >
              {/* Realistic Water Surface */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-900/30 rounded-full"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-full animate-pulse"></div>
              
              {/* Minimal, elegant floating elements */}
              <div className="absolute top-6 left-8 w-2 h-2 bg-green-400 rounded-full animate-float opacity-70" style={{ animationDelay: "0s" }}></div>
              <div className="absolute bottom-8 right-12 w-1 h-1 bg-green-300 rounded-full animate-float opacity-60" style={{ animationDelay: "2s" }}></div>
              
              {/* Ripple effects */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full animate-ping opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full animate-ping opacity-20" style={{ animationDelay: "1s" }}></div>
            </div>
            <div className="text-center mt-4">
              <p className="text-white/90 text-lg font-medium drop-shadow">Reflection Pond</p>
              <p className="text-white/70 text-sm">Tap to make a wish</p>
            </div>
          </div>
        </div>
        
        {/* Enhanced Garden Stats */}
        <Card className="bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Sparkles className="mr-2" size={20} />
              Garden Progress
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold text-white">{user.totalChallenges || 0}</div>
                <p className="text-white/80 text-sm">Total Challenges</p>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold text-white">4</div>
                <p className="text-white/80 text-sm">In Bloom</p>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold text-white">{user.gardenLevel || 1}</div>
                <p className="text-white/80 text-sm">Garden Level</p>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold text-white">{user.coins || 0}</div>
                <p className="text-white/80 text-sm">Courage Coins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="h-20"></div> {/* Space for FAB */}
      </div>
      
      {/* Floating Action Button (FAB) */}
      <Button
        onClick={() => setShowWishPond(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-all duration-300 z-20 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="relative">
          <Sparkles size={24} />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs animate-bounce">
            🪙
          </div>
        </div>
      </Button>
      
      {/* Wish Pond Modal */}
      <WishPond 
        isOpen={showWishPond} 
        onClose={() => setShowWishPond(false)}
        userCoins={user.coins || 0}
      />
    </div>
  );
}
