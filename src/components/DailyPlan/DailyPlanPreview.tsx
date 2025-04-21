
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Activity, Utensils, Heart, Info } from "lucide-react";
import useStore from "@/store/useStore";
import * as React from "react";

// Icon mapping per section
const icons = {
  workout: Activity,
  meals: Utensils,
  recovery: Heart,
};

const palette = {
  low: "bg-[#FEF7CD]",
  normal: "bg-[#E5DEFF]",
  high: "bg-[#F2FCE2]",
};

const sectionColors = {
  workout: "bg-[#D3E4FD]",
  meals: "bg-[#FDE1D3]",
  recovery: "bg-[#FFDEE2]",
};

// Helper for animation
const fadeIn = "animate-fade-in";

export default function DailyPlanPreview() {
  const { dailyPlan } = useStore();
  if (!dailyPlan) return null;

  return (
    <div className={`w-full max-w-2xl mx-auto mt-8`}>
      <Card className={`${palette[dailyPlan.recoveryState]} ${fadeIn}`}>
        <CardHeader>
          <CardTitle>Daily Plan Preview</CardTitle>
          <CardDescription>
            Your personalized plan for {dailyPlan.date}
            {dailyPlan.coachName && (
              <span className="block text-sm text-muted-foreground mt-1">
                Coach: {dailyPlan.coachName}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {dailyPlan.sections.map((section) => {
            const Icon = icons[section.type];
            return (
              <div
                key={section.type}
                className={`
                  flex items-start gap-4 rounded-lg
                  px-5 py-4 border shadow-sm 
                  ${sectionColors[section.type]}
                  ${section.highlight ? "ring-2 ring-primary shadow-lg" : ""}
                `}
              >
                <span className="mt-1">
                  <Icon className="w-6 h-6 text-primary" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{section.title}</span>
                    {section.reason && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-pointer text-muted-foreground">
                            <Info className="w-4 h-4" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">{section.reason}</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-800">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="mb-1">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
