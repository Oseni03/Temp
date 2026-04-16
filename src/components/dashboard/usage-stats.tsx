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
    Check
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

export function UsageStats({ stats, className }: UsageStatsProps) {
    return (
        <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-4", className)}>
            <Card className="border-border/50 bg-background/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm group hover:border-primary/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Total Checks</CardTitle>
                    <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                        <Zap className="h-4 w-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="text-3xl font-bold tracking-tight">{stats.totalChecks.toLocaleString()}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className={cn(
                            "flex px-1.5 py-0.5 rounded-md text-[10px] font-bold border",
                            stats.totalGrowth >= 0 
                                ? "bg-green-500/10 text-green-500 border-green-500/20" 
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                        )}>
                            {stats.totalGrowth >= 0 ? "+" : ""}{stats.totalGrowth}%
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">vs last month</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm group hover:border-orange-500/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Risk Detected</CardTitle>
                    <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                        <ShieldAlert className="h-4 w-4 text-orange-500" />
                    </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="text-3xl font-bold tracking-tight text-orange-500">{stats.riskDetected.toLocaleString()}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className={cn(
                            "flex px-1.5 py-0.5 rounded-md text-[10px] font-bold border",
                            stats.riskGrowth <= 0 
                                ? "bg-green-500/10 text-green-500 border-green-500/20" 
                                : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        )}>
                            {stats.riskGrowth >= 0 ? "+" : ""}{stats.riskGrowth}%
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">threats identified</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm group hover:border-blue-500/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Avg. Latency</CardTitle>
                    <div className="h-8 w-8 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                        <Activity className="h-4 w-4 text-blue-500" />
                    </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="text-3xl font-bold tracking-tight">{stats.avgLatency}ms</div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex px-1.5 py-0.5 rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-500 border border-blue-500/20">
                            Optimal
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Global Average</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm group hover:border-primary/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Success Rate</CardTitle>
                    <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                        <Check className="h-4 w-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <div className="text-3xl font-bold tracking-tight">{stats.successRate}%</div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-primary/60">Uptime Guaranteed</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
