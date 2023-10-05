import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from '../../global/styles';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Geolocation from 'react-native-geolocation-service';

import { controller } from '../../global/localStorage';

export default function UserSubmit({  navigation, route }) {

    const {
        user,
        firstName,
        lastName,
        gCash,
        emergency,
        selfie,
    } = route.params;

    const [loading, setLoading] = useState(false);

    const hasUnsavedChanges = Boolean(loading);

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (hasUnsavedChanges === true) {
                    e.preventDefault();
                }
                else {
                    return;
                }
                console.log(hasUnsavedChanges)
            }),

        [hasUnsavedChanges, navigation]
    );

    const controllerData = controller();

    return (
        <View style={[styles.buddyContainer, {
            justifyContent: 'center',
            alignItems: 'center',
        }]}>
            <View style={{
                alignSelf: 'center',
                width: '90%',
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                    alignSelf: 'center',
                }}>
                    Thank you for using Büddy!
                </Text>
                <FastImage
                    style={{
                        height: 250,
                        width: 250,
                        alignSelf: 'center',
                    }}
                    source={require('../../images/thank-you.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                    fontSize: 20,
                    color: 'black',
                    letterSpacing: 2,
                    alignSelf: 'center',
                }}>
                    Büddy is happy to have you on board.
                </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={[
                styles.buttonContainer,
                {
                    gap: 20
                },
            ]}>
                {loading === true
                    ?
                    <Text style={{
                        color: 'salmon',
                        letterSpacing: 2,
                        alignSelf: 'center',
                    }}>
                        Please do not exit the app while in the process of submitting your requirements.
                    </Text>
                    :
                    null
                }
                <Button
                    mode="contained"
                    buttonColor='black'
                    loading={loading}
                    disabled={loading}
                    style={styles.buttonStyle}
                    contentStyle={styles.buttonContentStyle}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => {

                        setLoading(true);
                        setTimeout(() => {
                            const FrontImagePath = selfie.split("/").pop();
                            const FrontImageReference = storage().ref(`buddyImage/${FrontImagePath}`);
                            const FrontImageTask = FrontImageReference.putFile(selfie);

                            FrontImageTask.then(async () => {
                                console.log('BackID uploaded to the bucket!');

                                const FrontImageUrl = await FrontImageReference.getDownloadURL();

                                Geolocation.getCurrentPosition(position => {
                                    //console.log(position)
                                    if (user === 'Rider') {
                                        firestore()
                                            .collection('user')
                                            .doc(auth()?.currentUser?.uid)
                                            .set({
                                                user_account: '',
                                                user_id: auth()?.currentUser?.uid,
                                                user_name: `${firstName} ${lastName}`,
                                                user_name_first: firstName,
                                                user_name_last: lastName,
                                                user_gcash: gCash,
                                                user_emergency: emergency,
                                                user_image: FrontImageUrl,
                                                user_type: user,
                                                user_latitude: position?.coords?.latitude,
                                                user_longitude: position?.coords?.longitude,
                                                user_status: 'Offline',
                                                user_wallet: parseInt(controllerData?.rider_wallet),
                                                //user_device_token: '',
                                                user_rating: 5,
                                                user_date_registered: firestore.Timestamp.fromDate(new Date()),
                                                //debug
                                                //motor details
                                                /**/
                                                user_motor_plate_number: 'ABC123',
                                                user_motor_image_front: 'https://batangasracingcircuit.org/wp-content/uploads/2022/10/adjustable-windscreen.webp?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-1',//riderData?.user_motor_image_front
                                                user_motor_series: 'ADV 160',
                                                user_motor_brand: 'Honda',
                                                user_motor_color: 'Matte Black',
                                            })
                                            .then(() => {
                                                //setLoading(false);
                                                //navigation.navigate('UserTab');
                                            });
                                    }
                                    if (user === 'Passenger') {
                                        firestore()
                                            .collection('user')
                                            .doc(auth()?.currentUser?.uid)
                                            .set({
                                                user_account: '',
                                                user_id: auth()?.currentUser?.uid,
                                                user_name: `${firstName} ${lastName}`,
                                                user_name_first: firstName,
                                                user_name_last: lastName,
                                                user_gcash: gCash,
                                                user_emergency: emergency,
                                                user_image: FrontImageUrl,
                                                user_type: user,
                                                user_latitude: position?.coords?.latitude,
                                                user_longitude: position?.coords?.longitude,
                                                user_date_registered: firestore.Timestamp.fromDate(new Date()),
                                                user_coin: 0,
                                                //
                                                //user_merchant_account: 'Disable',
                                                //user_device_token: '',
                                            })
                                            .then(() => {
                                                setLoading(false);
                                                navigation.addListener('beforeRemove', (e) => {
                                                    navigation.dispatch(e.data.action)
                                                })
                                                navigation.replace('UserTab');
                                            });
                                    }
                                });
                            });
                        }, 5000);
                    }}>
                    Submit
                </Button>
            </View>
        </View>
    );
};