import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from './userProfile';
import UserAbout from './components/userAbout';
import UserContact from './components/userContacts';
import UserHelp from './components/userHelp';

const Stack = createNativeStackNavigator();

export default function UserProfileNavigator() {

    function Title(props) {
        return (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: '500',
                    color: 'black',
                    letterSpacing: 2
                }}>
                    {props.title}
                </Text>
            </View>
        )
    }

    return (
        <Stack.Navigator initialRouteName="UserProfile">
            <Stack.Screen name="UserProfile" component={UserProfile}
                options={{
                    //headerTitle: 'Merchant Logo',
                    headerTitle: (props) => <View {...props} >
                        <Title
                            title="Profile"
                        />
                    </View>,
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen name="UserAbout" component={UserAbout}
                options={{
                    headerTitle: 'About Buddy',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen name="UserContact" component={UserContact}
                options={{
                    headerTitle: 'Contact Us',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen name="UserHelp" component={UserHelp}
                options={{
                    headerTitle: 'Help',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
        </Stack.Navigator>
    );
}

