
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useStore from "@/store/useStore";

interface TrainingFrequencyStepProps {
  onNext: () => void;
  onBack: () => void;
}

const FREQUENCY_OPTIONS = [
  { value: 2, label: "2 days per week" },
  { value: 3, label: "3 days per week" },
  { value: 4, label: "4 days per week" },
  { value: 5, label: "5 days per week" },
  { value: 6, label: "6 days per week" },
];

const TrainingFrequencyStep = ({ onNext, onBack }: TrainingFrequencyStepProps) => {
  const { goals, updateGoal } = useStore();
  const [frequency, setFrequency] = useState<number>(goals.trainingFrequency || 3);

  const handleNext = () => {
    // Update store
    updateGoal("trainingFrequency", frequency);
    
    // Move to next step
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Training Frequency</h2>
        <p className="text-muted-foreground">
          How many days per week can you commit to training?
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup 
          value={frequency.toString()} 
          onValueChange={(value) => setFrequency(Number(value))}
          className="space-y-3"
        >
          {FREQUENCY_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`frequency-${option.value}`} />
              <Label htmlFor={`frequency-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default TrainingFrequencyStep;
