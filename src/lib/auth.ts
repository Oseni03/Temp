import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { apiKey } from "@better-auth/api-key";
import { organization } from "better-auth/plugins";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { prisma } from "@/lib/db";

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN || "test",
    server: 'sandbox', 
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        apiKey(),
        organization({
            async organizationLimit(user) {
                if (!user) return true;
                try {
                    const customers = await polarClient.customers.list({
                        externalId: user.id
                    });
                    const customer = customers.items?.[0];
                    if (!customer) return true;

                    const subs = await polarClient.subscriptions.list({
                        customerId: customer.id,
                        active: true,
                        limit: 1
                    });
                    
                    if (subs.items && subs.items.length > 0) {
                        return false; // Pro plan allows up to 10 project organizations
                    }
                    return true; // Free plan allows 1 project organization only
                } catch (error) {
                    console.error("[Auth] Failed to check organization limit from Polar:", error);
                    return true;
                }
            }
        }),
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        { slug: "pro" }
                    ],
                    successUrl: "/dashboard/settings/project/billing?checkout_id={CHECKOUT_ID}",
                    authenticatedUsersOnly: true
                }),
                portal(),
                usage(),
                webhooks({
                    secret: process.env.POLAR_WEBHOOK_SECRET,
                })
            ],
        }),
    ],
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await auth.api.createOrganization({
                        headers: new Headers(),
                        body: {
                            name: "Personal Project",
                            userId: user.id,
                            slug: `project-${Math.random().toString(36).substring(2, 10)}`,
                            keepCurrentActiveOrganization: true
                        },
                    });
                },
            },
        },
    },
});

