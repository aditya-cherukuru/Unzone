import { useState } from "react";
import { Leaf, Flower, Sprout, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { WishPond } from "@/components/WishPond";

export function Garden() {
  const { user } = useAuth();
  const [showWishPond, setShowWishPond] = useState(false);

  // Enhanced garden data with more magical elements
  const gardenPlots = [
    { type: "seedling", name: "Confidence Sprout", progress: 75, emoji: "🌱", color: "from-green-400 to-green-600" },
    { type: "fern", name: "Courage Fern", progress: 50, emoji: "🌿", color: "from-emerald-400 to-emerald-600" },
    { type: "blossom", name: "Bravery Blossom", progress: 100, emoji: "🌸", color: "from-pink-400 to-pink-600" },
    { type: "empty", name: "Ready to plant", progress: 0, emoji: "🌰", color: "from-gray-300 to-gray-400" },
    { type: "flower", name: "Growth Flower", progress: 80, emoji: "🌺", color: "from-purple-400 to-purple-600" },
    { type: "tree", name: "Wisdom Tree", progress: 90, emoji: "🌳", color: "from-yellow-400 to-yellow-600" },
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
      {/* Magical Garden Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Trees with swaying animation */}
          <div className="absolute top-8 left-4 text-6xl animate-tree-sway" style={{ animationDelay: "0s" }}>🌳</div>
          <div className="absolute top-12 right-8 text-5xl animate-tree-sway" style={{ animationDelay: "2s" }}>🌲</div>
          <div className="absolute top-6 left-1/3 text-4xl animate-tree-sway" style={{ animationDelay: "4s" }}>🌴</div>
          
          {/* Flying Birds */}
          <div className="absolute top-16 left-0 text-2xl animate-bird-fly" style={{ animationDelay: "1s" }}>🐦</div>
          <div className="absolute top-20 left-0 text-xl animate-bird-fly" style={{ animationDelay: "3s" }}>🕊️</div>
          
          {/* Dancing Butterflies */}
          <div className="absolute top-32 left-1/4 text-2xl animate-butterfly" style={{ animationDelay: "0.5s" }}>🦋</div>
          <div className="absolute top-28 right-1/3 text-xl animate-butterfly" style={{ animationDelay: "2.5s" }}>🦋</div>
          
          {/* Floating Sparkles */}
          <div className="absolute top-20 left-1/2 text-xl animate-sparkle" style={{ animationDelay: "0s" }}>✨</div>
          <div className="absolute top-36 right-1/5 text-lg animate-sparkle" style={{ animationDelay: "1.5s" }}>💫</div>
          <div className="absolute top-44 left-1/6 text-sm animate-sparkle" style={{ animationDelay: "3s" }}>⭐</div>
        </div>
      </div>
      
      <div className="relative z-10 p-6 pt-16">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2 drop-shadow-lg">Your Courage Garden</h1>
          <p className="text-white/90 drop-shadow">
            {user.totalChallenges || 0} plants • Level {user.gardenLevel || 1}
          </p>
        </div>
        
        {/* Enhanced Garden Grid with Color Coding */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {gardenPlots.map((plot, index) => (
            <Card 
              key={index}
              className={`aspect-square bg-white/15 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plot.type === "empty" 
                  ? "border-dashed border-white/20 hover:border-white/40" 
                  : "hover:scale-105"
              }`}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <div 
                  className={`text-3xl mb-2 transition-transform duration-300 ${
                    plot.type !== "empty" 
                      ? "animate-float hover:scale-110" 
                      : "opacity-60 hover:opacity-80"
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.7}s` 
                  }}
                >
                  {plot.emoji}
                </div>
                <p className={`text-xs text-center mb-2 font-medium ${
                  plot.type === "empty"
                    ? "text-white/60"
                    : "text-white/90"
                }`}>
                  {plot.name}
                </p>
                {plot.progress > 0 && plot.type !== "empty" && (
                  <div className="w-full">
                    <div className="w-full bg-white/20 rounded-full h-2 mb-1">
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
        
        {/* Magical Wish Pond in Garden */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div 
              className="w-40 h-24 rounded-full bg-gradient-to-br from-blue-400 via-teal-400 to-cyan-500 animate-pond-glow shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{
                background: `radial-gradient(ellipse at center, 
                  hsl(var(--pond-blue)) 0%, 
                  hsl(var(--pond-teal)) 40%, 
                  hsl(var(--pond-aqua)) 70%, 
                  hsl(var(--primary-400)) 100%)`
              }}
              onClick={() => setShowWishPond(true)}
            >
              {/* Water Surface Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/15 rounded-full animate-pulse"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-1 left-4 text-sm animate-float" style={{ animationDelay: "0s" }}>🍃</div>
              <div className="absolute bottom-1 right-6 text-xs animate-float" style={{ animationDelay: "2s" }}>🌸</div>
              <div className="absolute top-2 right-2 text-xs animate-float" style={{ animationDelay: "1s" }}>💐</div>
            </div>
            <div className="text-center mt-2">
              <p className="text-white/90 text-sm font-medium drop-shadow">Wish Pond</p>
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
