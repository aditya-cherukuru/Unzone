import { useEffect, useState } from "react";
import { Sprout } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 33.33;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 garden-bg flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="text-center z-10">
        <div className="animate-float">
          <Sprout className="text-6xl text-white mb-4 mx-auto" size={96} />
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-2">UnZone</h1>
        <p className="text-white/80 text-lg">Grow Your Courage Garden</p>
        <div className="mt-8">
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
