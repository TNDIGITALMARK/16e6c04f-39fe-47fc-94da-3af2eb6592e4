// CalorieTrack Mock Data

import { FoodItem, MealEntry, DailyProgress, WeeklyStats, UserProfile } from './types';

// Mock Food Items
export const mockFoodItems: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Avocado Toast',
    calories: 340,
    portion: '2 slices',
    portionSize: 2,
    portionUnit: 'slices',
    imageUrl: '/generated/avocado-toast.png',
    protein: 12,
    carbs: 38,
    fat: 18,
    fiber: 10,
  },
  {
    id: 'food-2',
    name: 'Grilled Chicken Salad',
    calories: 425,
    portion: '1 bowl',
    portionSize: 1,
    portionUnit: 'bowl',
    imageUrl: '/generated/chicken-salad.png',
    protein: 42,
    carbs: 22,
    fat: 18,
    fiber: 6,
  },
  {
    id: 'food-3',
    name: 'Greek Yogurt',
    calories: 150,
    portion: '1 cup',
    portionSize: 1,
    portionUnit: 'cup',
    imageUrl: '/generated/greek-yogurt.png',
    protein: 20,
    carbs: 12,
    fat: 4,
    fiber: 2,
  },
  {
    id: 'food-4',
    name: 'Salmon with Rice & Vegetables',
    calories: 532,
    portion: '1 plate',
    portionSize: 1,
    portionUnit: 'plate',
    imageUrl: '/generated/salmon-rice.png',
    protein: 38,
    carbs: 52,
    fat: 16,
    fiber: 6,
  },
  {
    id: 'food-5',
    name: 'Banana',
    calories: 105,
    portion: '1 medium',
    portionSize: 1,
    portionUnit: 'medium',
    imageUrl: '/placeholder-banana.png',
    protein: 1,
    carbs: 27,
    fat: 0,
    fiber: 3,
  },
  {
    id: 'food-6',
    name: 'Almonds',
    calories: 164,
    portion: '1 oz (23 nuts)',
    portionSize: 1,
    portionUnit: 'oz',
    imageUrl: '/placeholder-almonds.png',
    protein: 6,
    carbs: 6,
    fat: 14,
    fiber: 3,
  },
  {
    id: 'food-7',
    name: 'Protein Smoothie',
    calories: 280,
    portion: '16 oz',
    portionSize: 16,
    portionUnit: 'oz',
    imageUrl: '/placeholder-smoothie.png',
    protein: 25,
    carbs: 35,
    fat: 6,
    fiber: 5,
  },
  {
    id: 'food-8',
    name: 'Oatmeal with Berries',
    calories: 310,
    portion: '1 bowl',
    portionSize: 1,
    portionUnit: 'bowl',
    imageUrl: '/placeholder-oatmeal.png',
    protein: 10,
    carbs: 54,
    fat: 7,
    fiber: 8,
  },
];

// Mock Meal Entries
export const mockMealEntries: MealEntry[] = [
  {
    id: 'meal-1',
    foodItem: mockFoodItems[0], // Avocado Toast
    timestamp: new Date(new Date().setHours(8, 30, 0, 0)),
    mealType: 'breakfast',
    confidence: 87,
  },
  {
    id: 'meal-2',
    foodItem: mockFoodItems[1], // Grilled Chicken Salad
    timestamp: new Date(new Date().setHours(12, 45, 0, 0)),
    mealType: 'lunch',
    confidence: 92,
  },
  {
    id: 'meal-3',
    foodItem: mockFoodItems[2], // Greek Yogurt
    timestamp: new Date(new Date().setHours(15, 20, 0, 0)),
    mealType: 'snack',
    confidence: 95,
  },
  {
    id: 'meal-4',
    foodItem: mockFoodItems[3], // Salmon with Rice
    timestamp: new Date(new Date().setHours(18, 30, 0, 0)),
    mealType: 'dinner',
    confidence: 89,
  },
];

// Mock Daily Progress
export const mockDailyProgress: DailyProgress = {
  date: new Date(),
  calorieGoal: 2000,
  currentCalories: 1447,
  remainingCalories: 553,
  meals: mockMealEntries,
  waterIntake: 6,
  exerciseCalories: 250,
};

