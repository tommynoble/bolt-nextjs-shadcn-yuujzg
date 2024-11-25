"use client";

import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/image-upload";
import { DamageResults } from "@/components/damage-results";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DamageAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
    setError(null);
    setResults(null);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setAnalyzing(true);
    setError(null);

    try {
      // Simulated API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults({
        severity: "Moderate",
        location: "Front Bumper",
        estimatedCost: "$1,200 - $1,500",
        recommendations: [
          "Replace front bumper",
          "Paint matching required",
          "Check impact absorber"
        ]
      });
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Vehicle Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload
            value={image}
            onChange={handleImageUpload}
            disabled={analyzing}
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={analyzeImage}
            disabled={!image || analyzing}
          >
            {analyzing ? (
              <>Analyzing Damage...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Analyze Damage
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results && <DamageResults results={results} />}
    </div>
  );
}