import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { apiKey } from "@better-auth/api-key";
import { organization } from "better-auth/plugins";
import { prisma } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";
import { createOrganization } from "@/server/organizations";
import { resend } from "./resend";
import OrganizationInvitationEmail from "@/components/emails/invitation-email";
import { ac, adminRole, memberRole, ownerRole } from "@/server/permissions";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await createOrganization(user.id, {
                        name: "Personal Project",
                        slug: `project-${Math.random().toString(36).substring(2, 10)}`,
                    });
                },
            },
        },
    },
    plugins: [
        apiKey({
            requireName: true,
            rateLimit: {
                enabled: true,
                timeWindow: 1000 * 60 * 1, // 1 minute
                maxRequests: 10, // 10 requests per minute
            },
            references: "organization",
        }),
        organization({
            ac,
            roles: { owner: ownerRole, admin: adminRole, member: memberRole },
            sendInvitationEmail: async (data) => {
                const toEmail = data.email;
                const orgName = data.organization.name;
                const from = data.inviter.user.name;
                const role = data.role;
                if (
                    !process.env.RESEND_API_KEY ||
                    process.env.RESEND_API_KEY === "test"
                ) {
                    console.log("--- INVITATION SUBMISSION (SIMULATED) ---");
                    console.log("To:", toEmail);
                    console.log("From:", from || "Anonymous");
                    console.log("Organization:", orgName);
                    console.log("Role:", role);
                    console.log("------------------------------------");

                    // Simulate delay
                    await new Promise((resolve) => setTimeout(resolve, 800));
                }

                await resend.emails.send({
                    from: "Invitation <onboarding@resend.dev>",
                    to: toEmail,
                    subject: `New Invitation: ${orgName}`,
                    react: OrganizationInvitationEmail({
                        role,
                        invitationId: data.id,
                        organizationName: data.organization.name,
                        organizationLogo: data.organization.logo,
                        inviterName: data.inviter.user.name,
                        inviterEmail: data.inviter.user.email,
                        expiresAt: data.invitation.expiresAt,
                    }),
                });
            },
        }),
        nextCookies(),
    ],
});
