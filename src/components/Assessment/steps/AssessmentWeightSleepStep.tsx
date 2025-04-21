
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import useAssessmentStore from "@/store/useAssessmentStore";
import { useEffect, useState } from "react";

interface Props {
  onNext: () => void;
}

const WeightSleepStep = ({ onNext }: Props) => {
  const { goals } = useStore();
  const { assessment, setAssessment } = useAssessmentStore();
  const [weight, setWeight] = useState<number | "">(assessment.weight || goals.currentWeight || "");
  const [sleep, setSleep] = useState<number | "">(assessment.sleepHours || "");

  useEffect(() => {
    // Prefill weight from goals if available
    if (!assessment.weight && goals.currentWeight) {
      setWeight(goals.currentWeight);
    }
  }, [goals.currentWeight, assessment.weight]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setAssessment({ weight, sleepHours: sleep });
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">
          Weight (kg or lbs) <span role="img" aria-label="weight">🏋️</span>
        </label>
        <Input
          type="number"
          min={20}
          max={300}
          placeholder="e.g., 75"
          value={weight}
          onChange={e => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Sleep (avg hours/night) <span role="img" aria-label="sleep">😴</span>
        </label>
        <Input
          type="number"
          min={2}
          max={14}
          placeholder="e.g., 7"
          value={sleep}
          onChange={e => setSleep(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default WeightSleepStep;
