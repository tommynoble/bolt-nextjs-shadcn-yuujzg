import { Car } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Vehicle Damage Analyzer</h1>
        </div>
      </div>
    </header>
  );
}