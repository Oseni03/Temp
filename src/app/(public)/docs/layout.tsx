import { Header } from "@/components/header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
            <Header />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} TempTrap. Built by Oseni.
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
