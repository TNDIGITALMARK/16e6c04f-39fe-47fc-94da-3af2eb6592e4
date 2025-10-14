'use client';

import { useState, useRef } from 'react';
import { Camera, X, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { simulateFoodRecognition } from '@/lib/mock-data';

interface CameraCaptureProps {
  onCapture?: (result: {
    foodName: string;
    confidence: number;
    calories: number;
    portion: string;
  }) => void;
  className?: string;
}

export function CameraCapture({ onCapture, className = '' }: CameraCaptureProps) {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<{
    foodName: string;
    confidence: number;
    calories: number;
    portion: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      setCapturedImage(imageData);
      setIsActive(true);
      processImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const result = await simulateFoodRecognition(imageData);
      setRecognitionResult({
        foodName: result.foodName,
        confidence: result.confidence,
        calories: result.calories,
        portion: result.portion,
      });
    } catch (error) {
      console.error('Recognition failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = () => {
    if (recognitionResult) {
      onCapture?.(recognitionResult);
      handleReset();
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setCapturedImage(null);
    setRecognitionResult(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isActive && !capturedImage) {
    return (
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse-slow">
                  <Camera className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Capture Your Meal
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Take a photo of your food and we'll instantly recognize it and calculate the calories
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleCameraClick}
                className="h-14 px-8 text-lg rounded-full"
              >
                <Camera className="mr-2 h-5 w-5" />
                Open Camera
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          {/* Preview Image */}
          {capturedImage && (
            <div className="relative rounded-xl overflow-hidden bg-muted mb-6">
              <img
                src={capturedImage}
                alt="Captured food"
                className="w-full h-auto max-h-96 object-contain"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-lg font-medium">Analyzing food...</p>
                    <p className="text-sm opacity-80 mt-1">This won't take long</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recognition Result */}
          {recognitionResult && !isProcessing && (
            <div className="bg-accent/50 rounded-xl p-6 mb-6 animate-slide-up">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {recognitionResult.foodName}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {recognitionResult.portion}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {recognitionResult.calories}
                  </div>
                  <div className="text-xs text-muted-foreground">calories</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 bg-secondary/20 rounded-full h-2">
                  <div
                    className="bg-secondary rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${recognitionResult.confidence}%` }}
                  />
                </div>
                <span className="text-muted-foreground font-medium">
                  {recognitionResult.confidence}% confident
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            {recognitionResult && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCameraClick}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <Button
                  size="lg"
                  onClick={handleConfirm}
                  className="flex-1"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Confirm
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
