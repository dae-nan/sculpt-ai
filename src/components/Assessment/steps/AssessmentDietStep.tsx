import { Button } from "@/components/ui/button";
import useAssessmentStore from "@/store/useAssessmentStore";

const restrictions = [
  { label: "Vegetarian 🥕", value: "vegetarian" },
  { label: "Vegan 🥦", value: "vegan" },
  { label: "Gluten-Free 🍞", value: "gluten-free" },
  { label: "Lactose-Free 🥛", value: "lactose-free" },
  { label: "Nut Allergy 🥜", value: "nut-allergy" },
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const AssessmentDietStep = ({ onNext, onBack }: Props) => {
  const { assessment, setAssessment } = useAssessmentStore();

  // Keep it simple: toggle values in array
  const toggleRestriction = (val: string) => {
    const isSelected = assessment.dietaryRestrictions.includes(val);
    const newRestrictions = isSelected
      ? assessment.dietaryRestrictions.filter(r => r !== val)
      : [...assessment.dietaryRestrictions, val];
    setAssessment({ dietaryRestrictions: newRestrictions });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Dietary Restrictions</label>
        <div className="flex flex-wrap gap-2">
          {restrictions.map(r => (
            <button
              key={r.value}
              type="button"
              className={`border rounded px-3 py-2
                ${assessment.dietaryRestrictions.includes(r.value) ? "bg-primary text-white" : "bg-muted"}
                hover:bg-primary/90`}
              onClick={() => toggleRestriction(r.value)}
            >
              {r.label}
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

export default AssessmentDietStep;
