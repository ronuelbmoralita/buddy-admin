import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function UserPrivacyPolicy() {

    function Content(props) {
        return (
            <View style={{ gap: 10, marginBottom: 20 }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                }}>
                    {props.title}
                </Text>
                <Text style={{
                    color: 'gray',
                    letterSpacing: 2,
                }}>
                    {props.descriptionOne}
                </Text>
                {props.desc_two_enabled === false
                    ?
                    null
                    :
                    <Text style={{
                        color: 'gray',
                        letterSpacing: 2,
                    }}>
                        {props.descriptionTwo}
                    </Text>
                }
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            //justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        }}>
            <ScrollView style={{
                width: '100%'
            }}>
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    //alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Content
                        title="Introduction"
                        descriptionOne={`Welcome to the Privacy Policy ("Policy") for the Büddy App ("the App"), operated by [Your Company Name] ("we," "us," or "our"). This Policy outlines how we collect, use, disclose, and protect your personal information when you use the App. By using the App, you consent to the practices described in this Policy.`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Information We Collect"
                        descriptionOne={`1. We may collect personal information you provide directly to us, including but not limited to:
                        \n•Name\n•Contact information (email address, phone number)\n•Location data\n•Transaction details\n•User-generated content (messages, reviews, feedback)`}
                        desc_two_enabled={true}
                        descriptionTwo={`2. We may collect information automatically as you use the App, such as:
                        \n•Device information (type, operating system, browser)\n•Log data (IP address, date and time of access, actions taken)\n•Usage patterns and preferences`}
                    />
                    <Content
                        title="How We Use Your Information"
                        descriptionOne={`1. We use the collected information to:
                        \n•Provide and improve our services\n•Process transactions and bookings\n•Respond to inquiries and support requests\n•Send notifications and updates\n•Analyze usage patterns and optimize app performance`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Sharing of Information"
                        descriptionOne={`1. We may share your information with:
                        \n•Service providers assisting with app operations\n•Legal authorities in response to legal requests`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Your Choices"
                        descriptionOne={`1. You can:
                        \n•Access and update your personal information\n•Opt out of marketing communications\n•Adjust location and device permissions\n•Delete your account and associated data`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Data Security"
                        descriptionOne={`1. We take reasonable measures to protect your data but cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Children's Privacy"
                        descriptionOne={`1. The App is not intended for users under the age of 13. We do not knowingly collect information from children.`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Changes to Privacy Policy"
                        descriptionOne={`1. We may update this Policy as needed. Changes will be effective upon posting. Continued use of the App after changes indicates your acceptance of the updated Policy.`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Contact Us"
                        descriptionOne={`1. If you have any questions about this Privacy Policy, Please go to Profile > Contact Us.`}
                        desc_two_enabled={false}
                    />
                    <Content
                        title="Effective Date"
                        descriptionOne={`This Privacy Policy was last updated on October 03, 2023.`}
                        desc_two_enabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
