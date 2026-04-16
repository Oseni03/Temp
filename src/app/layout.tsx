import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"
import { OrganizationProvider } from "@/contexts/organization-context";

export const metadata: Metadata = {
    title: {
        default: "TempTrap — Precision Email Verification",
        template: "%s | TempTrap"
    },
    description: "The fastest, developer-first API to identify disposable email addresses and fraud in real-time.",
    keywords: ["email verification", "disposable email", "fraud detection", "api", "developer tools"],
    authors: [{ name: "TempTrap Team" }],
    viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", "font-sans", GeistSans.variable, GeistMono.variable)}
        >
            <body className="min-h-full flex flex-col">
                <TooltipProvider>
                    <OrganizationProvider>
                        {children}
                    </OrganizationProvider>
                    <Toaster />
                </TooltipProvider>
            </body>
        </html>
    );
}
