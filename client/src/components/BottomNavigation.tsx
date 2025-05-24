import { Home, Sprout, BookOpen, Users, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "garden", icon: Sprout, label: "Garden" },
    { id: "journal", icon: BookOpen, label: "Journal" },
    { id: "community", icon: Users, label: "Community" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
