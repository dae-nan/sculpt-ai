
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useStore, { trainingSplitTemplates } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { BicepsFlexed, Armchair, Dumbbell, User } from "lucide-react"; // Use User instead of Body

interface WorkoutTemplateStepProps {
  onNext: () => void;
  onBack: () => void;
}

const dayShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Map workout names to icons
const workoutIconMap: Record<string, React.ReactNode> = {
  Push: <BicepsFlexed size={20} color="#7E69AB" />,
  Pull: <Armchair size={20} color="#7E69AB" />,
  Shoulders: <User size={20} color="#7E69AB" />,   // Use User instead of Body
  Upper: <Dumbbell size={20} color="#7E69AB" />,
  Lower: <Dumbbell size={20} color="#7E69AB" />,
  Legs: <Dumbbell size={20} color="#7E69AB" />,
  Chest: <BicepsFlexed size={20} color="#7E69AB" />,
  Back: <Armchair size={20} color="#7E69AB" />,
  Arms: <BicepsFlexed size={20} color="#7E69AB" />,
  "Body-part Split": <Dumbbell size={20} color="#7E69AB" />,
  // fallback icon if not matched
  "-": null,
};

export default function WorkoutTemplateStep({ onNext, onBack }: WorkoutTemplateStepProps) {
  const { trainingSplit, setTrainingSplit } = useStore();
  const [localSplit, setLocalSplit] = useState<keyof typeof trainingSplitTemplates>("3-day");

  // Ensure we have a valid initial value from the store, defaulting to "3-day" if needed
  useEffect(() => {
    if (trainingSplit && trainingSplitTemplates[trainingSplit]) {
      setLocalSplit(trainingSplit);
    } else {
      setTrainingSplit("3-day");
      setLocalSplit("3-day");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainingSplit, setTrainingSplit]);

  const handleSelect = (split: keyof typeof trainingSplitTemplates) => {
    setLocalSplit(split);
    setTrainingSplit(split);
  };

  // Always ensure selectedTemplate is defined
  const selectedTemplate = trainingSplitTemplates[localSplit] || trainingSplitTemplates["3-day"];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Workout Template</h2>
        <p className="text-muted-foreground mb-4">
          Pick your preferred training split and see a weekly overview.
        </p>
        <ToggleGroup
          type="single"
          value={localSplit}
          onValueChange={val => handleSelect(val as keyof typeof trainingSplitTemplates)}
          className="mb-4"
        >
          <ToggleGroupItem value="3-day">3-Day (Push-Pull-Legs)</ToggleGroupItem>
          <ToggleGroupItem value="4-day">4-Day (Upper-Lower)</ToggleGroupItem>
          <ToggleGroupItem value="5-day">5-Day (Body-Part Split)</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Card className="w-full max-w-md mx-auto p-4 rounded-xl border bg-soft-gray shadow-sm">
        <div className="mb-2 font-medium">{selectedTemplate.name} Preview</div>
        <div className="grid grid-cols-7 gap-2 text-xs">
          {dayShort.map(day => {
            // Defensive: Fallback to "-" if day is not defined
            const workout = selectedTemplate.days[day as keyof typeof selectedTemplate.days] ?? "-";
            const icon = workoutIconMap[workout] ?? null;
            const isWorkoutDay = workout !== "-" && !!icon;

            return (
              <div
                key={day}
                className={`flex flex-col items-center justify-center py-2 rounded ${
                  isWorkoutDay ? "bg-[#E5DEFF] font-semibold text-primary" : "bg-muted text-muted-foreground"
                }`}
                title={isWorkoutDay ? workout : ""}
              >
                <span className="text-xs mb-1">{day}</span>
                {icon ? (
                  <div className="flex justify-center items-center">{icon}</div>
                ) : (
                  <div style={{ height: 20, width: 20 }} /> // Keep grid consistent
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
