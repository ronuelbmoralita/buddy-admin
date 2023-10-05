import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';


export default function UserAbout() {
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
                    alignItems: 'center',
                }}>
                    <FastImage
                        style={{
                            height: 100,
                            width: 100
                        }}
                        source={require('../../../images/buddy.png')}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{
                        color: 'black',
                        letterSpacing: 3,
                    }}>
                        {"\n"}
                        Welcome to Büddy - Your Provincial Companion!
                        {"\n"}
                        {"\n"}
                        Büddy is your go-to app for hassle-free transportation and convenient deliveries in the province. We're more than just a ride-sharing service; we're your trusted partner for getting around and getting things done.
                        {"\n"}
                        {"\n"}
                        Pasakay: Need a lift? Büddy's Pasakay service connects you with local riders who can get you to your destination safely and affordably. Whether it's your daily commute or a weekend adventure, Büddy's got your back.
                        {"\n"}
                        {"\n"}
                        Pabili: Running errands has never been easier. With Büddy's Pabili service, you can order groceries, meals, or packages, and our dedicated riders will handle the rest. Sit back, relax, and let Büddy do the legwork.
                        {"\n"}
                        {"\n"}
                        Büddy Merchant: We are committed to supporting local entrepreneurs and fostering community growth. With Büddy Merchant, small to medium-sized businesses can connect with our users directly. By creating a Büddy Merchant account, local stores can showcase their products and services. Users can conveniently browse and select items based on store locations, helping to promote and uplift local businesses.
                        {"\n"}
                        {"\n"}
                        Why Choose Büddy?
                        {"\n"}
                        {"\n"}
                        Community: We're all about bringing communities together. Büddy is more than just an app; it's a network of friendly riders and users working together to simplify life in the province.
                        {"\n"}
                        {"\n"}
                        Safety: Your safety is our priority. Our riders undergo rigorous background checks, and our app features built-in safety measures for worry-free journeys.
                        {"\n"}
                        {"\n"}
                        User-Friendly: Booking a ride or placing a Pabili order is a breeze with Büddy's user-friendly interface. It's convenience at your fingertips.
                        {"\n"}
                        {"\n"}
                        Affordability: Fair pricing is our promise. Enjoy cost-effective transportation and delivery services that won't break the bank.
                        {"\n"}
                        {"\n"}
                        Join the Büddy community today and experience the future of motorcycle taxis and deliveries in the province. Download the Büddy app and let's ride and shop together!
                        {"\n"}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};
