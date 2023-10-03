import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function UserTermsConditions() {

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
                    {props.description}
                </Text>
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
                        description={`These terms and conditions ("Terms") govern your use of the Buddy App ("the App"), operated by [Your Company Name] ("we," "us," or "our"). By using the App, you agree to these Terms. If you do not agree with these Terms, please do not use the App.`}
                    />
                    <Content
                        title="User Accounts"
                        description={`To use certain features of the App, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.`}
                    />
                    <Content
                        title="App Usage"
                        description={`The App offers services related to [describe the services offered by the app]. You agree to use the App only for lawful purposes and in accordance with these Terms.`}
                    />
                    <Content
                        title="User Conduct"
                        description={`You must not use the App in any way that could harm, disable, overburden, or impair the App's functioning or interfere with others' use of the App.`}
                    />
                    <Content
                        title="Intellectual Property"
                        description={`The content, design, and functionality of the App are protected by intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on the App without our prior written consent.`}
                    />
                    <Content
                        title="Privacy"
                        description={`Your use of the App is also governed by our Privacy Policy, which is available [provide a link to your Privacy Policy]. Please review the Privacy Policy to understand how we collect, use, and protect your personal information.`}
                    />
                    <Content
                        title="Disclaimers"
                        description={`The App is provided on an "as is" and "as available" basis. We do not warrant that the App will be error-free or uninterrupted, or that defects will be corrected.`}
                    />
                    <Content
                        title="Limitation of Liability"
                        description={`We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the App or your inability to access or use the App.`}
                    />
                    <Content
                        title="Termination"
                        description={`We reserve the right to terminate or suspend your account and access to the App at our sole discretion, without prior notice or liability, for any reason.`}
                    />
                    <Content
                        title="Governing Law"
                        description={`These Terms are governed by and construed in accordance with the laws of [your country or state]. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts in [your city or region].`}
                    />
                    <Content
                        title="Changes to Terms"
                        description={`We reserve the right to modify or update these Terms at any time. Changes will be effective immediately upon posting to the App. Your continued use of the App after such modifications will constitute your acknowledgment of the modified Terms.`}
                    />
                    <Content
                        title="Contact Us"
                        description={`If you have any questions about these Terms, Please go to Profile > Contact Us.`}
                    />
                    <Content
                        title="Effective Date"
                        description={`These Terms were last updated on October 03, 2023.`}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
