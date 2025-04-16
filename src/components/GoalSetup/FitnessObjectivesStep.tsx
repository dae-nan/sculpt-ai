
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useStore from "@/store/useStore";

interface FitnessObjectivesStepProps {
  onNext: () => void;
  onBack: () => void;
}

const FitnessObjectivesStep = ({ onNext, onBack }: FitnessObjectivesStepProps) => {
  const { goals, updateGoal } = useStore();
  const { toast } = useToast();
  
  const [fitnessObjectives, setFitnessObjectives] = useState(goals.fitnessObjectives.join(", ") || "");
  const [sportSpecific, setSportSpecific] = useState(goals.sportSpecific || "");

  const handleNext = () => {
    // Validate inputs
    if (!fitnessObjectives.trim()) {
      toast({
        title: "Fitness objectives are required",
        description: "Please enter at least one fitness objective to continue.",
        variant: "destructive",
      });
      return;
    }

    // Parse objectives into array
    const objectivesArray = fitnessObjectives
      .split(",")
      .map(obj => obj.trim())
      .filter(obj => obj.length > 0);

    // Update store
    updateGoal("fitnessObjectives", objectivesArray);
    updateGoal("sportSpecific", sportSpecific);
    
    // Move to next step
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Fitness Objectives</h2>
        <p className="text-muted-foreground">
          Tell us about your fitness goals and any sports you participate in.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fitness-objectives">
            What are your main fitness objectives?
          </Label>
          <Textarea
            id="fitness-objectives"
            value={fitnessObjectives}
            onChange={(e) => setFitnessObjectives(e.target.value)}
            placeholder="e.g., build muscle, lose fat, improve endurance (separate with commas)"
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Separate multiple objectives with commas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sport-specific">
            Any specific sport you'd like to improve in? (optional)
          </Label>
          <Input
            id="sport-specific"
            value={sportSpecific}
            onChange={(e) => setSportSpecific(e.target.value)}
            placeholder="e.g., field hockey, basketball, running"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default FitnessObjectivesStep;
