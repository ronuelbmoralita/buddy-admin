import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

export default function UserHelp() {
    return (
        <View
            style={{
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
                }}>
                    <Text style={{
                        color: 'black',
                        letterSpacing: 3,
                    }}>
                        {"\n"}
                        1. What is Büddy?
                        {"\n"}
                        {"\n"}
                        Büddy is a mobile app designed to provide improved transportation services and essential shopping options in rural areas, primarily focusing on the provinces of the Philippines.
                        {"\n"}
                        {"\n"}
                        2. How can I book a ride using Büddy?
                        {"\n"}
                        {"\n"}
                        To book a ride, simply open the Büddy app and navigate to the Pasakay feature. Enter your pick-up and drop-off locations, select a driver from the available options, and confirm your booking. Your ride will be on its way!
                        {"\n"}
                        {"\n"}
                        3. Can I use Büddy for essential shopping?
                        {"\n"}
                        {"\n"}
                        Yes! Büddy offers the Pabili feature, which allows you to select a driver to shop for essential items on your behalf. Choose a trusted driver from the app, provide them with your shopping list, and they will deliver the items right to your doorstep.
                        {"\n"}
                        {"\n"}
                        4. How can I support local businesses through Büddy?
                        {"\n"}
                        {"\n"}
                        Büddy encourages local business growth through its Büddy Merchant feature. Local stores can create accounts on the app, showcasing their products and services. As a user, you can easily browse and select items from these registered merchants, supporting local entrepreneurship and community businesses.
                        {"\n"}
                        {"\n"}
                        5. Is Büddy available in all rural provinces of the Philippines?
                        {"\n"}
                        {"\n"}
                        Büddy aims to expand its services to as many rural provinces as possible. While our initial focus is on specific provinces, we are continuously working to broaden our reach and make Büddy available in more areas.
                        {"\n"}
                        {"\n"}
                        6. Are the drivers on Büddy reliable and trustworthy?
                        {"\n"}
                        {"\n"}
                        Büddy ensures driver reliability and trustworthiness by implementing a rigorous selection process. We thoroughly screen and train our drivers to ensure they meet our high standards of professionalism and customer service.
                        {"\n"}
                        {"\n"}
                        7. How can I provide feedback or report an issue?
                        {"\n"}
                        {"\n"}
                        We value your feedback and encourage you to reach out to us. You can submit feedback or report any issues by navigating to the app's settings menu and selecting the "Contact Us" option. We will promptly address your concerns and work to enhance your Büddy experience.
                        {"\n"}
                        {"\n"}
                        8. Is my personal information secure on Büddy?
                        {"\n"}
                        {"\n"}
                        Büddy takes the privacy and security of your personal information seriously. We employ strict measures to safeguard your data, adhering to industry best practices and complying with applicable privacy laws. If you have any further questions or need assistance, feel free to reach out to our support team through the app. We're here to help!
                        {"\n"}
                        {"\n"}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};
