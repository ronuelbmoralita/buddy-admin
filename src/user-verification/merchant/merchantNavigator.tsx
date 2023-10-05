import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MerchantStart from './components/merchantStart';
import MerchantRequirements from './components/merchantRequirements';
import MerchantDetails from './components/merchantDetails';

const Stack = createNativeStackNavigator();

import { local_user, user } from '../../global/localStorage';
import FastImage from 'react-native-fast-image';

export default function MerchantNavigator() {

    const getUser = user();

    const [userData, setUserData] = useState(getUser);

    useEffect(() => {
        const listener = local_user.addOnValueChangedListener((changedKey) => {
            const newObject = local_user.getString(changedKey);
            const object = JSON.parse(newObject)
            setUserData(object);
        })
        return () => {
            listener.remove()
        }
    }, []);

    return (
        <Stack.Navigator initialRouteName={userData?.user_merchant_account === "Disable"
            ?
            "MerchantStart"
            :
            userData?.user_merchant_account === "Pending"
                ?
                "MerchantPending"
                :
                "MerchantProfile"
        }>
            <Stack.Screen name="MerchantStart" component={MerchantStart}
                options={{
                    headerTitle: '',
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen name="MerchantRequirements" component={MerchantRequirements}
                options={{
                    headerTitle: 'Merchant Requirements',
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen name="MerchantDetails" component={MerchantDetails}
                options={{
                    headerTitle: 'Business Details',
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
        </Stack.Navigator>
    );
}

