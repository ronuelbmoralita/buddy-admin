import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PassengerMenu from './components/menu/passengerMenu';
import PassengerHome from './components/home/passengerHome';
//import PassengerMerchant from './components/merchant/passengerMerchant';

//import Rider from './components/rider/rider';
//import RiderRequirements from './components/rider/riderRequirements';

const Stack = createNativeStackNavigator();

export default function PassengerNavigator() {
  return (
    <Stack.Navigator initialRouteName="PassengerMenu">
      <Stack.Screen name="PassengerMenu" component={PassengerMenu}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }} />
      <Stack.Screen name="PassengerHome" component={PassengerHome}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }} />
        {/*}
      <Stack.Screen name="Rider" component={Rider}
        options={
          {
            headerTitle: '',
            headerShadowVisible: false,
            animation: "slide_from_right",
          }} />
      <Stack.Screen name="RiderRequirements" component={RiderRequirements}
        options={
          {
            headerTitle: '',
            headerShadowVisible: false,
            animation: "slide_from_right",
          }} />
      <Stack.Screen name="PassengerMerchant" component={PassengerMerchant}
        options={
          {
            headerTitle: '',
            headerShadowVisible: false,
            animation: "slide_from_right",
          }} />
        */}
    </Stack.Navigator>
  );
}
