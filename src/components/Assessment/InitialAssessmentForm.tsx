
import { useState } from "react";
import AssessmentBreadcrumbs from "./AssessmentBreadcrumbs";
import WeightSleepStep from "./steps/AssessmentWeightSleepStep";
import AssessmentExperienceStep from "./steps/AssessmentExperienceStep";
import AssessmentDietStep from "./steps/AssessmentDietStep";
import AssessmentEquipmentStep from "./steps/AssessmentEquipmentStep";
import AssessmentBodyFatGuideStep from "./steps/AssessmentBodyFatGuideStep";
import { Card, CardContent } from "@/components/ui/card";
import useAssessmentStore from "@/store/useAssessmentStore";

interface Props {
  onComplete: () => void;
}

const TOTAL_STEPS = 5;

const InitialAssessmentForm = ({ onComplete }: Props) => {
  const [step, setStep] = useState(1);
  const { assessment } = useAssessmentStore();

  return (
    <div className="max-w-xl mx-auto px-4 mt-4">
      <AssessmentBreadcrumbs currentStep={step} />
      <Card>
        <CardContent className="pt-8">
          {step === 1 && (
            <WeightSleepStep onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <AssessmentExperienceStep
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <AssessmentDietStep
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <AssessmentEquipmentStep
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <AssessmentBodyFatGuideStep
              onBack={() => setStep(4)}
              onSubmit={onComplete}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InitialAssessmentForm;
