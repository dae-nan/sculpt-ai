
import { Button } from "@/components/ui/button";
import useAssessmentStore from "@/store/useAssessmentStore";
import { useState } from "react";

const guideImages = [
  { value: 12, emoji: "💪", label: "12% - Athletic" },
  { value: 18, emoji: "🏃‍♂️", label: "18% - Fit" },
  { value: 25, emoji: "😊", label: "25% - Avg" },
  { value: 35, emoji: "😯", label: "35% - Soft" },
];

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

const AssessmentBodyFatGuideStep = ({ onBack, onSubmit }: Props) => {
  const { assessment, setAssessment } = useAssessmentStore();
  const [localValue, setLocalValue] = useState<number | "">(assessment.bodyFatEstimate || "");

  const handleSelect = (val: number) => {
    setAssessment({ bodyFatEstimate: val });
    setLocalValue(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex justify-between mb-3">
          <label className="font-medium">
            Estimate your body fat % (visual guide)
          </label>
          {localValue !== "" && (
            <span className="ml-3 font-bold text-primary">{localValue}%</span>
          )}
        </div>
        <div className="flex justify-between gap-2">
          {guideImages.map(g => (
            <button
              key={g.value}
              type="button"
              className={`flex flex-col items-center border rounded px-2 py-2 flex-1
                ${localValue === g.value ? "bg-primary text-white" : "bg-muted"}
                hover:bg-primary/90`}
              onClick={() => handleSelect(g.value)}
            >
              <span className="text-3xl mb-1">{g.emoji}</span>
              <span className="text-xs">{g.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit">Finish</Button>
      </div>
    </form>
  );
};

export default AssessmentBodyFatGuideStep;
