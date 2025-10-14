'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockUserProfile, mockWeeklyStats } from '@/lib/mock-data';
import { User, Target, TrendingDown, Award, Settings, Bell, HelpCircle } from 'lucide-react';

export default function ProfilePage() {
  const [profile] = useState(mockUserProfile);
  const [weeklyStats] = useState(mockWeeklyStats);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const achievements = [
    { id: 1, title: '7 Day Streak', icon: '🔥', earned: true },
    { id: 2, title: '50 Meals Logged', icon: '🍽️', earned: true },
    { id: 3, title: 'Weight Goal Reached', icon: '🎯', earned: false },
    { id: 4, title: 'Early Bird', icon: '🌅', earned: true },
    { id: 5, title: 'Consistency Master', icon: '⭐', earned: false },
    { id: 6, title: 'Healthy Choices', icon: '🥗', earned: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
              <Badge className="mt-3" variant="secondary">
                {profile.activityLevel?.replace('_', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{profile.calorieGoal}</p>
              <p className="text-xs text-muted-foreground mt-1">Daily Goal</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingDown className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">
                {profile.weight} <span className="text-base">lbs</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Current Weight</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-amber-500" />
              <p className="text-2xl font-bold text-foreground">
                {weeklyStats.daysOnTrack}/{weeklyStats.totalDays}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Days on Track</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <User className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{profile.age}</p>
              <p className="text-xs text-muted-foreground mt-1">Age</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`text-center p-4 rounded-lg transition-all ${
                    achievement.earned
                      ? 'bg-secondary/10 border-2 border-secondary/30'
                      : 'bg-muted/30 border-2 border-dashed border-muted-foreground/20 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-xs font-medium text-foreground">{achievement.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Settings & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Settings className="mr-3 h-5 w-5" />
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Target className="mr-3 h-5 w-5" />
              Update Goals
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </Button>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">About Your Profile</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Height:</strong> {profile.height} inches
              </p>
              <p>
                <strong>Activity Level:</strong> {profile.activityLevel?.replace('_', ' ')}
              </p>
              <p>
                <strong>Daily Calorie Goal:</strong> {profile.calorieGoal} calories
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
