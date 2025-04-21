
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { icons } from "lucide-react";

type ProgressChartCardProps = {
  title: string;
  iconName?: keyof typeof icons;
  data: any[];
  dataKey: string;
  color?: string;
  unit?: string;
  yLabel?: string;
};

export default function ProgressChartCard({
  title,
  iconName = "chart-line",
  data,
  dataKey,
  color = "#7E69AB",
  unit,
  yLabel,
}: ProgressChartCardProps) {
  const LucideIcon = icons[iconName];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-1">
        {LucideIcon && <LucideIcon className="text-primary" size={20} />}
        <CardTitle className="tracking-tight text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <ChartContainer
          config={{
            progress: { color, label: title, icon: LucideIcon }
          }}
        >
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={data}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={10}/>
              <YAxis width={28} axisLine={false} tickLine={false} fontSize={10} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                dot={false}
                strokeWidth={2.5}
                name={yLabel || title}
              />
            </LineChart>
          </ResponsiveContainer>
          <ChartLegendContent payload={[
            { value: title, color, type: "line" }
          ]} />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
