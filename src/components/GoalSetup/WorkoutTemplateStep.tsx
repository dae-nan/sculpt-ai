
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useStore, { trainingSplitTemplates } from "@/store/useStore";
import { Button } from "@/components/ui/button";

interface WorkoutTemplateStepProps {
  onNext: () => void;
  onBack: () => void;
}

const dayShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkoutTemplateStep({ onNext, onBack }: WorkoutTemplateStepProps) {
  const { trainingSplit, setTrainingSplit } = useStore();
  const [localSplit, setLocalSplit] = useState<keyof typeof trainingSplitTemplates>(trainingSplit);

  const handleSelect = (split: keyof typeof trainingSplitTemplates) => {
    setLocalSplit(split);
    setTrainingSplit(split);
  };

  const selectedTemplate = trainingSplitTemplates[localSplit];

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
          {dayShort.map(day => (
            <div
              key={day}
              className={`flex flex-col items-center py-2 rounded ${
                selectedTemplate.days[day as keyof typeof selectedTemplate.days] !== "-"
                  ? "bg-[#E5DEFF] font-semibold text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <span className="text-xs">{day}</span>
              <span>
                {selectedTemplate.days[day as keyof typeof selectedTemplate.days]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
