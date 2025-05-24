import { useState } from "react";
import { NewBottomNavigation } from "./NewBottomNavigation";
import { Home } from "@/pages/Home";
import { Garden } from "@/pages/Garden";
import { ProgressPage } from "@/pages/Progress";
import { Community } from "@/pages/Community";
import { Coach } from "@/pages/Coach";

export function MainApp() {
  const [activeTab, setActiveTab] = useState("home");

  const handleBack = () => {
    setActiveTab("home");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "progress":
        return <ProgressPage onBack={handleBack} />;
      case "garden":
        return <Garden onBack={handleBack} />;
      case "community":
        return <Community onBack={handleBack} />;
      case "coach":
        return <Coach onBack={handleBack} />;
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
