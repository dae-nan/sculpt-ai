
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartLine, LucideIcon } from "lucide-react";

type ProgressChartCardProps = {
  title: string;
  icon?: LucideIcon;
  data: any[];
  dataKey: string;
  color?: string;
  unit?: string;
  yLabel?: string;
};

export default function ProgressChartCard({
  title,
  icon: Icon = ChartLine,
  data,
  dataKey,
  color = "#7E69AB",
  unit,
  yLabel,
}: ProgressChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-1">
        {Icon && <Icon className="text-primary" size={20} />}
        <CardTitle className="tracking-tight text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <ChartContainer
          config={{
            progress: { color, label: title }
          }}
        >
          <div className="w-full h-full">
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
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
