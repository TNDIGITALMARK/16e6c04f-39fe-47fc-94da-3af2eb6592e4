'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/search-bar';
import { FoodCard } from '@/components/food-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockFoodDatabase } from '@/lib/mock-data';
import { Star, Clock, TrendingUp } from 'lucide-react';

export default function FoodsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter foods based on search query
  const filteredFoods = useMemo(() => {
    return mockFoodDatabase.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Popular foods (foods with highest calories, representing "popular" for demo)
  const popularFoods = useMemo(() => {
    return [...mockFoodDatabase]
      .sort((a, b) => b.calories - a.calories)
      .slice(0, 6);
  }, []);

  // Recent searches (simulated - just showing first few foods)
  const recentFoods = useMemo(() => {
    return mockFoodDatabase.slice(0, 5);
  }, []);

  // Categories
  const categories = [
    { id: 'all', label: 'All Foods', count: mockFoodDatabase.length },
    { id: 'protein', label: 'High Protein', count: 8 },
    { id: 'low-cal', label: 'Low Calorie', count: 6 },
    { id: 'breakfast', label: 'Breakfast', count: 4 },
    { id: 'snacks', label: 'Snacks', count: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center pt-2">
          <h1 className="text-3xl font-bold text-foreground mb-2">Food Database</h1>
          <p className="text-muted-foreground">Search and explore nutrition information</p>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search for foods..."
          onChange={setSearchQuery}
          className="sticky top-4 z-10"
        />

        {/* Quick Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Browse
              </span>
            </TabsTrigger>
            <TabsTrigger value="popular">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Popular
              </span>
            </TabsTrigger>
            <TabsTrigger value="recent">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Search Results */}
          <TabsContent value="search" className="space-y-4 mt-6">
            {searchQuery ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredFoods.length} {filteredFoods.length === 1 ? 'result' : 'results'}
                  </p>
                </div>
                {filteredFoods.length > 0 ? (
                  <div className="space-y-3">
                    {filteredFoods.map((food) => (
                      <FoodCard key={food.id} foodItem={food} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No foods found matching "{searchQuery}"</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Try a different search term
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>All Foods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockFoodDatabase.map((food) => (
                    <FoodCard key={food.id} foodItem={food} />
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Popular Foods */}
          <TabsContent value="popular" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Most Popular Foods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularFoods.map((food, index) => (
                  <div key={food.id} className="relative">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="pl-8">
                      <FoodCard foodItem={food} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="font-semibold text-foreground">Trending This Week</p>
                    <p className="text-sm text-muted-foreground">
                      These foods are logged most frequently by users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Foods */}
          <TabsContent value="recent" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recently Searched
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentFoods.map((food) => (
                  <FoodCard key={food.id} foodItem={food} />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Quick Access</p>
                    <p className="text-sm text-muted-foreground">
                      Your recently searched foods appear here for easy access
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Nutrition Guide */}
        <Card className="bg-gradient-to-br from-secondary/10 to-primary/10">
          <CardHeader>
            <CardTitle>Nutrition Guide</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-card rounded-lg">
              <p className="text-2xl font-bold text-blue-500">P</p>
              <p className="text-xs text-muted-foreground mt-1">Protein</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <p className="text-2xl font-bold text-secondary">C</p>
              <p className="text-xs text-muted-foreground mt-1">Carbs</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <p className="text-2xl font-bold text-amber-500">F</p>
              <p className="text-xs text-muted-foreground mt-1">Fat</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <p className="text-2xl font-bold text-green-500">Fb</p>
              <p className="text-xs text-muted-foreground mt-1">Fiber</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
