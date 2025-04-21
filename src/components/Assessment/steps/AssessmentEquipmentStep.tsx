
import { Button } from "@/components/ui/button";
import useAssessmentStore from "@/store/useAssessmentStore";

const equipmentOptions = [
  { label: "None 🤸", value: "none" },
  { label: "Dumbbells 🏋️‍♂️", value: "dumbbells" },
  { label: "Kettlebell 🏋️‍♀️", value: "kettlebell" },
  { label: "Resistance Bands 🟣", value: "bands" },
  { label: "Barbell 🏋️", value: "barbell" },
  { label: "Treadmill 🏃‍♂️", value: "treadmill" },
  { label: "Exercise Bike 🚴", value: "bike" },
  { label: "Pull-up Bar", value: "pullup" },
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const AssessmentEquipmentStep = ({ onNext, onBack }: Props) => {
  const { assessment, setAssessment } = useAssessmentStore();

  const toggleEquipment = (val: string) => {
    const isSelected = assessment.equipment.includes(val);
    let newEquipment = isSelected
      ? assessment.equipment.filter(eq => eq !== val)
      : [...assessment.equipment, val];

    // If "none" is selected, clear all others.
    if (val === "none") {
      newEquipment = isSelected ? [] : ["none"];
    } else if (newEquipment.includes("none")) {
      newEquipment = newEquipment.filter(eq => eq !== "none");
    }

    setAssessment({ equipment: newEquipment });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">Available Equipment</label>
        <div className="flex flex-wrap gap-2">
          {equipmentOptions.map(eq => (
            <button
              key={eq.value}
              type="button"
              className={`border rounded px-3 py-2
                ${assessment.equipment.includes(eq.value) ? "bg-primary text-white" : "bg-muted"}
                hover:bg-primary/90`}
              onClick={() => toggleEquipment(eq.value)}
            >
              {eq.label}
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

export default AssessmentEquipmentStep;
