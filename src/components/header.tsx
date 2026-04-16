import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignOutButton } from "./auth-buttons";

export async function Header() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-foreground" />
                        <span className="text-xl font-bold tracking-tight font-heading">Temp</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                        <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
                        <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                                <SignOutButton />
                            </>
                        ) : (
                            <>
                                <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    Sign in
                                </Link>
                                <Button asChild size="sm" className="rounded-lg px-5">
                                    <Link href="/sign-up">Get started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
