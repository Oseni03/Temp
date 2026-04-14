import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

const OrganizationInvitationEmail = (props: {
    role: string,
    organizationName: string,
    organizationLogo?: string | null,
    invitationId: string,
    inviterName: string,
    inviterEmail: string,
    expiresAt: Date,
}) => {
    const {
        role,
        invitationId,
        organizationName,
        organizationLogo,
        inviterName,
        inviterEmail,
        expiresAt
    } = props;

    const acceptUrl = `https://${process.env.NEXT_PUBLIC_APP_URL}/invitations/${invitationId}/accept`;
    const declineUrl = `https://${process.env.NEXT_PUBLIC_APP_URL}/invitations/${invitationId}/decline`;

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>You've been invited to join {organizationName}</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white mx-auto p-[40px] rounded-[8px] max-w-[600px]">
                        <Section className="text-center mb-[32px]">
                            {organizationLogo && (
                                <Img
                                    src={organizationLogo}
                                    alt={`${organizationName} logo`}
                                    className="w-[80px] h-auto object-cover mx-auto mb-[16px]"
                                />
                            )}
                            <Heading className="text-[28px] font-bold text-gray-900 mb-[8px] mt-0">
                                You're invited!
                            </Heading>
                            <Text className="text-[16px] text-gray-600 mt-0">
                                Join {organizationName} and start collaborating
                            </Text>
                        </Section>

                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-900 mb-[16px] mt-0">
                                Hi there,
                            </Text>
                            <Text className="text-[16px] text-gray-900 mb-[16px] mt-0 leading-[24px]">
                                <strong>{inviterName}</strong> ({inviterEmail}) has invited you to join <strong>{organizationName}</strong> as a <strong>{role}</strong>.
                            </Text>
                            <Text className="text-[16px] text-gray-900 mb-[24px] mt-0 leading-[24px]">
                                Accept this invitation to start collaborating with your team and access all the tools and resources available in the organization.
                            </Text>
                        </Section>

                        <Section className="mb-[32px]">
                            <Text className="text-[14px] text-gray-600 mb-[12px] mt-0">
                                <strong>Invitation Details:</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[4px] mt-0">
                                Organization: {organizationName}
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[4px] mt-0">
                                Role: {role}
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[4px] mt-0">
                                Invited by: {inviterName}
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[16px] mt-0">
                                Expires: {new Date(expiresAt).toLocaleDateString()}
                            </Text>
                        </Section>

                        <Section className="text-center mb-[32px]">
                            <Button
                                href={acceptUrl}
                                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium box-border inline-block"
                            >
                                Accept Invitation
                            </Button>
                        </Section>

                        <Section className="text-center mb-[32px]">
                            <Text className="text-[14px] text-gray-500 mb-[8px] mt-0">
                                Don't want to join? You can{' '}
                                <a href={declineUrl} className="text-gray-600 underline">
                                    decline this invitation
                                </a>
                            </Text>
                            <Text className="text-[12px] text-gray-400 mt-0">
                                This invitation will expire on {new Date(expiresAt).toLocaleDateString()}
                            </Text>
                        </Section>

                        <Section className="border-t border-solid border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-400 m-0 text-center">
                                © {new Date().getFullYear()} {organizationName}. All rights reserved.
                            </Text>
                            <Text className="text-[12px] text-gray-400 m-0 text-center">
                                If you have any questions, please contact your administrator.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default OrganizationInvitationEmail;