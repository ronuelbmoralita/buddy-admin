import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import { IconButton, Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import UserPrivacyPolicy from './components/userPrivacyPolicy';
import UserTermsConditions from './components/userTermsConditions';

export default function AgreementNavigator({ route }) {

    const { component } = route.params;

    return (
        <Stack.Navigator initialRouteName="Agreement">
            <Stack.Screen
                name="Agreement"
                component={
                    component === "privacy-policy"
                        ?
                        UserPrivacyPolicy
                        :
                        UserTermsConditions
                }
                options={{
                    headerTitle: component === "privacy-policy"
                        ?
                        "Privacy & Policy"
                        :
                        "Terms & Conditions"
                    ,
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
