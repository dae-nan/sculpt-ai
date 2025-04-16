
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useStore from "@/store/useStore";

interface WeightBodyFatStepProps {
  onNext: () => void;
}

const WeightBodyFatStep = ({ onNext }: WeightBodyFatStepProps) => {
  const { goals, updateGoal } = useStore();
  const { toast } = useToast();
  
  const [currentWeight, setCurrentWeight] = useState(goals.currentWeight?.toString() || "");
  const [targetWeight, setTargetWeight] = useState(goals.targetWeight?.toString() || "");
  const [currentBodyFat, setCurrentBodyFat] = useState(goals.currentBodyFat?.toString() || "");
  const [targetBodyFat, setTargetBodyFat] = useState(goals.targetBodyFat?.toString() || "");

  const handleNext = () => {
    // Validate inputs if needed
    if (!currentWeight.trim()) {
      toast({
        title: "Current weight is required",
        description: "Please enter your current weight to continue.",
        variant: "destructive",
      });
      return;
    }

    // Update store
    updateGoal("currentWeight", currentWeight ? Number(currentWeight) : undefined);
    updateGoal("targetWeight", targetWeight ? Number(targetWeight) : undefined);
    updateGoal("currentBodyFat", currentBodyFat ? Number(currentBodyFat) : undefined);
    updateGoal("targetBodyFat", targetBodyFat ? Number(targetBodyFat) : undefined);
    
    // Move to next step
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Body Composition Goals</h2>
        <p className="text-muted-foreground">
          Let's understand where you are and where you want to be.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="current-weight">Current Weight (kg)</Label>
          <Input
            id="current-weight"
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            placeholder="e.g., 75"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-weight">Target Weight (kg)</Label>
          <Input
            id="target-weight"
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder="e.g., 70"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="current-bodyfat">Current Body Fat %</Label>
          <Input
            id="current-bodyfat"
            type="number"
            value={currentBodyFat}
            onChange={(e) => setCurrentBodyFat(e.target.value)}
            placeholder="e.g., 25"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-bodyfat">Target Body Fat %</Label>
          <Input
            id="target-bodyfat"
            type="number"
            value={targetBodyFat}
            onChange={(e) => setTargetBodyFat(e.target.value)}
            placeholder="e.g., 15"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default WeightBodyFatStep;
