import React, { useEffect, useState, useRef } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RiderHome from './components/riderHome';
import RiderGCash from './components/riderGCash';

const Stack = createNativeStackNavigator();

export default function RiderNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="RiderHome">
            <Stack.Screen name="RiderHome" component={RiderHome}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name="RiderGCash" component={RiderGCash}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#007dfe',
                    },
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }} />
        </Stack.Navigator>
    );
}


