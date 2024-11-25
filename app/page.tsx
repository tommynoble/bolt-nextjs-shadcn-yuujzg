import { DamageAnalyzer } from "@/components/damage-analyzer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <DamageAnalyzer />
      </div>
    </main>
  );
}