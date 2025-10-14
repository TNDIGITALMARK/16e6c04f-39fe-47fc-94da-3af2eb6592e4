'use client';

import Image from 'next/image';
import { Star, Trash2, Edit3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodItem, MealEntry } from '@/lib/types';

interface FoodCardProps {
  foodItem: FoodItem;
  mealEntry?: MealEntry;
  showActions?: boolean;
  onFavorite?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onClick?: () => void;
  className?: string;
}

export function FoodCard({
  foodItem,
  mealEntry,
  showActions = false,
  onFavorite,
  onDelete,
  onEdit,
  onClick,
  className = '',
}: FoodCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(foodItem.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(foodItem.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(foodItem.id);
  };

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg cursor-pointer animate-slide-up ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-4">
          {/* Food Image */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
            <Image
              src={foodItem.imageUrl}
              alt={foodItem.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          {/* Food Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-foreground truncate">{foodItem.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{foodItem.portion}</p>
            {mealEntry && (
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(mealEntry.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>

          {/* Calories Badge */}
          <div className="flex-shrink-0 text-right">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
              <span className="text-lg font-semibold">{foodItem.calories}</span>
              <span className="text-xs ml-1">cal</span>
            </div>
            {mealEntry?.confidence && (
              <p className="text-xs text-muted-foreground mt-1">{mealEntry.confidence}% match</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-end gap-2 px-4 pb-4 pt-0 border-t border-border/50 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className="h-8 w-8 p-0"
            >
              <Star className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditClick}
              className="h-8 w-8 p-0"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Macros Preview (optional) */}
        {foodItem.protein !== undefined && (
          <div className="flex items-center gap-4 px-4 pb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-medium">P:</span>
              <span>{foodItem.protein}g</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">C:</span>
              <span>{foodItem.carbs}g</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">F:</span>
              <span>{foodItem.fat}g</span>
            </div>
            {foodItem.fiber !== undefined && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Fiber:</span>
                <span>{foodItem.fiber}g</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
