"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const COLORS = [
    "oklch(0.21 0.006 285.885)",   // primary (dark) / near-white in dark mode
    "oklch(0.7 0.2 45)",           // orange-500
    "oklch(0.6 0.2 25)",           // destructive/red
];

const LEGEND_COLORS = ["bg-foreground", "bg-orange-500", "bg-destructive"];

// Custom dot on hover only
const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { name: string; value: number; color: string }[];
    label?: string;
}) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-border/60 bg-background/95 backdrop-blur-md px-4 py-3 shadow-xl text-xs space-y-1.5">
            <p className="font-semibold text-foreground mb-2">{label}</p>
            {payload.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-muted-foreground capitalize">{p.name}</span>
                    </div>
                    <span className="font-bold text-foreground tabular-nums">{p.value.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export function VerificationCharts({ chartData, distribution }: VerificationChartsProps) {
    const totalDistribution = distribution.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Area chart — 2/3 width */}
            <Card className="lg:col-span-2 border-border/50 bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm">
                <CardHeader className="p-6 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle className="text-base font-bold tracking-tight">Verification Activity</CardTitle>
                            <CardDescription className="text-[11px] font-light leading-relaxed">
                                Total checks vs. blocked disposable domains — last 7 days.
                            </CardDescription>
                        </div>
                        {/* Legend */}
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-foreground" />
                                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Total</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-orange-500" />
                                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Blocked</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 pt-2 pb-4">
                    <div className="h-[300px] w-full px-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.21 0.006 285.885)" stopOpacity={0.12} />
                                        <stop offset="100%" stopColor="oklch(0.21 0.006 285.885)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.7 0.2 45)" stopOpacity={0.12} />
                                        <stop offset="100%" stopColor="oklch(0.7 0.2 45)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="oklch(0.92 0.004 286.32)"
                                    strokeOpacity={0.4}
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: "oklch(0.552 0.016 285.938)", fontWeight: 600 }}
                                    dy={10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="oklch(0.21 0.006 285.885)"
                                    strokeWidth={1.5}
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                    dot={false}
                                    activeDot={{ r: 3, strokeWidth: 0 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="blocked"
                                    stroke="oklch(0.7 0.2 45)"
                                    strokeWidth={1.5}
                                    fillOpacity={1}
                                    fill="url(#colorBlocked)"
                                    dot={false}
                                    activeDot={{ r: 3, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Distribution — 1/3 width */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm">
                <CardHeader className="p-6 pb-0">
                    <CardTitle className="text-base font-bold tracking-tight">Status Distribution</CardTitle>
                    <CardDescription className="text-[11px] font-light leading-relaxed">
                        Email classification breakdown.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4 space-y-6">
                    {/* Donut */}
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={72}
                                    paddingAngle={3}
                                    cornerRadius={3}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {distribution.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--background)",
                                        borderColor: "var(--border)",
                                        borderRadius: "10px",
                                        fontSize: "11px",
                                        fontWeight: 600,
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend rows with mini bars */}
                    <div className="space-y-3">
                        {distribution.map((item, i) => {
                            const pct = totalDistribution > 0 ? Math.round((item.value / totalDistribution) * 100) : 0;
                            return (
                                <div key={item.name} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-2 w-2 rounded-full", LEGEND_COLORS[i])} />
                                            <span className="text-[11px] font-medium text-muted-foreground">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-bold tabular-nums">{pct}%</span>
                                    </div>
                                    <div className="h-1 rounded-full bg-border/40 overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full", LEGEND_COLORS[i])}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
