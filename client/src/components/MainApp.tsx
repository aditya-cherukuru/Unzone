import { useState } from "react";
import { NewBottomNavigation } from "./NewBottomNavigation";
import { Home } from "@/pages/Home";
import { Garden } from "@/pages/Garden";
import { ProgressPage } from "@/pages/Progress";
import { Community } from "@/pages/Community";
import { Coach } from "@/pages/Coach";

export function MainApp() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "progress":
        return <ProgressPage />;
      case "garden":
        return <Garden />;
      case "community":
        return <Community />;
      case "coach":
        return <Coach />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      <NewBottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
