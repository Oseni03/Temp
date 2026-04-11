"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CreditCard, Sparkles } from "lucide-react";

export default function BillingPage() {
    const { data: session } = authClient.useSession();
    const organizationId = session?.session.activeOrganizationId;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [portalLoading, setPortalLoading] = useState(false);

    useEffect(() => {
        if (!organizationId) {
            setLoading(false);
            return;
        }

        async function fetchSubscriptions() {
            try {
                // Fetch active subscriptions for the current organization
                const response = await authClient.customer.subscriptions.list({
                    query: { 
                        page: 1, 
                        limit: 10, 
                        active: true, 
                        // Use assertion because type might not be fully inferred
                        ...({ referenceId: organizationId } as any) 
                    }
                });
                
                if (response.data) {
                    setSubscriptions(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch subscriptions", err);
                toast.error("Failed to load billing details");
            } finally {
                setLoading(false);
            }
        }

        fetchSubscriptions();
    }, [organizationId]);

    const handleCheckout = async () => {
        if (!organizationId) {
            toast.error("No active project");
            return;
        }
        
        setCheckoutLoading(true);
        try {
            await authClient.checkout({
                slug: "pro", 
                // Pass organization context for B2B billing
                ...({ referenceId: organizationId } as any)
            });
        } catch (err) {
            console.error("Checkout failed:", err);
            toast.error("Failed to start checkout");
            setCheckoutLoading(false);
        }
    };

    const handlePortal = async () => {
        setPortalLoading(true);
        try {
            await authClient.customer.portal();
        } catch (err) {
            console.error("Portal redirect failed:", err);
            toast.error("Failed to open billing portal");
            setPortalLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const hasActiveSubscription = subscriptions.length > 0;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium tracking-tight">Billing & Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your project's billing and subscription plans.
                </p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {hasActiveSubscription ? (
                            <>
                                <Sparkles className="h-5 w-5 text-primary" />
                                Pro Plan
                            </>
                        ) : (
                            <>
                                <CreditCard className="h-5 w-5" />
                                Free Plan
                            </>
                        )}
                    </CardTitle>
                    <CardDescription>
                        {hasActiveSubscription 
                            ? "Your project is currently on the Pro plan with access to all premium features." 
                            : "Upgrade to the Pro plan to unlock advanced features, more api keys and premium support."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!hasActiveSubscription && (
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                            <h4 className="font-medium mb-2">Pro Plan Includes:</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Unlimited API Requests
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Advanced Rate Limiting
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Priority Email Support
                                </li>
                            </ul>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex gap-4">
                    {!hasActiveSubscription ? (
                        <Button 
                            onClick={handleCheckout} 
                            disabled={checkoutLoading || !organizationId}
                        >
                            {checkoutLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Upgrade to Pro
                        </Button>
                    ) : (
                        <Button 
                            variant="outline"
                            onClick={handlePortal} 
                            disabled={portalLoading}
                        >
                            {portalLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Manage Subscription
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
