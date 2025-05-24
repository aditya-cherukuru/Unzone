import { useState } from "react";
import { Trophy, Calendar, Target, Settings, Download, LogOut, Moon, Bell, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Social Butterfly",
      description: "Completed 10 social challenges",
      icon: "🏆",
      date: "Dec 14",
      color: "yellow"
    },
    {
      id: 2,
      title: "Green Thumb",
      description: "Grew your first 5 plants",
      icon: "🌱",
      date: "Dec 10",
      color: "green"
    },
    {
      id: 3,
      title: "Reflective Writer",
      description: "Wrote 7 consecutive journal entries",
      icon: "📔",
      date: "Dec 8",
      color: "blue"
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed out successfully",
        description: "See you next time!",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleEditProfile = () => {
    toast({
      title: "Coming soon",
      description: "Profile editing will be available soon",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready shortly",
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please sign in to view your profile</p>
      </div>
    );
  }

  const userInitials = user.name?.split(' ').map(n => n[0]).join('') || 'U';

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6 pt-16">
        {/* Profile Header */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-500 text-white text-2xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-500 mb-4">
              Growing since {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { 
                month: "long", 
                year: "numeric" 
              }) : "Recently"}
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{user.totalChallenges || 0}</div>
                <p className="text-gray-500 text-sm">Challenges</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{user.streak || 0}</div>
                <p className="text-gray-500 text-sm">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{user.gardenLevel || 1}</div>
                <p className="text-gray-500 text-sm">Garden Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Achievements */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-xl border ${
                    achievement.color === "yellow" ? "bg-yellow-50 border-yellow-200" :
                    achievement.color === "green" ? "bg-green-50 border-green-200" :
                    "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                    <p className="text-gray-500 text-sm">{achievement.description}</p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      achievement.color === "yellow" ? "bg-yellow-100 text-yellow-600" :
                      achievement.color === "green" ? "bg-green-100 text-green-600" :
                      "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {achievement.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Settings */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="text-gray-500" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800">Dark Mode</h4>
                    <p className="text-gray-500 text-sm">Switch to dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="text-gray-500" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800">Notifications</h4>
                    <p className="text-gray-500 text-sm">Daily challenge reminders</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <Button
                variant="ghost"
                onClick={handleEditProfile}
                className="w-full justify-start p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <Edit className="mr-3 text-gray-500" size={20} />
                <div className="text-left">
                  <h4 className="font-medium text-gray-800">Edit Profile</h4>
                  <p className="text-gray-500 text-sm">Update your comfort zone preferences</p>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleExportData}
                className="w-full justify-start p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <Download className="mr-3 text-gray-500" size={20} />
                <div className="text-left">
                  <h4 className="font-medium text-gray-800">Export Data</h4>
                  <p className="text-gray-500 text-sm">Download your journal and progress</p>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start p-3 rounded-xl hover:bg-red-50 text-red-600 transition-all duration-200"
              >
                <LogOut className="mr-3" size={20} />
                <div className="text-left">
                  <h4 className="font-medium">Sign Out</h4>
                  <p className="text-red-500 text-sm">Sign out of your account</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