// Mock Weekly Stats
export const mockWeeklyStats: WeeklyStats = {
  weekStart: new Date(new Date().setDate(new Date().getDate() - 7)),
  weekEnd: new Date(),
  averageCalories: 1890,
  daysOnTrack: 5,
  totalDays: 7,
  weightTrend: -2,
};

// Mock User Profile
export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  calorieGoal: 2000,
  weight: 165,
  height: 68,
  age: 32,
  activityLevel: 'moderate',
};

// Mock Food Database (expanded list for search)
export const mockFoodDatabase: FoodItem[] = [
  ...mockFoodItems,
  {
    id: 'food-9',
    name: 'Apple',
    calories: 95,
    portion: '1 medium',
    portionSize: 1,
    portionUnit: 'medium',
    imageUrl: '/placeholder-apple.png',
    protein: 0,
    carbs: 25,
    fat: 0,
    fiber: 4,
  },
  {
    id: 'food-10',
    name: 'Brown Rice',
    calories: 216,
    portion: '1 cup cooked',
    portionSize: 1,
    portionUnit: 'cup',
    imageUrl: '/placeholder-rice.png',
    protein: 5,
    carbs: 45,
    fat: 2,
    fiber: 4,
  },
  {
    id: 'food-11',
    name: 'Grilled Chicken Breast',
    calories: 165,
    portion: '3.5 oz',
    portionSize: 3.5,
    portionUnit: 'oz',
    imageUrl: '/placeholder-chicken.png',
    protein: 31,
    carbs: 0,
    fat: 4,
    fiber: 0,
  },
  {
    id: 'food-12',
    name: 'Broccoli',
    calories: 55,
    portion: '1 cup cooked',
    portionSize: 1,
    portionUnit: 'cup',
    imageUrl: '/placeholder-broccoli.png',
    protein: 4,
    carbs: 11,
    fat: 1,
    fiber: 5,
  },
  {
    id: 'food-13',
    name: 'Eggs',
    calories: 140,
    portion: '2 large',
    portionSize: 2,
    portionUnit: 'large',
    imageUrl: '/placeholder-eggs.png',
    protein: 12,
    carbs: 1,
    fat: 10,
    fiber: 0,
  },
  {
    id: 'food-14',
    name: 'Whole Wheat Bread',
    calories: 80,
    portion: '1 slice',
    portionSize: 1,
    portionUnit: 'slice',
    imageUrl: '/placeholder-bread.png',
    protein: 4,
    carbs: 14,
    fat: 1,
    fiber: 2,
  },
  {
    id: 'food-15',
    name: 'Peanut Butter',
    calories: 190,
    portion: '2 tbsp',
    portionSize: 2,
    portionUnit: 'tbsp',
    imageUrl: '/placeholder-peanut-butter.png',
    protein: 8,
    carbs: 7,
    fat: 16,
    fiber: 2,
  },
];

// Helper function to calculate macro percentages
export function calculateMacroPercentages(meals: MealEntry[]) {
  const totals = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + (meal.foodItem.protein || 0),
      carbs: acc.carbs + (meal.foodItem.carbs || 0),
      fat: acc.fat + (meal.foodItem.fat || 0),
    }),
    { protein: 0, carbs: 0, fat: 0 }
  );

  const totalGrams = totals.protein + totals.carbs + totals.fat;

  return {
    protein: totalGrams > 0 ? Math.round((totals.protein / totalGrams) * 100) : 0,
    carbs: totalGrams > 0 ? Math.round((totals.carbs / totalGrams) * 100) : 0,
    fat: totalGrams > 0 ? Math.round((totals.fat / totalGrams) * 100) : 0,
  };
}

// Simulated camera recognition function
export function simulateFoodRecognition(imageData: string): Promise<{
  foodName: string;
  confidence: number;
  calories: number;
  portion: string;
  marginOfError: number;
  suggestions: FoodItem[];
}> {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Pick a random food item from the database
      const randomFood = mockFoodDatabase[Math.floor(Math.random() * mockFoodDatabase.length)];

      resolve({
        foodName: randomFood.name,
        confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
        calories: randomFood.calories,
        portion: randomFood.portion,
        marginOfError: 50,
        suggestions: mockFoodDatabase.slice(0, 3),
      });
    }, 1500);
  });
}
