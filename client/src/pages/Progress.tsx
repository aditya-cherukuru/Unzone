import { useState } from "react";
import { TrendingUp, Calendar, Target, Award, BarChart3, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

interface ProgressPageProps {
  onBack?: () => void;
}

export function ProgressPage({ onBack }: ProgressPageProps) {
  const { user } = useAuth();

  const weeklyProgress = [
    { day: "Mon", challenges: 1, completed: 1 },
    { day: "Tue", challenges: 1, completed: 0 },
    { day: "Wed", challenges: 1, completed: 1 },
    { day: "Thu", challenges: 1, completed: 1 },
    { day: "Fri", challenges: 1, completed: 0 },
    { day: "Sat", challenges: 0, completed: 0 },
    { day: "Sun", challenges: 0, completed: 0 },
  ];

  const stats = [
    { label: "Total Challenges", value: user?.totalChallenges || 0, icon: Target, color: "text-blue-600" },
    { label: "Current Streak", value: user?.streak || 0, icon: TrendingUp, color: "text-green-600" },
    { label: "Coins Earned", value: user?.coins || 0, icon: Award, color: "text-yellow-600" },
    { label: "Garden Level", value: user?.gardenLevel || 1, icon: BarChart3, color: "text-purple-600" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBack?.() || window.history.back()}
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold mb-2">Your Progress</h1>
        <p className="text-white/90">Track your growth journey</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Progress */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2" size={20} />
              This Week's Activity
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {weeklyProgress.map((day) => (
                <div key={day.day} className="text-center">
                  <p className="text-xs text-gray-600 mb-2">{day.day}</p>
                  <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-semibold ${
                    day.completed > 0 
                      ? "bg-green-500 text-white" 
                      : day.challenges > 0 
                        ? "bg-red-200 text-red-700"
                        : "bg-gray-200 text-gray-500"
                  }`}>
                    {day.completed}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenge Categories */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Challenge Categories</h3>
            <div className="space-y-3">
              {[
                { name: "Social Confidence", progress: 70, total: 10 },
                { name: "Physical Activity", progress: 45, total: 8 },
                { name: "Creative Expression", progress: 85, total: 6 },
                { name: "Professional Skills", progress: 30, total: 4 },
              ].map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-gray-500">{Math.round(category.progress)}%</span>
                  </div>
                  <Progress value={category.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {[
                { title: "First Challenge Completed", date: "2 days ago", icon: "🎉" },
                { title: "3-Day Streak", date: "1 day ago", icon: "🔥" },
                { title: "Garden Level 2", date: "Today", icon: "🌱" },
              ].map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{achievement.title}</p>
                    <p className="text-gray-500 text-sm">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}