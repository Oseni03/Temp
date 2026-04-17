"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createApiKey(name: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user.id || !session.session.activeOrganizationId) {
        throw new Error("User not authenticated");
    }

    const data = await auth.api.createApiKey({
        body: {
            name,
            userId: session.user.id,
            organizationId: session.session.activeOrganizationId,
        },
        headers: await headers(), // ← add this
    });

    return data;
}
