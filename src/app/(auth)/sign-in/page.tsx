"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Zap, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
    {
        icon: ShieldCheck,
        title: "AI-Powered Detection",
        description: "Real-time disposable email identification with 99.9% accuracy.",
    },
    {
        icon: Zap,
        title: "Sub-100ms Response",
        description: "Lightning-fast API responses that never slow your signup flow.",
    },
    {
        icon: Lock,
        title: "Enterprise Security",
        description: "SOC 2 compliant with end-to-end encrypted API communication.",
    },
];

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        });
        if (error) {
            toast.error(error.message || "Invalid sign in credentials");
            setLoading(false);
        } else {
            toast.success("Signed in successfully!");
            if (data.redirect) router.push(data.url || "/dashboard");
        }
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-foreground text-background overflow-hidden">
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundSize: "40px 40px",
                        backgroundImage:
                            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    }}
                />
                {/* Top — logo */}
                <div className="relative z-10 flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-background flex items-center justify-center">
                        <Image src="/logo.png" alt="TempTrap Logo" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <span className="text-background font-semibold tracking-tight text-sm">TempTrap</span>
                </div>

                {/* Middle — headline */}
                <div className="relative z-10 space-y-8">
                    <div className="space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/40">
                            Email Verification API
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-background leading-[1.15]">
                            Stop bots.<br />Protect your<br />product.
                        </h1>
                        <p className="text-base text-background/60 font-light max-w-xs leading-relaxed">
                            The developer-first API for detecting disposable and temporary email addresses at scale.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {features.map((f) => (
                            <div key={f.title} className="flex items-start gap-4">
                                <div className="mt-0.5 h-8 w-8 rounded-xl bg-background/10 border border-background/10 flex items-center justify-center shrink-0">
                                    <f.icon className="h-4 w-4 text-background/80" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-background">{f.title}</p>
                                    <p className="text-xs text-background/50 font-light mt-0.5">{f.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom — social proof */}
                <div className="relative z-10">
                    <div className="h-px bg-background/10 mb-6" />
                    <p className="text-xs text-background/30 font-light">
                        Trusted by 500+ engineering teams worldwide.
                    </p>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-8 py-12">
                {/* Mobile logo */}
                <div className="lg:hidden mb-8 flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
                        <Image src="/logo.png" alt="TempTrap Logo" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <span className="font-semibold tracking-tight text-sm">TempTrap</span>
                </div>

                <div className="w-full max-w-sm space-y-8">
                    {/* Header */}
                    <div className="space-y-1.5">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h2>
                        <p className="text-sm text-muted-foreground font-light">
                            Sign in to your account to continue.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignIn} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 bg-muted/50 border-border/60 focus-visible:ring-1 focus-visible:ring-foreground/20 placeholder:text-muted-foreground/40"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-11 bg-muted/50 border-border/60 focus-visible:ring-1 focus-visible:ring-foreground/20 placeholder:text-muted-foreground/40"
                            />
                        </div>

                        <Button
                            type="submit"
                            id="sign-in-submit"
                            className="w-full h-11 font-semibold tracking-tight"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Signing in…" : "Sign In"}
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="font-semibold text-foreground hover:underline underline-offset-4">
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
