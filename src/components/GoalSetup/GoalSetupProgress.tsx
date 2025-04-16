
import { Progress } from "@/components/ui/progress";

interface GoalSetupProgressProps {
  currentStep: number;
  totalSteps: number;
}

const GoalSetupProgress = ({ currentStep, totalSteps }: GoalSetupProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default GoalSetupProgress;
