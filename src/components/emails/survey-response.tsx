import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

const SurveyResponseEmail = (props: { userName?: string, userEmail?: string, finalChallenge?: string, currentSolution: string }) => {
    const { userName, userEmail, finalChallenge, currentSolution } = props;

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>New API Survey Response from {userName || "Anonymous"}</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white mx-auto p-[40px] rounded-[8px] max-w-[600px]">
                        <Section>
                            <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] mt-0">
                                New API Survey Response
                            </Heading>

                            <Section className="mb-[24px]">
                                <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                    <strong>User:</strong> {userName || "Anonymous"} ({userEmail})
                                </Text>
                            </Section>

                            <Section className="mb-[24px]">
                                <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                    <strong>Biggest Challenge:</strong> {finalChallenge}
                                </Text>
                            </Section>

                            <Section className="mb-[32px]">
                                <Text className="text-[16px] text-gray-900 mb-[8px] mt-0">
                                    <strong>Current Solution for [{finalChallenge}]:</strong>
                                </Text>
                                <Text className="text-[16px] text-gray-700 mt-0 leading-[24px]">
                                    {currentSolution}
                                </Text>
                            </Section>

                            <Section className="border-t border-solid border-gray-200 pt-[24px]">
                                <Text className="text-[14px] text-gray-500 mt-0 mb-[8px]">
                                    Survey submitted on {new Date().toLocaleDateString()}
                                </Text>
                                <Text className="text-[12px] text-gray-400 m-0">
                                    This is an automated notification from your API survey system.
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

SurveyResponseEmail.PreviewProps = {
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    finalChallenge: "API Rate Limiting",
    currentSolution: "Currently using a basic retry mechanism with exponential backoff, but it's not handling edge cases well and sometimes causes delays in our application response times."
};

export default SurveyResponseEmail;