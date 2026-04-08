import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <ShieldCheck className="h-5 w-5 text-foreground" />
                            <span className="text-base font-bold tracking-tight">Temp</span>
                            <span className="text-muted-foreground font-light ml-1">/</span>
                            <span className="text-sm font-semibold text-muted-foreground">API Reference</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/sign-in"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Sign in
                            </Link>
                            <Button asChild size="sm" className="rounded-lg px-4 h-8 text-sm">
                                <Link href="/sign-up">Get started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Temp. Built by Oseni.
                    </p>
                    <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">All systems operational</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
