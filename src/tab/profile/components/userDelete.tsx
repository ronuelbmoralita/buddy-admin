import React, { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import { useNavigation } from '@react-navigation/native';

import { local_user, user } from '../../../global/localStorage';

export default function DeleteAccount() {

    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: '890707384472-r6kutndhdccoroeui3o4c9hujb49si5c.apps.googleusercontent.com',
    });

    const [loading, setLoading] = useState(false)

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
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            //justifyContent: 'center',
            //alignItems: 'center',
        }}>
            <View style={{
                width: '90%',
                alignSelf: 'center',
            }}>
                <Text style={{
                    color: 'black',
                    letterSpacing: 2,
                }}>
                    {`\nDisclaimer: Please note that once your account is deleted, you will not be able to recover the following:
                \n1. Personal data, including your profile photo.
                \n2. The remaining balance in your wallet if you are a Büddy Rider.
                \n3. User activity history.`}
                </Text>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 20,
                width: '90%',
                alignSelf: 'center'
            }}>
                <Button
                    mode='outlined'
                    textColor='red'
                    style={{
                        borderColor: 'red',
                        borderWidth: 2,
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    loading={loading}
                    disabled={loading}
                    onPress={async () => {
                        Alert.alert('Delete Account', 'Are you sure you want to delete your Account? This will permanently erase your account.', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: async () => {
                                    //delete image
                                    if (userData?.user_type === "Passenger") {
                                        let passengerImage = [
                                            {
                                                url: userData?.user_image,
                                            },
                                            /*
                                            {
                                                url: userData?.user_merchant_bir,
                                            },
                                            {
                                                url: userData?.user_merchant_dti,
                                            },
                                            {
                                                url: userData?.user_merchant_id,
                                            },
                                            */
                                        ];
                                        passengerImage.forEach(function (profile) {
                                            const url = profile.url;
                                            var imageDelete = url.split('%2F')[1].split('?alt=')[0];
                                            //console.log(imageDelete);
                                            let imageRef = storage().ref('/buddyImage/' + imageDelete);
                                            imageRef
                                                .delete()
                                                .then(() => {
                                                    console.log(`Deleted successfully.`);
                                                })
                                                .catch((e) => console.log('error on image deletion => ', e));
                                        });
                                    }
                                    if (userData?.user_type === "Rider") {
                                        let driverImage = [
                                            {
                                                url: userData?.user_image,
                                            },
                                            {
                                                url: userData?.user_driver_medical,
                                            },
                                            {
                                                url: userData?.user_driver_brgy,
                                            },
                                            {
                                                url: userData?.user_driver_nbi,
                                            },
                                            {
                                                url: userData?.user_driver_license,
                                            },
                                            {
                                                url: userData?.user_motor_or,
                                            },
                                            {
                                                url: userData?.user_motor_cr,
                                            },
                                            {
                                                url: userData?.user_motor_image_front,
                                            },
                                            {
                                                url: userData?.user_motor_image_left,
                                            },
                                            {
                                                url: userData?.user_motor_image_right,
                                            },
                                        ];
                                        driverImage.forEach(function (profile) {
                                            const url = profile.url;
                                            var imageDelete = url.split('%2F')[1].split('?alt=')[0];
                                            //console.log(imageDelete);
                                            let imageRef = storage().ref('/buddyImage/' + imageDelete);
                                            imageRef
                                                .delete()
                                                .then(() => {
                                                    console.log(`Deleted successfully.`);
                                                })
                                                .catch((e) => console.log('error on image deletion => ', e));
                                        });
                                    }
                                    //delete account
                                    setLoading(true);
                                    firestore()
                                        .collection('user')
                                        .doc(auth().currentUser?.uid)
                                        .delete()
                                        .then(() => {
                                            console.log('User deleted!');
                                        });
                                    //delete authentication
                                    const { idToken } = await GoogleSignin.signIn();
                                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                                    await auth().signInWithCredential(googleCredential);
                                    auth()?.currentUser?.delete()
                                        .then(async () => {
                                            try {
                                                await GoogleSignin.revokeAccess();
                                                await GoogleSignin.signOut();
                                                navigation.replace('UserLogin');
                                                setLoading(false);
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }).catch((error) => {
                                            console.log(error, "error")
                                            const e = JSON.stringify(error)
                                            Alert.alert(e)
                                        });
                                }
                            },
                        ]);
                    }}>
                    {loading === true
                        ?
                        "Please wait for deletion..."
                        :
                        "Delete Now"
                    }
                </Button>
            </View>
        </View>
    );
};