"use server";

import { auth } from "@/lib/auth";

export async function createApiKey(name: string) {
    const data = await auth.api.createApiKey({
        body: { name },
    });
    return data;
}
