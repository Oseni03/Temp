"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "API Keys", href: "/dashboard/keys" },
    { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-background font-sans w-full">
                <AppSidebar />
                <SidebarInset className="flex flex-col min-w-0">
                    <header className="flex h-16 items-center gap-4 px-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h2 className="text-lg font-semibold tracking-tight">
                            {NAV_ITEMS.find(i => i.href === pathname)?.name || "Dashboard"}
                        </h2>
                    </header>
                    <main className="flex-1 p-6 overflow-y-auto">
                        <div className="max-w-6xl mx-auto h-full space-y-6">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
