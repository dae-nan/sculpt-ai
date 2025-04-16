
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { coaches, getCoachesByObjectives } from "@/data/coaches";
import { Coach } from "@/store/useStore";
import useStore from "@/store/useStore";
import CoachCard from "./CoachCard";

interface CoachMatchingResultsProps {
  onComplete: () => void;
}

const CoachMatchingResults = ({ onComplete }: CoachMatchingResultsProps) => {
  const { goals, selectedCoach, setSelectedCoach } = useStore();
  const [matchedCoaches, setMatchedCoaches] = useState<Coach[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get coaches based on user's goals
    const filteredCoaches = getCoachesByObjectives(
      goals.fitnessObjectives,
      goals.sportSpecific
    );
    
    setMatchedCoaches(filteredCoaches);
  }, [goals]);

  const handleSelectCoach = (coach: Coach) => {
    setSelectedCoach(coach);
  };

  const handleComplete = () => {
    if (!selectedCoach) {
      toast({
        title: "Please select a coach",
        description: "You must select a coach to continue.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to save the selection
    console.log("Selected coach:", selectedCoach);
    
    toast({
      title: "Coach selected!",
      description: `You've selected ${selectedCoach.name} as your coach.`,
    });
    
    // Move to the next feature
    onComplete();
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Your Matched Coaches</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your goals, we've matched you with these expert coaches. 
          Select the one whose approach resonates with you the most.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {matchedCoaches.map((coach) => (
          <CoachCard
            key={coach.id}
            coach={coach}
            isSelected={selectedCoach?.id === coach.id}
            onSelect={handleSelectCoach}
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={handleComplete} disabled={!selectedCoach}>
          Continue with Selected Coach
        </Button>
      </div>
    </div>
  );
};

export default CoachMatchingResults;
