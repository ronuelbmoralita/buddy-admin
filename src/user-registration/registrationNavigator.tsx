import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserSelect from './components/userSelect';
import UserName from './components/userName';
import UserGCash from './components/userGCash';
import UserEmergency from './components/userEmergency';
import UserImage from './components/userImage';
import UserSubmit from './components/userSubmit';

const Stack = createNativeStackNavigator();

export default function RegistrationNavigator() {
  return (
    <Stack.Navigator initialRouteName="UserSelect">
      <Stack.Screen name="UserSelect" component={UserSelect}
        options={
          {
            headerShadowVisible: false,
            headerTitle: '',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
            animation: "slide_from_right",
          }}
      />
      <Stack.Screen name="UserName" component={UserName}
        options={
          {
            headerTitle: 'Real Name',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
            animation: "slide_from_right",
          }}
      />
      <Stack.Screen name="UserGCash" component={UserGCash}
        options={
          {
            headerTitle: 'Mobile Number',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
            animation: "slide_from_right",
          }}
      />
      <Stack.Screen name="UserEmergency" component={UserEmergency}
        options={
          {
            headerTitle: 'Emergency Number',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
            animation: "slide_from_right",
          }}
      />
       <Stack.Screen name="UserImage" component={UserImage}
      options={
          {
            headerTitle: 'Selfie',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
            animation: "slide_from_right",
          }}
      />
      < Stack.Screen name="UserSubmit" component={UserSubmit}
          options={
            {
              headerTitle: '',
              headerShadowVisible: false,
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
              },
              animation: "slide_from_right",
            }}
      />
    </Stack.Navigator>
  );
}


