
import { useState } from "react";
import useCheckInStore from "@/store/useCheckInStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Bed, Heart, Smile } from "lucide-react";

const emojiLabels = [
  { icon: <Bed className="w-4 h-4" />, label: "Sleep Quality" },
  { icon: <Heart className="w-4 h-4" />, label: "Soreness" },
  { icon: <Smile className="w-4 h-4" />, label: "Mood" },
];

function getRecoveryScore(sleepQuality: number, soreness: number, mood: number) {
  // Simple formula: (higher is better, soreness inverts)
  return Math.round(
    ((sleepQuality + mood + (6 - soreness)) / 15) * 100
  );
}
function getSummary(score: number) {
  if (score >= 80) return "You’re 85%+ recovered — you're ready to push today! 💪";
  if (score >= 60) return "You’re about 70% recovered — we’ll go light today.";
  return "Recovery is low — focus on gentle movement and rest.";
}

export default function MorningCheckIn({ onComplete }: { onComplete?: () => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const { checkIn, setCheckIn } = useCheckInStore();
  const [sleepQuality, setSleepQuality] = useState(3);
  const [soreness, setSoreness] = useState(3);
  const [mood, setMood] = useState(3);
  const [submitted, setSubmitted] = useState(Boolean(checkIn && checkIn.date === today));

  if (submitted && checkIn && checkIn.date === today) {
    const score = getRecoveryScore(checkIn.sleepQuality, checkIn.soreness, checkIn.mood);
    return (
      <Card className="mb-8 shadow-md border-primary/70">
        <CardHeader>
          <CardTitle>Morning Recovery Check-In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-xl font-semibold">
            {getSummary(score)}
          </div>
          <div className="text-muted-foreground text-sm">
            Sleep: {checkIn.sleepQuality}/5, Soreness: {checkIn.soreness}/5, Mood: {checkIn.mood}/5
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 shadow-md border-primary/70">
      <CardHeader>
        <CardTitle>🛏️ Morning Recovery Check-In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SliderInput
          label="Sleep Quality"
          icon={<Bed className="w-5 h-5 text-primary" />}
          value={sleepQuality}
          onChange={setSleepQuality}
        />
        <SliderInput
          label="Soreness"
          icon={<Heart className="w-5 h-5 text-primary" />}
          value={soreness}
          onChange={setSoreness}
        />
        <SliderInput
          label="Mood"
          icon={<Smile className="w-5 h-5 text-primary" />}
          value={mood}
          onChange={setMood}
        />

        <button
          className="mt-2 w-full rounded bg-primary text-white py-2 font-semibold hover:bg-primary/80 transition"
          onClick={() => {
            setCheckIn({ sleepQuality, soreness, mood, date: today });
            setSubmitted(true);
            toast.success("Morning check-in saved!");
            if (onComplete) onComplete();
          }}
        >
          Submit Check-In
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
