
import { Button } from "@/components/ui/button";
import useAssessmentStore from "@/store/useAssessmentStore";
import useStore from "@/store/useStore";
import { useState, useEffect } from "react";

const guideImages = [
  {
    value: 12,
    imgUrl:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=80&q=80",
    label: "12% - Athletic",
  },
  {
    value: 18,
    imgUrl:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=80&q=80",
    label: "18% - Fit",
  },
  {
    value: 25,
    imgUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
    label: "25% - Avg",
  },
  {
    value: 35,
    imgUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
    label: "35% - Soft",
  },
];

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

const AssessmentBodyFatGuideStep = ({ onBack, onSubmit }: Props) => {
  const { assessment, setAssessment } = useAssessmentStore();
  const { goals } = useStore();

  // Determine initial value priority: assessment.bodyFatEstimate or closest to currentBodyFat in goals or ""
  const initialValue: number | "" = (() => {
    if (assessment.bodyFatEstimate !== "") {
      return assessment.bodyFatEstimate;
    }
    if (goals.currentBodyFat !== undefined && goals.currentBodyFat !== null) {
      // Find closest guide value to currentBodyFat
      let closest = guideImages[0].value;
      let minDiff = Infinity;
      for (const g of guideImages) {
        const diff = Math.abs(g.value - goals.currentBodyFat);
        if (diff < minDiff) {
          minDiff = diff;
          closest = g.value;
        }
      }
      return closest;
    }
    return "";
  })();

  const [localValue, setLocalValue] = useState<number | "">(initialValue);

  useEffect(() => {
    // Sync local selection to store state if not set yet or changed
    if (
      assessment.bodyFatEstimate === "" ||
      assessment.bodyFatEstimate !== localValue
    ) {
      setAssessment({ bodyFatEstimate: localValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <label className="font-medium">Estimate your body fat % (visual guide)</label>
          {localValue !== "" && (
            <span className="ml-3 font-bold text-primary">{localValue}%</span>
          )}
        </div>
        <div className="flex justify-between gap-2">
          {guideImages.map((g) => (
            <button
              key={g.value}
              type="button"
              className={`flex flex-col items-center border rounded px-2 py-2 flex-1
                ${localValue === g.value ? "bg-primary text-white" : "bg-muted"}
                hover:bg-primary/90`}
              onClick={() => handleSelect(g.value)}
            >
              <img
                src={g.imgUrl}
                alt={g.label}
                className="w-12 h-12 object-cover rounded mb-1"
              />
              <span className="text-xs">{g.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Finish</Button>
      </div>
    </form>
  );
};

export default AssessmentBodyFatGuideStep;
