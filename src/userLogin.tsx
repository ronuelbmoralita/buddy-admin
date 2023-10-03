import React, { useEffect, useState } from 'react';
import { View, StatusBar, Linking, Alert, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Animated, {
    SlideInUp,
    FadeOut
} from 'react-native-reanimated';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import messaging from '@react-native-firebase/messaging';

import { local_user } from './global/localStorage';

import FastImage from 'react-native-fast-image'
import { GetAllPermissions } from './global/permissions';

export default function UserLogin({ navigation }) {

    GetAllPermissions();

    const [hideButton, setHideButton] = useState(true);
    const [loading, setLoading] = useState(false);

    GoogleSignin.configure({
        webClientId: '890707384472-r6kutndhdccoroeui3o4c9hujb49si5c.apps.googleusercontent.com',
    });

    useEffect(() => {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                firestore()
                    .collection('user')
                    .doc(auth().currentUser?.uid)
                    .get()
                    .then(documentSnapshot => {
                        console.log('User exists: ', documentSnapshot.exists);
                        if (documentSnapshot.exists) {
                            if (documentSnapshot.data().user_type === "Rider"
                                ||
                                documentSnapshot.data().user_type === "Passenger"
                            ) {
                                //local user
                                local_user.set('local_user', JSON.stringify(documentSnapshot.data()));

                                const getToken = async () => {
                                    await messaging().registerDeviceForRemoteMessages();
                                    const token = await messaging().getToken();
                                    firestore()
                                        .collection('user')
                                        .doc(auth().currentUser?.uid)
                                        .update({
                                            user_device_token: token,
                                        })
                                        .then(() => {
                                            console.log('User updated!');
                                        });
                                }
                                getToken();
                                setTimeout(() => {
                                    navigation.replace('UserTab', {//UserTab//RegistrationNavigator
                                        user: documentSnapshot?.data()?.user_type,
                                    })
                                    setLoading(false);
                                }, 2000);
                            }
                            else {
                                navigation.replace('RegistrationNavigator');
                                setLoading(false);
                            }
                        }
                        else {
                            navigation.replace('RegistrationNavigator');
                            setLoading(false);
                        }
                    });
            } else {
                setHideButton(false);
                return;
            }
        });
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <StatusBar
                barStyle={'dark-content'}
                translucent
                backgroundColor="transparent"
            />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 200
            }}>
                <Animated.View
                    entering={SlideInUp.duration(1000)}
                    exiting={FadeOut.duration(0)}
                    style={[
                        {
                            alignItems: 'center',
                        },
                    ]}>
                    <FastImage
                        style={{
                            height: 250,
                            width: 250,
                        }}
                        source={require('./images/onBoarding/buddy.png')}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                   <Text style={{
                        fontSize:50,
                        fontFamily: 'onest_bold',
                    }}>Büddy</Text>
                </Animated.View>
            </View>
            {hideButton === true
                ?
                null
                :
                <View style={{
                    position: 'absolute',
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    bottom: 0,
                    gap: 10,
                }}>
                    <Button
                        icon='google'
                        mode="contained"
                        buttonColor='black'
                        disabled={loading}
                        loading={loading}
                        style={{
                            borderRadius: 100,
                        }}
                        contentStyle={{
                            padding: 10,
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        onPress={async () => {
                            setLoading(true);
                            try {
                                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                                const { idToken } = await GoogleSignin.signIn();
                                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                                await auth().signInWithCredential(googleCredential);
                            } catch (error: any) { // Specify the type of 'error' as 'any'
                                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                                    setLoading(false);
                                    return;
                                } else if (error.code === statusCodes.IN_PROGRESS) {
                                    return;
                                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                                    // Play services not available or outdated
                                } else {
                                    console.log(error);
                                }
                            }
                        }}>
                        Sign in with Google
                    </Button>
                </View>
            }
        </View>
    );
};


