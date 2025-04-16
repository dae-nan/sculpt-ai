
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useStore from "@/store/useStore";

interface SummaryStepProps {
  onSubmit: () => void;
  onBack: () => void;
}

const SummaryStep = ({ onSubmit, onBack }: SummaryStepProps) => {
  const { goals, completeGoalSetup } = useStore();
  const { toast } = useToast();
  
  const handleSubmit = () => {
    // In a real app, this would call an API
    console.log("Submitting goals:", goals);
    
    // Mark goal setup as complete
    completeGoalSetup();
    
    toast({
      title: "Goals saved successfully!",
      description: "Now we'll find the perfect coach for you.",
    });
    
    // Move to the next feature (Coach Matching)
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Goals Summary</h2>
        <p className="text-muted-foreground">
          Review your goals before we match you with the perfect coach.
        </p>
      </div>

      <div className="space-y-4 bg-secondary/50 rounded-lg p-4">
        <div>
          <h3 className="font-medium">Body Composition</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <span className="text-sm text-muted-foreground">Current Weight:</span>
              <p>{goals.currentWeight} kg</p>
            </div>
            {goals.targetWeight && (
              <div>
                <span className="text-sm text-muted-foreground">Target Weight:</span>
                <p>{goals.targetWeight} kg</p>
              </div>
            )}
            {goals.currentBodyFat && (
              <div>
                <span className="text-sm text-muted-foreground">Current Body Fat:</span>
                <p>{goals.currentBodyFat}%</p>
              </div>
            )}
            {goals.targetBodyFat && (
              <div>
                <span className="text-sm text-muted-foreground">Target Body Fat:</span>
                <p>{goals.targetBodyFat}%</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium">Fitness Objectives</h3>
          <ul className="list-disc list-inside mt-2">
            {goals.fitnessObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
          {goals.sportSpecific && (
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">Sport Focus:</span>
              <p>{goals.sportSpecific}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium">Training Frequency</h3>
          <p className="mt-2">{goals.trainingFrequency} days per week</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleSubmit}>Submit & Find Coaches</Button>
      </div>
    </div>
  );
};

export default SummaryStep;
