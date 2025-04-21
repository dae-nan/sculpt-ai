
import { useState } from "react";
import useReflectionStore from "@/store/useReflectionStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Smile, Frown } from "lucide-react";

function getMessage(feeling: number) {
  if (feeling >= 4) return "Great job staying on track! 🌟";
  if (feeling === 3) return "Solid effort today! Small steps add up.";
  return "Every day counts — rest up and try again tomorrow.";
}

export default function EndOfDayReflection() {
  const today = new Date().toISOString().slice(0, 10);
  const { reflection, setReflection } = useReflectionStore();
  const [feeling, setFeeling] = useState(3);
  const [hardest, setHardest] = useState(3);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(Boolean(reflection && reflection.date === today));

  if (submitted && reflection && reflection.date === today) {
    return (
      <Card className="mt-8 shadow-md border-primary/70">
        <CardHeader>
          <CardTitle>🧘 Thanks for Checking In!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-lg font-semibold">{getMessage(reflection.feeling)}</div>
          <div className="text-muted-foreground text-sm mb-2">
            <div>How did today feel: <b>{reflection.feeling}/5</b></div>
            <div>What was hardest: <b>{reflection.hardest}/5</b></div>
            {reflection.notes ? <div className="italic mt-1">“{reflection.notes}”</div> : null}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-md border-primary/70">
      <CardHeader>
        <CardTitle>🧘 End-of-Day Reflection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SliderInput
          label="How did today feel?"
          icon={<Smile className="w-5 h-5 text-primary" />}
          value={feeling}
          onChange={setFeeling}
        />
        <SliderInput
          label="What was hardest?"
          icon={<Frown className="w-5 h-5 text-primary" />}
          value={hardest}
          onChange={setHardest}
        />
        <div>
          <span className="font-medium">Any notes or thoughts?</span>
          <Textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Write something..."
            className="mt-1"
            maxLength={200}
          />
        </div>
        <button
          className="mt-2 w-full rounded bg-primary text-white py-2 font-semibold hover:bg-primary/80 transition"
          onClick={() => {
            setReflection({ feeling, hardest, notes, date: today });
            setSubmitted(true);
            // print to console:
            // eslint-disable-next-line no-console
            console.log("Reflection:", { feeling, hardest, notes, date: today });
            toast.success("Reflection submitted!");
          }}
        >
          Submit Reflection
        </button>
      </CardContent>
    </Card>
  );
}

function SliderInput({
  value,
  label,
  icon,
  onChange,
}: {
  value: number;
  label: string;
  icon?: React.ReactNode;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium">{label}</span>
        <span className="ml-auto text-sm text-muted-foreground">{value}/5</span>
      </div>
      <Slider
        value={[value]}
        min={1}
        max={5}
        step={1}
        onValueChange={v => onChange(v[0])}
        className="w-full"
      />
      <div className="flex justify-between text-xs mt-1 text-gray-400">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}
