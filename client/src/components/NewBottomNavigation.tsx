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
    <div className="relative bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 shadow-2xl px-4 pb-4 pt-2">
      {/* Navigation Items */}
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          if (item.isCenter) {
            // Floating Garden Button in Center
            return (
              <div key={item.id} className="relative -top-8">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-16 h-16 rounded-full shadow-2xl transition-all duration-300 focus:outline-none
                    bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600
                    hover:from-emerald-500 hover:via-teal-600 hover:to-green-700
                    hover:shadow-emerald-500/30 hover:shadow-3xl
                    border-4 border-white/80
                    ${activeTab === item.id ? "scale-110 ring-4 ring-emerald-300/50" : "hover:scale-105"}
                    animate-float
                  `}
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="relative">
                    <item.icon size={24} className="text-white drop-shadow-lg" />
                    {/* Enhanced sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <span className="text-xs drop-shadow">✨</span>
                    </div>
                    {/* Additional floating sparkles */}
                    <div className="absolute -top-2 left-1 w-1 h-1 bg-white rounded-full animate-ping opacity-70"></div>
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-emerald-200 rounded-full animate-pulse opacity-60"></div>
                  </div>
                </button>
              </div>
            );
          }

          // Enhanced Regular navigation buttons
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center space-y-1 p-3 h-16 rounded-xl transition-all duration-300 
                hover:bg-gray-50 focus:outline-none relative
                ${activeTab === item.id 
                  ? "text-emerald-600 bg-emerald-50/50" 
                  : "text-gray-400 hover:text-gray-600"
                }
              `}
            >
              <item.icon 
                size={22} 
                className={`transition-all duration-300 ${
                  activeTab === item.id ? "scale-110 text-emerald-600" : ""
                }`}
              />
              <span className={`text-xs font-medium transition-all duration-300 ${
                activeTab === item.id ? "font-semibold text-emerald-700" : ""
              }`}>
                {item.label}
              </span>
              {/* Enhanced Active indicator */}
              {activeTab === item.id && (
                <div className="absolute bottom-1 w-6 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-sm"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}