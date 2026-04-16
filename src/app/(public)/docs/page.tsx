import type { Metadata } from "next";
import { DocsPage } from "@/components/dashboard/docs-page";

export const metadata: Metadata = {
    title: "API Reference — TempTrap",
    description:
        "Complete reference for the TempTrap /v1/verify disposable email detection endpoint. Authentication, parameters, response shape, errors, and live playground.",
};

export default function ApiDocsPage() {
    return <DocsPage />;
}
