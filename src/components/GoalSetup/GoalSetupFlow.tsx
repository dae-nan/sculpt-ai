
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useStore from "@/store/useStore";
import GoalSetupProgress from "./GoalSetupProgress";
import WeightBodyFatStep from "./WeightBodyFatStep";
import FitnessObjectivesStep from "./FitnessObjectivesStep";
import TrainingFrequencyStep from "./TrainingFrequencyStep";
import SummaryStep from "./SummaryStep";

interface GoalSetupFlowProps {
  onComplete: () => void;
}

const GoalSetupFlow = ({ onComplete }: GoalSetupFlowProps) => {
  const { currentStep, setCurrentStep } = useStore();
  
  const goToNextStep = () => setCurrentStep(currentStep + 1);
  const goToPreviousStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <GoalSetupProgress currentStep={currentStep} totalSteps={4} />
      
      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <WeightBodyFatStep onNext={goToNextStep} />
          )}
          
          {currentStep === 2 && (
            <FitnessObjectivesStep 
              onNext={goToNextStep} 
              onBack={goToPreviousStep} 
            />
          )}
          
          {currentStep === 3 && (
            <TrainingFrequencyStep 
              onNext={goToNextStep} 
              onBack={goToPreviousStep} 
            />
          )}
          
          {currentStep === 4 && (
            <SummaryStep 
              onSubmit={onComplete} 
              onBack={goToPreviousStep} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSetupFlow;
