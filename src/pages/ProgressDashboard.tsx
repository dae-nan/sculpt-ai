
import useProgressStore from "@/store/useProgressStore";
import ProgressChartCard from "@/components/Progress/ProgressChartCard";
import ProgressPhotoCompare from "@/components/Progress/ProgressPhotoCompare";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const formatAvg = (arr: number[]) => arr.length ? (arr.reduce((a,b) => a+b, 0) / arr.length).toFixed(1) : "0";

export default function ProgressDashboard() {
  const entries = useProgressStore((s) => s.entries);

  const weightData = entries.map(({ date, weight }) => ({ date, value: weight }));
  const bodyFatData = entries.map(({ date, bodyFat }) => ({ date, value: bodyFat }));
  const sleepAvgs = formatAvg(entries.map(e => e.sleepHours));
  const workoutConsistency = Math.round((entries.filter(e => e.didWorkout).length / entries.length) * 100);

  return (
    <div className="container max-w-4xl mx-auto py-10 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">📊 Progress Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProgressChartCard
          title="Weight Trend"
          iconName="weight"
          data={entries}
          dataKey="weight"
          color="#6E59A5"
          yLabel="Weight (lbs)"
        />
        <ProgressChartCard
          title="Body Fat %"
          iconName="body"
          data={entries}
          dataKey="bodyFat"
          color="#9b87f5"
          yLabel="Body Fat (%)"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <BarChart className="text-primary" size={20}/>
            <CardTitle className="tracking-tight text-base">Workout Consistency</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-3xl font-bold">{workoutConsistency}%</div>
            <div className="text-xs text-muted-foreground">Workouts completed</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <span className="text-primary font-bold text-xl">😴</span>
            <CardTitle className="tracking-tight text-base">Avg. Sleep</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-3xl font-bold">{sleepAvgs} hrs</div>
            <div className="text-xs text-muted-foreground">per night</div>
          </CardContent>
        </Card>
        <ProgressPhotoCompare />
      </div>
    </div>
  );
}
