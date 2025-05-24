import { useState, useEffect } from "react";
import { X, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface WishPondProps {
  isOpen: boolean;
  onClose: () => void;
  userCoins: number;
}

export function WishPond({ isOpen, onClose, userCoins }: WishPondProps) {
  const [wish, setWish] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "evening">("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 18 || hour < 6 ? "evening" : "morning");
  }, []);

  const createRipple = (x: number, y: number) => {
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  };

  const tossCoin = () => {
    if (!wish.trim()) return;
    
    setIsAnimating(true);
    
    // Create ripple in center of pond
    setTimeout(() => {
      createRipple(50, 60);
    }, 1000);
    
    // Reset after animation
    setTimeout(() => {
      setIsAnimating(false);
      setWish("");
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="h-full relative overflow-hidden">
        {/* Magical Garden Background */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            timeOfDay === "evening" 
              ? "bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900" 
              : "bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500"
          }`}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Trees */}
            <div className="absolute top-8 left-4 text-6xl animate-tree-sway" style={{ animationDelay: "0s" }}>🌳</div>
            <div className="absolute top-12 right-8 text-5xl animate-tree-sway" style={{ animationDelay: "2s" }}>🌲</div>
            <div className="absolute top-6 left-1/3 text-4xl animate-tree-sway" style={{ animationDelay: "4s" }}>🌴</div>
            
            {/* Birds */}
            <div className="absolute top-16 left-0 text-2xl animate-bird-fly" style={{ animationDelay: "1s" }}>🐦</div>
            <div className="absolute top-20 left-0 text-xl animate-bird-fly" style={{ animationDelay: "3s" }}>🕊️</div>
            
            {/* Butterflies */}
            <div className="absolute top-32 left-1/4 text-2xl animate-butterfly" style={{ animationDelay: "0.5s" }}>🦋</div>
            <div className="absolute top-28 right-1/3 text-xl animate-butterfly" style={{ animationDelay: "2.5s" }}>🦋</div>
            
            {/* Flowers */}
            <div className="absolute bottom-32 left-8 text-3xl animate-float" style={{ animationDelay: "1s" }}>🌸</div>
            <div className="absolute bottom-36 right-12 text-2xl animate-float" style={{ animationDelay: "3s" }}>🌺</div>
            <div className="absolute bottom-40 left-1/3 text-2xl animate-float" style={{ animationDelay: "0.5s" }}>🌼</div>
            <div className="absolute bottom-38 right-1/4 text-xl animate-float" style={{ animationDelay: "2s" }}>🌻</div>
            
            {/* Evening Fireflies */}
            {timeOfDay === "evening" && (
              <>
                <div className="absolute top-24 left-1/5 w-2 h-2 bg-yellow-300 rounded-full animate-firefly opacity-70" style={{ animationDelay: "0s" }}></div>
                <div className="absolute top-40 right-1/4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-firefly opacity-60" style={{ animationDelay: "2s" }}></div>
                <div className="absolute top-32 left-2/3 w-2 h-2 bg-yellow-400 rounded-full animate-firefly opacity-80" style={{ animationDelay: "4s" }}></div>
                <div className="absolute top-48 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-firefly opacity-50" style={{ animationDelay: "1s" }}></div>
              </>
            )}
            
            {/* Sparkles */}
            <div className="absolute top-20 left-1/2 text-xl animate-sparkle" style={{ animationDelay: "0s" }}>✨</div>
            <div className="absolute top-36 right-1/5 text-lg animate-sparkle" style={{ animationDelay: "1.5s" }}>💫</div>
            <div className="absolute top-44 left-1/6 text-sm animate-sparkle" style={{ animationDelay: "3s" }}>⭐</div>
          </div>
        </div>
        
        {/* Magical Wish Pond */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Pond Base */}
            <div 
              className="w-48 h-32 rounded-full bg-gradient-to-br from-blue-400 via-teal-400 to-cyan-500 animate-pond-glow relative overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at center, 
                  hsl(var(--pond-blue)) 0%, 
                  hsl(var(--pond-teal)) 40%, 
                  hsl(var(--pond-aqua)) 70%, 
                  hsl(var(--primary-400)) 100%)`
              }}
            >
              {/* Water Surface Reflections */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 animate-pulse"></div>
              
              {/* Ripple Effects */}
              {ripples.map((ripple) => (
                <div
                  key={ripple.id}
                  className="absolute border-2 border-white/40 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: `${ripple.x}%`,
                    top: `${ripple.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              
              {/* Floating Elements in Pond */}
              <div className="absolute top-2 left-6 text-sm animate-float" style={{ animationDelay: "0s" }}>🍃</div>
              <div className="absolute bottom-3 right-8 text-xs animate-float" style={{ animationDelay: "2s" }}>🌸</div>
              <div className="absolute top-4 right-4 text-xs animate-float" style={{ animationDelay: "1s" }}>💐</div>
            </div>
            
            {/* Animated Coin */}
            {isAnimating && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-coin-toss flex items-center justify-center text-lg shadow-lg"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--coin-gold)) 0%, hsl(var(--coin-bronze)) 100%)`
                  }}
                >
                  🪙
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Wish Input Card */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Card className="bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Sparkles className="mr-2 text-purple-500" size={24} />
                    Make a Wish
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Every coin holds a wish. Every ripple remembers your courage.
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Your Wish</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <span className="text-yellow-500">🪙</span>
                    <span>{userCoins} coins</span>
                  </div>
                </div>
                <Textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="What does completing this challenge mean to you? Share your hopes, dreams, or reflections..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent h-24 resize-none bg-white/80"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 flex items-center">
                  <Heart className="mr-1" size={12} />
                  Close your eyes. Breathe. Now toss the coin.
                </p>
                <Button
                  onClick={tossCoin}
                  disabled={!wish.trim() || isAnimating}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isAnimating ? "Making Wish..." : "Toss Into Pond"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}