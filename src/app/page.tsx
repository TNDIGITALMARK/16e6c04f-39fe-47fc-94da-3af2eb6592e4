'use client';

import { useState } from 'react';
import { CameraCapture } from '@/components/camera-capture';
import { FoodCard } from '@/components/food-card';
import { ProgressRing } from '@/components/progress-ring';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDailyProgress } from '@/lib/mock-data';
import { MealEntry } from '@/lib/types';
import { Plus } from 'lucide-react';

export default function HomePage() {
  const [dailyProgress, setDailyProgress] = useState(mockDailyProgress);

  const handleCapture = (result: {
    foodName: string;
    confidence: number;
    calories: number;
    portion: string;
  }) => {
    // Add the captured food to today's meals
    const newMeal: MealEntry = {
      id: `meal-${Date.now()}`,
      foodItem: {
        id: `food-${Date.now()}`,
        name: result.foodName,
        calories: result.calories,
        portion: result.portion,
        portionSize: 1,
        portionUnit: 'serving',
        imageUrl: '/placeholder-food.png',
      },
      timestamp: new Date(),
      mealType: getMealType(new Date()),
      confidence: result.confidence,
    };

    setDailyProgress((prev) => ({
      ...prev,
      currentCalories: prev.currentCalories + result.calories,
      remainingCalories: prev.remainingCalories - result.calories,
      meals: [...prev.meals, newMeal],
    }));
  };

  const getMealType = (date: Date): 'breakfast' | 'lunch' | 'dinner' | 'snack' => {
    const hour = date.getHours();
    if (hour < 11) return 'breakfast';
    if (hour < 15) return 'lunch';
    if (hour < 18) return 'snack';
    return 'dinner';
  };

  const caloriePercentage = (dailyProgress.currentCalories / dailyProgress.calorieGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center pt-2">
          <h1 className="text-3xl font-bold text-foreground mb-2">CalorieTrack</h1>
          <p className="text-muted-foreground">Track your meals instantly</p>
        </div>

        {/* Daily Progress Summary */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Progress Ring */}
              <div className="flex-shrink-0">
                <ProgressRing
                  percentage={caloriePercentage}
                  size={120}
                  strokeWidth={12}
                  color="hsl(var(--primary))"
                  value={dailyProgress.currentCalories.toString()}
                  label={`of ${dailyProgress.calorieGoal}`}
                />
              </div>

              {/* Stats */}
              <div className="flex-1 w-full grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 rounded-lg bg-accent/30">
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    {dailyProgress.remainingCalories}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Remaining</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <p className="text-xl sm:text-2xl font-bold text-secondary">
                    {dailyProgress.meals.length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Meals Logged</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Capture */}
        <CameraCapture onCapture={handleCapture} />

        {/* Today's Meals */}
        {dailyProgress.meals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today's Meals</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyProgress.meals
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((meal) => (
                  <FoodCard
                    key={meal.id}
                    foodItem={meal.foodItem}
                    mealEntry={meal}
                    showActions={true}
                  />
                ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Add */}
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Plus className="h-6 w-6" />
              <span className="font-semibold">Quick Add Food Manually</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}