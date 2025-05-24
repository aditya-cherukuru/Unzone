import { Trophy, Heart, MessageCircle, Share } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

interface CommunityProps {
  onBack?: () => void;
}

export function Community({ onBack }: CommunityProps = {}) {
  const { user } = useAuth();

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: "Alex Chen", challengesCompleted: 12, coins: 340, initials: "AC" },
    { rank: 2, name: user?.name || "You", challengesCompleted: 8, coins: user?.coins || 247, initials: user?.name?.split(' ').map(n => n[0]).join('') || "Y", isCurrentUser: true },
    { rank: 3, name: "Maya Patel", challengesCompleted: 7, coins: 189, initials: "MP" },
  ];

  // Mock feed data
  const feedItems = [
    {
      id: 1,
      username: "Alex Chen",
      timestamp: "2h ago",
      achievement: "Completed \"Give a genuine compliment to 3 people\" and grew a beautiful Kindness Rose! 🌹",
      likes: 12,
      comments: 3,
      initials: "AC"
    },
    {
      id: 2,
      username: "Maya Patel",
      timestamp: "4h ago",
      achievement: "Just finished my first week! Started with zero confidence and now I've talked to 5 strangers. My garden is looking amazing! 🌱✨",
      likes: 24,
      comments: 8,
      initials: "MP"
    },
    {
      id: 3,
      username: "Jordan Smith",
      timestamp: "1d ago",
      achievement: "Tried watercolor painting for the first time today. It was messy but incredibly relaxing! 🎨",
      likes: 15,
      comments: 5,
      initials: "JS"
    }
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please sign in to view the community</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6 pt-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Community</h1>
        
        {/* Leaderboard */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Leaderboard</h3>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center space-x-4 p-3 rounded-xl transition-colors ${
                    user.isCurrentUser
                      ? "bg-primary-50 border border-primary-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    user.rank === 1 ? "bg-gradient-to-br from-primary-400 to-primary-500" :
                    user.rank === 2 ? "bg-gradient-to-br from-primary-500 to-primary-600" :
                    "bg-gradient-to-br from-yellow-400 to-yellow-500"
                  }`}>
                    {user.rank}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      {user.isCurrentUser ? `${user.name} (You)` : user.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {user.challengesCompleted} challenges completed
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Trophy className="text-yellow-500" size={16} />
                      <span className="font-semibold text-gray-800">{user.coins}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Community Feed */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Achievements</h3>
          
          {feedItems.map((item) => (
            <Card key={item.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-800">{item.username}</h4>
                      <span className="text-gray-400 text-sm">{item.timestamp}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.achievement}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 hover:text-primary-500 transition-colors p-0 h-auto"
                      >
                        <Heart size={16} />
                        <span>{item.likes}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 hover:text-primary-500 transition-colors p-0 h-auto"
                      >
                        <MessageCircle size={16} />
                        <span>{item.comments}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 hover:text-primary-500 transition-colors p-0 h-auto"
                      >
                        <Share size={16} />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
