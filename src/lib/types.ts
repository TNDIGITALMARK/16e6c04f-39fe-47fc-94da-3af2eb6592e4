// CalorieTrack Type Definitions

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  portion: string;
  portionSize: number;
  portionUnit: string;
  imageUrl: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

export interface MealEntry {
  id: string;
  foodItem: FoodItem;
  timestamp: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  confidence?: number;
}

export interface DailyProgress {
  date: Date;
  calorieGoal: number;
  currentCalories: number;
  remainingCalories: number;
  meals: MealEntry[];
  waterIntake?: number;
  exerciseCalories?: number;
}

export interface WeeklyStats {
  weekStart: Date;
  weekEnd: Date;
  averageCalories: number;
  daysOnTrack: number;
  totalDays: number;
  weightTrend?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  calorieGoal: number;
  weight?: number;
  height?: number;
  age?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface CameraState {
  isActive: boolean;
  isProcessing: boolean;
  capturedImage?: string;
  recognitionResult?: {
    foodName: string;
    confidence: number;
    calories: number;
    portion: string;
  };
  error?: string;
}

export interface FoodRecognitionResult {
  foodName: string;
  confidence: number;
  estimatedCalories: number;
  portion: string;
  marginOfError: number;
  suggestions?: FoodItem[];
}
