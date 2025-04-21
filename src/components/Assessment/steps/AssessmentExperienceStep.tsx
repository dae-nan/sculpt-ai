
import { Button } from "@/components/ui/button";
import useAssessmentStore from "@/store/useAssessmentStore";

const options = [
  { label: "Beginner 👶", value: "beginner" },
  { label: "Intermediate 🏃", value: "intermediate" },
  { label: "Advanced 🏆", value: "advanced" },
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const AssessmentExperienceStep = ({ onNext, onBack }: Props) => {
  const { assessment, setAssessment } = useAssessmentStore();

  const handleSelect = (value: string) => {
    setAssessment({ experience: value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Training Experience</label>
        <div className="space-y-2">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`w-full py-2 px-4 rounded border 
                ${assessment.experience === opt.value ? "bg-primary text-white" : "bg-muted"}
                hover:bg-primary/90`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default AssessmentExperienceStep;
