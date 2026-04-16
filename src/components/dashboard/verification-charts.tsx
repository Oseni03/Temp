"use client";

import { 
    Area, 
    AreaChart, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface VerificationChartsProps {
    chartData: {
        date: string;
        total: number;
        blocked: number;
    }[];
    distribution: {
        name: string;
        value: number;
    }[];
}

const COLORS = ["oklch(var(--primary))", "oklch(var(--orange-500))", "oklch(var(--destructive))"];

export function VerificationCharts({ chartData, distribution }: VerificationChartsProps) {
    const totalDistribution = distribution.reduce((acc, curr) => acc + curr.value, 0);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm">
                <CardHeader className="p-8">
                    <CardTitle className="text-xl font-bold tracking-tight">Verification Activity</CardTitle>
                    <CardDescription className="font-light">Total checks vs. blocked disposable domains over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pb-8">
                    <div className="h-[350px] w-full px-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="oklch(var(--orange-500))" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="oklch(var(--orange-500))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: "oklch(var(--muted-foreground))" }}
                                    dy={10}
                                />
                                <YAxis 
                                    hide 
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: "oklch(var(--background))", 
                                        borderColor: "oklch(var(--border))",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: "600"
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="total" 
                                    stroke="oklch(var(--primary))" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorTotal)" 
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="blocked" 
                                    stroke="oklch(var(--orange-500))" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorBlocked)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm">
                <CardHeader className="p-8">
                    <CardTitle className="text-xl font-bold tracking-tight">Status Distribution</CardTitle>
                    <CardDescription className="font-light">Breakdown of email classifications.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pb-10">
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    cornerRadius={4}
                                    dataKey="value"
                                >
                                    {distribution.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: "oklch(var(--background))", 
                                        borderColor: "oklch(var(--border))",
                                        borderRadius: "12px",
                                        fontSize: "12px"
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="px-8 space-y-3">
                        {distribution.map((item, i) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                    <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold">
                                    {totalDistribution > 0 ? Math.round((item.value / totalDistribution) * 100) : 0}%
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
