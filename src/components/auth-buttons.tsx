"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-lg px-5 text-muted-foreground hover:text-foreground hover:bg-transparent"
            onClick={handleSignOut}
        >
            Sign out
        </Button>
    );
}
