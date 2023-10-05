import React, { useState, useEffect } from 'react';
import { View, Alert, AppState, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

import NetInfo from '@react-native-community/netinfo';
import FlashMessage, { showMessage } from "react-native-flash-message";

import notifee, {
  EventType,
  AndroidCategory,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';

import {
  local_activity,
  local_launch,
  local_user,
  local_controller,
} from './src/global/localStorage';

import { GlobalAlertProvider } from './src/global/globalAlert';

import UserOnBoarding from './src/userOnBoarding';
import UserLogin from './src/userLogin';
import UserTab from './src/tab/userTab';
import UserProgress from './src/user-progress/userProgress';
import AgreementNavigator from './src/agreement/agreementNavigator';
import RegistrationNavigator from './src/user-registration/registrationNavigator';
import VerificationNavigator from './src/user-verification/rider/verificationNavigator';
import MerchantNavigator from './src/user-verification/merchant/merchantNavigator';
import EditNavigator from './src/user-edit/editNavigator';

const Stack = createNativeStackNavigator();

function App() {

  //user

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('user')
      .doc(auth().currentUser?.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
          local_user.set('local_user', JSON.stringify(documentSnapshot.data()));
        }
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    /**/
    firestore()
      .collection('activity')
      .where('activity', '==', "Active")
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size === 0) {
          //return;
          const json = local_activity.getString('local_activity') // { 'username': 'Marc', 'age': 21 }
          if (json) {
            const object = JSON.parse(json)
            const modifiedEmployees = object.map(obj => {
              if (obj.activity === "Active") {
                return { ...obj, activity: "Inactive" };
              }
              return obj;
            });
            local_activity.set('local_activity', JSON.stringify(modifiedEmployees));
            //console.log(modifiedEmployees);
          }
          else {
            return;
          }
        }
        else {
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data(), "||||||||||||||||||||||||||||")
            const list = [];
            list.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
            local_activity.set('local_activity', JSON.stringify(list));
          });
        }
      });
  }, []);

  //controller
  useEffect(() => {
    const subscriber = firestore()
      .collection('controller')
      .doc('controller')
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          local_controller.set('local_controller', JSON.stringify(documentSnapshot.data()));
          /*
          const getMobile = Contacts.getContactsByPhoneNumber(documentSnapshot.data()?.mobile_number)
          getMobile.then(result => {
            //console.log(result)
            if (result.length === 0) {
              var saveBuddy = {
                recordID: 'controller_number',
                phoneNumbers: [{
                  label: 'mobile',
                  number: documentSnapshot.data()?.mobile_number,
                }],
                givenName: 'PASADA',
              }

              Contacts.addContact(saveBuddy);
              console.log("contact saved");
            }
            else {
              console.log("already saved")
              return;
            }
          });
          */
        }
      });
    return () => subscriber();
  }, []);

  //fcm listener
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //console.log('remoteMessage', JSON.stringify(remoteMessage));
      if (remoteMessage.data?.mode === "coordinate") {
        return;
      }
      else {
        DisplayNotification(remoteMessage);
      }
    });
    return unsubscribe;
  }, []);

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      bypassDnd: true,
      importance: AndroidImportance.HIGH,
      lights: true,
      vibration: true,
      vibrationPattern: [300, 500],
    });

    await notifee.displayNotification({
      id: "group", // important
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        groupSummary: true,
        groupId: "123",
        //largeIcon: remoteMessage.data.image,
        circularLargeIcon: true,
      }
    });

    // This notification would be created from the FCM payload: 
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        groupId: "123",
        //largeIcon: remoteMessage.data.image,
        circularLargeIcon: true,
      }
    });
  }

  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          //console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          //console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      showMessage({
        message: state?.isInternetReachable == true
          ?
          "Connected to Internet"
          :
          "No Internet Connection",
        //description: "My message description",
        type: state?.isInternetReachable == true
          ?
          "success"
          :
          "danger",
        color: "white",
        titleStyle: {
          fontWeight: 'bold',
          //padding: 5,
          letterSpacing: 2,
        },
        autoHide: state?.isInternetReachable == true
          ?
          true
          :
          false,
      });
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  //check if Buddy launch


  const json = local_launch.getString('local_launch') // { 'username': 'Marc', 'age': 21 }

  if (!json) {
    return (
      <NavigationContainer>
        <GlobalAlertProvider>
          <Stack.Navigator initialRouteName="UserLogin">
            <Stack.Screen name="UserLogin"
              component={UserLogin}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="UserTab" component={UserTab}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="UserProgress" component={UserProgress}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="AgreementNavigator" component={AgreementNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="RegistrationNavigator" component={RegistrationNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="VerificationNavigator" component={VerificationNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="MerchantNavigator" component={MerchantNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="EditNavigator" component={EditNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
          </Stack.Navigator>
        </GlobalAlertProvider>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <GlobalAlertProvider>
          <Stack.Navigator initialRouteName="UserOnBoarding">
            <Stack.Screen name="UserOnBoarding"
              component={UserOnBoarding}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="UserLogin"
              component={UserLogin}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="UserTab" component={UserTab}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="UserProgress" component={UserProgress}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="AgreementNavigator" component={AgreementNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="RegistrationNavigator" component={RegistrationNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="VerificationNavigator" component={VerificationNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="MerchantNavigator" component={MerchantNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
            <Stack.Screen name="EditNavigator" component={EditNavigator}
              options={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            />
          </Stack.Navigator>
        </GlobalAlertProvider>
      </NavigationContainer>
    );
  }
}

export default App;
