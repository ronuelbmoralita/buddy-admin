import React, { useState, useEffect, useRef } from 'react';
import { Alert, Text, View, Linking, Platform } from 'react-native';
import { IconButton, Button, Divider, TextInput } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { getPreciseDistance } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import {
    local_activity, local_user, user
} from '../../../../global/localStorage';

import SendNotification from '../../../../global/sendNotification';

import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function RiderStatus(props) {

    const navigation = useNavigation();

    const [amount, setAmount] = useState('');

    //local user

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

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const json = local_activity.getString('local_activity') // { 'username': 'Marc', 'age': 21 }
        if (json) {
            const object = JSON.parse(json)
            setActivityData(object[0])
        }
        else {
            return;
        }
        const listener = local_activity.addOnValueChangedListener((changedKey) => {
            const newObject = local_activity.getString(changedKey)
            const object = JSON.parse(newObject)
            setActivityData(object[0])
        })
        return () => {
            listener.remove()
        }
    }, [])

    const watchId = useRef<number | null>(null);

    function sendLocation() {
        if (activityData?.activity_status === "Pending"
        )
            watchId.current = Geolocation.watchPosition(
                position => {
                    let notificationData = {
                        mode: `coordinate`,
                        //title: `Büddy`,
                        //body: `This is Büddy`,
                        latitude: `${position.coords.latitude}`,
                        longitude: `${position.coords.longitude}`,
                        token: activityData?.passenger_token,
                    };
                    SendNotification.sendSingleDeviceNotification(notificationData);
                },
                error => {
                    console.log(error);
                },
                {
                    accuracy: {
                        android: 'high',
                        ios: 'best',
                    },
                    enableHighAccuracy: true,
                    distanceFilter: 0,
                    interval: 5000,
                    fastestInterval: 2000,
                    forceRequestLocation: true,
                    forceLocationManager: true,
                    showLocationDialog: true,
                    useSignificantChanges: true,
                },
            );
        else {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
            if (watchId.current !== null) {
                Geolocation.clearWatch(watchId.current);
                watchId.current = null;
            }
        }
    }

    const percentage = parseFloat(activityData?.activity_amount) * 20 / 100;

    return (
        <View style={{ backgroundColor: 'white', gap: 20 }}>
            {activityData?.activity_status !== "Passenger-Canceled"
                ?
                <View style={{ gap: 20 }}>
                    {/*INDICATOR*/}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: '90%',
                        gap: 10,
                        marginTop: 20,
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <FastImage
                                style={{
                                    height: 50,
                                    width: 50,
                                }}
                                source={activityData?.activity_service === "Pasakay"
                                    ?
                                    require('../../../../images/pasakay.png')
                                    :
                                    require('../../../../images/pabili.png')
                                }
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            gap: 20
                        }}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: 'black',
                                letterSpacing: 2,
                            }}>
                                ₱ {activityData?.activity_amount}
                            </Text>
                        </View>
                    </View>
                    <Divider style={{
                        marginHorizontal: 20,
                    }} />
                    {/*DRIVER*/}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: '90%',
                        gap: 10,
                    }}>
                        <FastImage
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                            }}
                            source={{ uri: activityData?.passenger_image, }}
                            priority={FastImage.priority.low}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{
                            flex: 1,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}>
                            {`${activityData?.passenger_name}`}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon="phone"
                                iconColor='white'
                                mode='contained'
                                containerColor='black'
                                size={30}
                                onPress={() => {
                                    Linking.openURL(`tel:${activityData?.passenger_gcash}`)
                                }} />
                            <IconButton
                                icon="message"
                                iconColor='white'
                                mode='contained'
                                containerColor='black'
                                size={30}
                                onPress={() => {
                                    Linking.openURL(`sms:${activityData?.passenger_gcash}?body=${"Pogi ko"}`)
                                }} />
                        </View>
                    </View>
                    {/*LOCATION*/}
                    <View style={{
                        marginHorizontal: 20,
                        //backgroundColor:'red'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 20,
                            alignItems: 'center',
                        }}>
                            <IconButton
                                style={{
                                    padding: 0,
                                    margin: -10,
                                }}
                                icon="crosshairs-gps"
                                iconColor='black'
                                size={30}
                            //onPress={() => console.log('Pressed')}
                            />
                            <Text style={{
                                flex: 1,
                                color: 'black',
                                letterSpacing: 2,
                            }}>
                                {activityData?.activity_pickUp}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    height: 30,
                                    width: 1,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderStyle: 'dashed',
                                    marginVertical: 5,
                                }} />
                            </View>
                            <View style={{ flex: 11, backgroundColor: 'red' }}>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 20,
                            alignItems: 'center',
                        }}>
                            <IconButton
                                style={{
                                    padding: 0,
                                    margin: -10,
                                }}
                                icon="map-marker"
                                iconColor='red'
                                size={30}
                            //onPress={() => console.log('Pressed')}
                            />
                            <Text style={{
                                flex: 1,
                                color: 'black',
                                letterSpacing: 2,
                            }}>
                                {activityData?.activity_dropOff}
                            </Text>
                        </View>
                    </View>
                </View>
                :
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FastImage
                        style={{
                            width: 250,
                            height: 250,
                            borderRadius: 100,
                        }}
                        source={require('../../../../images/cancel.png')}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: 'black',
                    }}>
                        {activityData?.activity_service} is canceled
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: 'gray',
                    }}>
                        Please wait for another request.
                    </Text>
                </View>
            }
            {/*BUTTON*/}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '90%',
                gap: 20,
                marginBottom: 20,
            }}>
                <Button
                    mode="contained"
                    buttonColor='black'
                    style={{
                        flex: 1,
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    disabled={percentage > userData?.user_wallet
                        ?
                        true
                        :
                        false
                        }
                    onPress={() => {
                        activityData?.activity_status === "Passenger-Canceled"
                            ?
                            //canceled
                            firestore()
                                .collection('activity')
                                .doc(activityData?.key)
                                .delete()
                                .then(() => {
                                    firestore()
                                        .collection('user')
                                        .doc(auth().currentUser?.uid)
                                        .update({
                                            user_status: "Online",
                                        })
                                        .then(() => {
                                            console.log('User updated!');
                                        });
                                })
                            :
                            //accept
                            Alert.alert(
                                activityData?.activity_status === "Pending"
                                    ?
                                    `Accept`
                                    :
                                    activityData?.activity_status === "Accepted"
                                        ?
                                        `Arrived`
                                        :
                                        activityData?.activity_status === "Arrived"
                                            ?
                                            `Pick-up`
                                            :
                                            `Drop-off`,
                                activityData?.activity_status === "Pending"
                                    ?
                                    `Accept ${activityData?.activity_service}?`
                                    :
                                    activityData?.activity_status === "Accepted"
                                        ?
                                        `Have you arrived at the passenger pick-up location?`
                                        :
                                        activityData?.activity_status === "Arrived"
                                            ?
                                            `Have you picked up the passenger?`
                                            :
                                            `Is the passenger's journey complete?`, [
                                {
                                    text: 'No',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes', onPress: () => {
                                        Geolocation.getCurrentPosition(
                                            position => {
                                                //send notification
                                                let notificationData = {
                                                    mode: `notification`,
                                                    image: activityData?.rider_image,
                                                    title: `${activityData?.rider_name}`,
                                                    body:
                                                        activityData?.activity_status === "Pending"
                                                            ?
                                                            `Accepted your ${activityData?.activity_service}.`
                                                            :
                                                            activityData?.activity_status === "Accepted"
                                                                ?
                                                                `Arrived at your pick-up location.`
                                                                :
                                                                activityData?.activity_status === "Arrived"
                                                                    ?
                                                                    `Pick-up your ${activityData?.activity_service}.`
                                                                    :
                                                                    activityData?.activity_status === "Pick-up"
                                                                        ?
                                                                        `Drop-off your ${activityData?.activity_service}.`
                                                                        :
                                                                        `Thank you for using Büddy ${activityData?.activity_service}.`
                                                    ,
                                                    latitude: position.coords?.latitude,
                                                    longitude: position.coords?.longitude,
                                                    token: activityData?.passenger_token,
                                                };
                                                SendNotification.sendSingleDeviceNotification(notificationData);

                                                sendLocation();

                                                //update firestore
                                                const lat = JSON.stringify(activityData?.passenger_latitude);
                                                const lng = JSON.stringify(activityData?.passenger_longitude);

                                                var pdis = getPreciseDistance(
                                                    { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude },
                                                    //{ latitude: documentSnapshot.data().user_latitude, longitude: documentSnapshot.data().user_longitude },
                                                    //{ latitude: lat, longitude: lng },
                                                    { latitude: 14.7382, longitude: 121.6445 },
                                                );

                                                const getDistance = pdis / 1000;
                                                const getTime = getDistance / 30;
                                                const getMinutes = getTime * 60;

                                                const totalDistance = getDistance.toFixed(1);
                                                const totalTime = getMinutes.toFixed(1);

                                                const amount = 10 + parseInt(totalTime) + parseInt(totalDistance);

                                                const totalAmount = amount.toFixed(2);

                                                setAmount(amount.toFixed(2))
                                                firestore()
                                                    .collection('activity')
                                                    .doc(activityData?.key)
                                                    .update(
                                                        activityData?.activity_status === "Pending"
                                                            ?
                                                            { activity_status: "Accepted" }
                                                            :
                                                            activityData?.activity_status === "Accepted"
                                                                ?
                                                                { activity_status: "Arrived" }
                                                                :
                                                                activityData?.activity_status === "Arrived"
                                                                    ?
                                                                    { activity_status: "Pick-up" }
                                                                    :
                                                                    activityData?.activity_status === "Pick-up"
                                                                        ?
                                                                        {
                                                                            activity_status: "Drop-off",
                                                                            //activity_amount: totalAmount,
                                                                        }
                                                                        :
                                                                        { activity_status: "Cancel", }
                                                    )
                                                    .then(() => {
                                                        if (activityData?.activity_status === "Pick-up") {
                                                            firestore()
                                                                .collection('user')
                                                                .doc(auth().currentUser?.uid)
                                                                .update({
                                                                    user_wallet: parseInt(userData?.user_wallet) - percentage,//Büddy profit
                                                                    user_status: "Online",
                                                                })
                                                                .then(async () => {

                                                                })
                                                        }
                                                    })
                                            })
                                    }
                                },
                            ])
                    }}>
                    {activityData?.activity_status === "Pending"
                        ?
                        'Accept'
                        :
                        activityData?.activity_status === "Accepted"
                            ?
                            "Arrive"
                            :
                            activityData?.activity_status === "Arrived"
                                ?
                                "Pick-up"
                                :
                                activityData?.activity_status === "Pick-up"
                                    ?
                                    "Drop-off"
                                    :
                                    "Okay"
                    }
                </Button>
                {activityData?.activity_status === "Pending"
                    ||
                    activityData?.activity_status === "Accepted"
                    ?
                    <Button
                        mode="contained"
                        buttonColor='salmon'
                        style={{
                            flex: 1,
                            borderRadius: 100
                        }}
                        contentStyle={{
                            padding: 10,
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        onPress={async () => {
                            //driver canceled
                            if (activityData?.activity_status === "Accepted") {
                                Geolocation.clearWatch(watchId.current);
                                watchId.current = null;
                                if (watchId.current !== null) {
                                    Geolocation.clearWatch(watchId.current);
                                    watchId.current = null;
                                }
                            }
                            //
                            let notificationData = {
                                mode: `notification`,
                                image: activityData?.rider_image,
                                title: `${activityData?.rider_name}`,
                                body: `Canceled your ${activityData?.activity_service}`,
                                token: activityData?.passenger_token,
                            };
                            SendNotification.sendSingleDeviceNotification(notificationData);
                            //
                            Alert.alert(`Cancel`, `Are you sure you want to cancel your ${activityData?.activity_service}?`, [
                                {
                                    text: 'No',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes', onPress: () => {
                                        firestore()
                                            .collection('activity')
                                            .doc(activityData?.key)
                                            .update({
                                                activity_status: "Rider-Canceled",
                                                //activity: 'Inactive',
                                            })
                                            .then(() => {
                                                return;
                                            });
                                        firestore()
                                            .collection('user')
                                            .doc(auth().currentUser?.uid)
                                            .update({
                                                user_status: "Online",
                                            })
                                            .then(() => {
                                                console.log('User updated!');
                                            });
                                    }
                                },
                            ])
                        }}>
                        Cancel
                    </Button>
                    :
                    null
                }
            </View>
        </View>
    )
}