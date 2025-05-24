import { Home, BarChart3, Users, MessageCircle, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewBottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack?: () => void;
}

export function NewBottomNavigation({ activeTab, onTabChange }: NewBottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "progress", icon: BarChart3, label: "Progress" },
    { id: "garden", icon: Flower2, label: "Garden", isCenter: true },
    { id: "community", icon: Users, label: "Community" },
    { id: "coach", icon: MessageCircle, label: "Coach" },
  ];

  return (
    <div className="relative bg-white border-t border-gray-200 px-4 pb-4 pt-2">
      {/* Navigation Items */}
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          if (item.isCenter) {
            // Floating Garden Button in Center
            return (
              <div key={item.id} className="relative -top-8">
                <Button
                  onClick={() => onTabChange(item.id)}
                  className={`w-16 h-16 rounded-full shadow-2xl border-4 border-white transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 scale-110"
                      : "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 hover:scale-105"
                  } animate-float`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="relative">
                    <item.icon size={24} className="text-white" />
                    {/* Sparkle effect for garden button */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-xs">✨</span>
                    </div>
                  </div>
                </Button>
              </div>
            );
          }

          // Regular navigation buttons
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 h-16 transition-all duration-200 ${
                activeTab === item.id
                  ? "text-purple-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-transform duration-200 ${
                  activeTab === item.id ? "scale-110" : ""
                }`}
              />
              <span className={`text-xs font-medium ${
                activeTab === item.id ? "font-semibold" : ""
              }`}>
                {item.label}
              </span>
              {/* Active indicator */}
              {activeTab === item.id && (
                <div className="w-1 h-1 bg-purple-600 rounded-full absolute bottom-1"></div>
              )}
            </Button>
          );
        })}
      </div>

      {/* Background decoration for floating button */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 w-20 h-6 bg-white rounded-t-full"></div>
    </div>
  );
}