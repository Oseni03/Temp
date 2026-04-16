"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Sparkles, Send } from "lucide-react";
import { submitSurvey, type SurveyData } from "@/server/survey";
import { authClient } from "@/lib/auth-client";

interface SurveyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const PRESET_CHALLENGES = [
    "High latency in current email verification",
    "Too many false positives with existing tools",
    "Scaling API calls without breaking the budget",
    "Integrating trust signals into a complex workflow",
    "Other"
];

export function SurveyModal({ open, onOpenChange }: SurveyModalProps) {
    const { data: session } = authClient.useSession();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [challenge, setChallenge] = useState("");
    const [otherChallenge, setOtherChallenge] = useState("");
    const [currentSolution, setCurrentSolution] = useState("");

    const handleNext = () => {
        if (!challenge) {
            toast.error("Please select a challenge first");
            return;
        }
        setStep(2);
    };

    const handleSubmit = async () => {
        if (!currentSolution) {
            toast.error("Please describe your current solution");
            return;
        }

        setLoading(true);
        try {
            const data: SurveyData = {
                challenge,
                otherChallenge: challenge === "Other" ? otherChallenge : undefined,
                currentSolution,
                userEmail: session?.user?.email || undefined,
                userName: session?.user?.name || undefined,
            };

            const result = await submitSurvey(data);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Thank you! We'll reach out soon.");
                onOpenChange(false);
                // Reset for next time
                setTimeout(() => {
                    setStep(1);
                    setChallenge("");
                    setOtherChallenge("");
                    setCurrentSolution("");
                }, 500);
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const challengeText = challenge === "Other" ? otherChallenge : challenge;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] border-border/50 bg-background/80 backdrop-blur-3xl shadow-2xl overflow-hidden p-0 rounded-[2.5rem]">
                <div className="bg-primary/5 h-28 flex flex-col items-center justify-center border-b border-border/50 relative overflow-hidden">
                    <Sparkles className="h-10 w-10 text-primary animate-pulse relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                    <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/10 blur-3xl rounded-full" />
                </div>

                <div className="overflow-y-auto max-h-[min(80vh,600px)]">
                    <div className="p-10">
                        <DialogHeader className="mb-8">
                            <DialogTitle className="text-3xl font-bold tracking-tight">
                                {step === 1 ? "Custom Infrastructure" : "One last thing"}
                            </DialogTitle>
                            <DialogDescription className="text-base text-muted-foreground pt-2 font-light leading-relaxed">
                                {step === 1
                                    ? "Tell us about your requirements and we'll design a custom plan for your infrastructure."
                                    : "Help us understand your current workflow so we can provide a better solution."}
                            </DialogDescription>
                        </DialogHeader>

                        {step === 1 ? (
                            <div className="space-y-4 py-2 animate-in-fade">
                                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 block">
                                    Primary Challenge
                                </Label>
                                <RadioGroup
                                    value={challenge}
                                    onValueChange={setChallenge}
                                    className="gap-3"
                                >
                                    {PRESET_CHALLENGES.map((option) => (
                                        <div
                                            key={option}
                                            className={`flex items-center space-x-4 rounded-2xl border p-5 transition-all duration-300 cursor-pointer group ${challenge === option
                                                ? "border-primary bg-primary/[0.03] shadow-inner"
                                                : "border-border/50 hover:border-primary/20 hover:bg-muted/30"
                                                }`}
                                        >
                                            <RadioGroupItem onClick={() => setChallenge(option)} value={option} id={option} className="sr-only" />
                                            <div className={`h-5 w-5 rounded-full border-2 border-primary/20 flex items-center justify-center transition-all ${challenge === option ? "border-primary bg-primary" : "group-hover:border-primary/40"}`}>
                                                {challenge === option && <div className="h-1.5 w-1.5 rounded-full bg-background" />}
                                            </div>
                                            <Label htmlFor={option} className="flex-1 cursor-pointer text-sm font-semibold tracking-tight">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>

                                {challenge === "Other" && (
                                    <div className="animate-in zoom-in-95 duration-200 pt-2">
                                        <Input
                                            placeholder="Specify your unique challenge..."
                                            value={otherChallenge}
                                            onChange={(e) => setOtherChallenge(e.target.value)}
                                            className="rounded-2xl h-14 border-primary/20 bg-background/50 focus-visible:ring-primary/20 p-6"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6 py-2 animate-in-fade">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 block">
                                        Current Workflow
                                    </Label>
                                    <Textarea
                                        placeholder="Describe your current tech stack or the manual processes you use today..."
                                        value={currentSolution}
                                        onChange={(e) => setCurrentSolution(e.target.value)}
                                        className="min-h-[160px] rounded-[1.5rem] border-border/50 bg-background/50 backdrop-blur-sm resize-none focus-visible:ring-primary/20 p-6 text-sm font-light leading-relaxed shadow-inner"
                                    />
                                </div>
                                <div className="p-6 rounded-2xl bg-orange-500/[0.03] border border-orange-500/10 text-orange-900/80 text-[13px] flex gap-4 font-light leading-relaxed">
                                    <Sparkles className="h-5 w-5 shrink-0 text-orange-500" />
                                    <p>Our engineers will review this and provide a tailored optimization plan for your account.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="p-10 pt-0 flex-row justify-between items-center sm:justify-between">
                    <div className="flex gap-1.5">
                        <div className={`h-1 w-10 rounded-full transition-all duration-500 ${step === 1 ? "bg-primary w-12" : "bg-muted/40"}`} />
                        <div className={`h-1 w-10 rounded-full transition-all duration-500 ${step === 2 ? "bg-primary w-12" : "bg-muted/40"}`} />
                    </div>

                    {step === 1 ? (
                        <Button
                            onClick={handleNext}
                            disabled={!challenge || (challenge === "Other" && !otherChallenge)}
                            className="rounded-full px-10 h-14 text-sm font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                            Continue
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => setStep(1)}
                                className="rounded-full px-6 h-14 text-sm font-bold text-muted-foreground hover:bg-muted/50 transition-all"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="rounded-full px-10 h-14 text-sm font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all gap-3"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Submit Request <Send className="h-3.5 w-3.5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
