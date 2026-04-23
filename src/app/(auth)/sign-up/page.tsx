"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Users, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

const testimonial = {
	quote: "TempTrap cut our fake account signups by 94% in the first week. It just works — no config, no fuss.",
	author: "Sarah K.",
	role: "Head of Growth, Vercel-scale startup",
};

const stats = [
	{ value: "99.9%", label: "Detection accuracy" },
	{ value: "<80ms", label: "Avg. response time" },
	{ value: "10M+", label: "Checks per day" },
];

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const { data, error } = await authClient.signUp.email({
			email,
			password,
			name,
			callbackURL: "/dashboard",
		});
		if (error) {
			toast.error(error.message || "Could not create account");
			setLoading(false);
		} else {
			toast.success("Account created successfully!");
			setLoading(false);
			if (data.user) router.push("/dashboard");
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
						<Image
							src="/logo.png"
							alt="TempTrap Logo"
							width={16}
							height={16}
							className="h-4 w-4"
						/>
					</div>
					<span className="text-background font-semibold tracking-tight text-sm">
						TempTrap
					</span>
				</div>

				{/* Middle — headline + testimonial */}
				<div className="relative z-10 space-y-10">
					<div className="space-y-3">
						<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/40">
							Join 500+ teams
						</p>
						<h1 className="text-4xl font-bold tracking-tight text-background leading-[1.15]">
							Start verifying
							<br />
							in minutes.
							<br />
							Free forever.
						</h1>
						<p className="text-base text-background/60 font-light max-w-xs leading-relaxed">
							No credit card required. 1,000 free checks per
							month. Upgrade when you need more.
						</p>
					</div>

					{/* Stats row */}
					<div className="grid grid-cols-3 gap-4">
						{stats.map((s) => (
							<div key={s.label} className="space-y-1">
								<div className="flex items-center gap-1.5">
									<BarChart3 className="h-3 w-3 text-background/30" />
								</div>
								<p className="text-2xl font-bold text-background tracking-tight">
									{s.value}
								</p>
								<p className="text-[10px] font-medium text-background/40 uppercase tracking-wider">
									{s.label}
								</p>
							</div>
						))}
					</div>

					{/* Testimonial */}
					<div className="p-5 rounded-2xl bg-background/5 border border-background/10 space-y-3">
						<p className="text-sm text-background/80 font-light leading-relaxed italic">
							&ldquo;{testimonial.quote}&rdquo;
						</p>
						<div className="flex items-center gap-2.5">
							<div className="h-7 w-7 rounded-full bg-background/20 border border-background/10 flex items-center justify-center">
								<Users className="h-3.5 w-3.5 text-background/60" />
							</div>
							<div>
								<p className="text-xs font-semibold text-background">
									{testimonial.author}
								</p>
								<p className="text-[10px] text-background/40 font-light">
									{testimonial.role}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className="relative z-10">
					<div className="h-px bg-background/10 mb-6" />
					<p className="text-xs text-background/30 font-light">
						Free plan · No card required · Cancel anytime.
					</p>
				</div>
			</div>

			{/* Right panel — form */}
			<div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-8 py-12">
				{/* Mobile logo */}
				<div className="lg:hidden mb-8 flex items-center gap-2.5">
					<div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
						<Image
							src="/logo.png"
							alt="TempTrap Logo"
							width={16}
							height={16}
							className="h-4 w-4"
						/>
					</div>
					<span className="font-semibold tracking-tight text-sm">
						TempTrap
					</span>
				</div>

				<div className="w-full max-w-sm space-y-8">
					{/* Header */}
					<div className="space-y-1.5">
						<h2 className="text-2xl font-bold tracking-tight text-foreground">
							Create your account
						</h2>
						<p className="text-sm text-muted-foreground font-light">
							Free forever. 1,000 API calls per month included.
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSignUp} className="space-y-5">
						<div className="space-y-1.5">
							<Label
								htmlFor="name"
								className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
							>
								Full name
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="Jane Smith"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="h-11 bg-muted/50 border-border/60 focus-visible:ring-1 focus-visible:ring-foreground/20 placeholder:text-muted-foreground/40"
							/>
						</div>
						<div className="space-y-1.5">
							<Label
								htmlFor="email"
								className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
							>
								Work email
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
							<Label
								htmlFor="password"
								className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
							>
								Password
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="Min. 8 characters"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="h-11 bg-muted/50 border-border/60 focus-visible:ring-1 focus-visible:ring-foreground/20 placeholder:text-muted-foreground/40"
							/>
						</div>

						<Button
							type="submit"
							id="sign-up-submit"
							className="w-full h-11 font-semibold tracking-tight"
							disabled={loading}
						>
							{loading && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							{loading ? "Creating account…" : "Get started free"}
						</Button>

						<p className="text-center text-[10px] text-muted-foreground/60 leading-relaxed">
							By creating an account, you agree to our{" "}
							<Link
								href="/terms"
								className="underline underline-offset-2 hover:text-muted-foreground"
							>
								Terms
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="underline underline-offset-2 hover:text-muted-foreground"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</form>

					{/* Footer */}
					<p className="text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="font-semibold text-foreground hover:underline underline-offset-4"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
