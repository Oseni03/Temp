"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Activity,
    Zap,
    ShieldAlert,
    CheckCircle2,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageStatsProps {
    stats: {
        totalChecks: number;
        totalGrowth: number;
        riskDetected: number;
        riskGrowth: number;
        avgLatency: number;
        successRate: number;
    };
    className?: string;
}

interface StatCardProps {
    title: string;
    value: string;
    badge?: { label: string; color: "green" | "red" | "orange" | "blue" | "neutral" };
    subtext?: string;
    icon: React.ElementType;
    accentClass: string;
    iconBgClass: string;
    fillPercent?: number;
}

function StatCard({
    title,
    value,
    badge,
    subtext,
    icon: Icon,
    accentClass,
    iconBgClass,
    fillPercent,
}: StatCardProps) {
    const badgeClasses: Record<string, string> = {
        green: "bg-green-500/10 text-green-500 border-green-500/20",
        red: "bg-red-500/10 text-red-500 border-red-500/20",
        orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        neutral: "bg-muted text-muted-foreground border-border/60",
    };

    return (
        <Card className="relative border-border/50 bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            {/* Top accent bar */}
            <div className={cn("absolute top-0 left-0 right-0 h-px", accentClass)} />

            <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
                <CardTitle className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
                    {title}
                </CardTitle>
                <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center border group-hover:scale-110 transition-transform duration-300",
                    iconBgClass
                )}>
                    <Icon className="h-3.5 w-3.5" />
                </div>
            </CardHeader>

            <CardContent className="px-5 pb-5 space-y-3">
                <div className="text-2xl font-bold tracking-tight tabular-nums">{value}</div>

                {/* Fill bar */}
                {fillPercent !== undefined && (
                    <div className="h-1 rounded-full bg-border/40 overflow-hidden">
                        <div
                            className={cn("h-full rounded-full transition-all duration-700", accentClass)}
                            style={{ width: `${Math.min(fillPercent, 100)}%` }}
                        />
                    </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                    {badge && (
                        <span className={cn(
                            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border",
                            badgeClasses[badge.color]
                        )}>
                            {badge.color === "green" && <TrendingUp className="h-2.5 w-2.5" />}
                            {badge.color === "red" && <TrendingDown className="h-2.5 w-2.5" />}
                            {badge.label}
                        </span>
                    )}
                    {subtext && (
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                            {subtext}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function UsageStats({ stats, className }: UsageStatsProps) {
    return (
        <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
            <StatCard
                title="Total Checks"
                value={stats.totalChecks.toLocaleString()}
                badge={{
                    label: `${stats.totalGrowth >= 0 ? "+" : ""}${stats.totalGrowth}%`,
                    color: stats.totalGrowth >= 0 ? "green" : "red",
                }}
                subtext="vs. last month"
                icon={Zap}
                accentClass="bg-primary/80"
                iconBgClass="bg-primary/10 border-primary/20 text-primary"
                fillPercent={(stats.totalChecks / 10000) * 100}
            />
            <StatCard
                title="Risk Detected"
                value={stats.riskDetected.toLocaleString()}
                badge={{
                    label: `${stats.riskGrowth >= 0 ? "+" : ""}${stats.riskGrowth}%`,
                    color: stats.riskGrowth <= 0 ? "green" : "orange",
                }}
                subtext="threats identified"
                icon={ShieldAlert}
                accentClass="bg-orange-500"
                iconBgClass="bg-orange-500/10 border-orange-500/20 text-orange-500"
                fillPercent={stats.totalChecks > 0 ? (stats.riskDetected / stats.totalChecks) * 100 : 0}
            />
            <StatCard
                title="Avg. Latency"
                value={`${stats.avgLatency}ms`}
                badge={{ label: "Optimal", color: "blue" }}
                subtext="global average"
                icon={Activity}
                accentClass="bg-blue-500"
                iconBgClass="bg-blue-500/10 border-blue-500/20 text-blue-500"
                fillPercent={Math.max(0, 100 - stats.avgLatency)}
            />
            <StatCard
                title="Success Rate"
                value={`${stats.successRate}%`}
                badge={{ label: "SLA Met", color: "green" }}
                subtext="uptime guaranteed"
                icon={CheckCircle2}
                accentClass="bg-primary/80"
                iconBgClass="bg-primary/10 border-primary/20 text-primary"
                fillPercent={stats.successRate}
            />
        </div>
    );
}
