import { useState } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Home } from "@/pages/Home";
import { Garden } from "@/pages/Garden";
import { Journal } from "@/pages/Journal";
import { Community } from "@/pages/Community";
import { Profile } from "@/pages/Profile";

export function MainApp() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "garden":
        return <Garden />;
      case "journal":
        return <Journal />;
      case "community":
        return <Community />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
