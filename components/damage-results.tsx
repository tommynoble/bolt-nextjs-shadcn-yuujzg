import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, DollarSign, MapPin } from "lucide-react";

interface DamageResultsProps {
  results: {
    severity: string;
    location: string;
    estimatedCost: string;
    recommendations: string[];
  };
}

export function DamageResults({ results }: DamageResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Damage Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Severity Level</div>
            <div className="font-semibold">{results.severity}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Location</div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{results.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Estimated Cost</div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{results.estimatedCost}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Recommendations</div>
          <ul className="list-inside list-disc space-y-1">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="text-sm">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}