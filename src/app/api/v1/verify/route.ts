import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import disposableDomains from "disposable-email-domains";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email") || searchParams.get("url");
        const apiKey = req.headers.get("x-api-key");

        if (!apiKey) {
            return NextResponse.json(
                { error: "Missing x-api-key header" }, 
                { status: 401, headers: CORS_HEADERS }
            );
        }

        if (!email) {
            return NextResponse.json(
                { error: "Missing URL or email parameter" }, 
                { status: 400, headers: CORS_HEADERS }
            );
        }

        // Verify API key
        const keyRecord = await prisma.apiKey.findFirst({
            where: { key: apiKey }
        });

        if (!keyRecord) {
            return NextResponse.json(
                { error: "Invalid API Key" }, 
                { status: 401, headers: CORS_HEADERS }
            );
        }

        // Perform check
        // If it's a URL, extract the domain. If it's an email, also extract the domain.
        let domain = "";
        if (email.includes("@")) {
            domain = email.split("@")[1]?.toLowerCase();
        } else {
            try {
                // Try to parse as URL if no @
                domain = new URL(email.startsWith("http") ? email : `https://${email}`).hostname.toLowerCase();
            } catch {
                domain = email.toLowerCase();
            }
        }
        
        if (!domain) {
            return NextResponse.json(
                { error: "Invalid format" }, 
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const isDisposable = disposableDomains.includes(domain);

        // Log the usage
        try {
            await prisma.usageLog.create({
                data: {
                    apiKeyId: keyRecord.id,
                    endpoint: "/api/v1/verify",
                    email: email,
                    isDisposable: isDisposable
                }
            });
        } catch (e) {
            console.error("Failed to log usage", e);
        }

        return NextResponse.json({
            email,
            isDisposable,
            domain
        }, { headers: CORS_HEADERS });

    } catch (error) {
        console.error("Render failure in verify route:", error);
        return NextResponse.json(
            { error: "Internal server error (render failure)" }, 
            { status: 500, headers: CORS_HEADERS }
        );
    }
}
