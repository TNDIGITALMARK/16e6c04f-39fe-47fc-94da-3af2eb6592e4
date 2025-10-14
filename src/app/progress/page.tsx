'use client';

import { useState } from 'react';
import { ProgressRing } from '@/components/progress-ring';
import { FoodCard } from '@/components/food-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDailyProgress, mockWeeklyStats, calculateMacroPercentages } from '@/lib/mock-data';
import { TrendingDown, TrendingUp, Target, Calendar } from 'lucide-react';

export default function ProgressPage() {
  const [dailyProgress] = useState(mockDailyProgress);
  const [weeklyStats] = useState(mockWeeklyStats);

  const macros = calculateMacroPercentages(dailyProgress.meals);
  const caloriePercentage = (dailyProgress.currentCalories / dailyProgress.calorieGoal) * 100;
  const onTrackPercentage = (weeklyStats.daysOnTrack / weeklyStats.totalDays) * 100;

  // Group meals by type
  const mealsByType = dailyProgress.meals.reduce(
    (acc, meal) => {
      if (!acc[meal.mealType]) {
        acc[meal.mealType] = [];
      }
      acc[meal.mealType].push(meal);
      return acc;
    },
    {} as Record<string, typeof dailyProgress.meals>
  );

  const getMealTypeCalories = (type: string) => {
    return mealsByType[type]?.reduce((sum, meal) => sum + meal.foodItem.calories, 0) || 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center pt-2">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your nutrition journey</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-6 mt-6">
            {/* Daily Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <ProgressRing
                    percentage={caloriePercentage}
                    size={160}
                    strokeWidth={14}
                    color="hsl(var(--primary))"
                    value={dailyProgress.currentCalories.toString()}
                    label={`of ${dailyProgress.calorieGoal} cal`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{dailyProgress.calorieGoal}</p>
                    <p className="text-xs text-muted-foreground mt-1">Goal</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold text-foreground">{dailyProgress.currentCalories}</p>
                    <p className="text-xs text-muted-foreground mt-1">Consumed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/30 border border-accent/40">
                    <TrendingDown className="h-6 w-6 mx-auto mb-2 text-accent-foreground" />
                    <p className="text-2xl font-bold text-foreground">{dailyProgress.remainingCalories}</p>
                    <p className="text-xs text-muted-foreground mt-1">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Macro Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Macro Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Protein */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Protein</span>
                    <span className="text-sm text-muted-foreground">{macros.protein}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${macros.protein}%` }}
                    />
                  </div>
                </div>

                {/* Carbs */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Carbohydrates</span>
                    <span className="text-sm text-muted-foreground">{macros.carbs}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-secondary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${macros.carbs}%` }}
                    />
                  </div>
                </div>

                {/* Fat */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Fat</span>
                    <span className="text-sm text-muted-foreground">{macros.fat}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-amber-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${macros.fat}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meal Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Meals by Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
                  const calories = getMealTypeCalories(mealType);
                  const percentage = (calories / dailyProgress.currentCalories) * 100;

                  return (
                    <div key={mealType}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {mealType}
                        </span>
                        <span className="text-sm text-muted-foreground">{calories} cal</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage || 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Today's Meals List */}
            <Card>
              <CardHeader>
                <CardTitle>Meal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyProgress.meals
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((meal) => (
                    <FoodCard key={meal.id} foodItem={meal.foodItem} mealEntry={meal} />
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Week Tab */}
          <TabsContent value="week" className="space-y-6 mt-6">
            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center">
                  <ProgressRing
                    percentage={onTrackPercentage}
                    size={140}
                    strokeWidth={12}
                    color="hsl(var(--secondary))"
                    value={`${weeklyStats.daysOnTrack}/${weeklyStats.totalDays}`}
                    label="days on track"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-3xl font-bold text-secondary">{weeklyStats.averageCalories}</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg. Daily Calories</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-3xl font-bold text-primary">
                      {weeklyStats.weightTrend && weeklyStats.weightTrend > 0 ? '+' : ''}
                      {weeklyStats.weightTrend}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">lbs Change</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Insights */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle>Insights & Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Great consistency!</p>
                    <p className="text-sm text-muted-foreground">
                      You've logged meals {weeklyStats.daysOnTrack} out of {weeklyStats.totalDays} days this week
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium text-foreground">Average intake on target</p>
                    <p className="text-sm text-muted-foreground">
                      Your average daily calories ({weeklyStats.averageCalories}) is close to your goal
                    </p>
                  </div>
                </div>

                {weeklyStats.weightTrend && weeklyStats.weightTrend < 0 && (
                  <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                    <div>
                      <p className="font-medium text-foreground">Weight progress detected</p>
                      <p className="text-sm text-muted-foreground">
                        You're down {Math.abs(weeklyStats.weightTrend)} lbs this week. Keep it up!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
