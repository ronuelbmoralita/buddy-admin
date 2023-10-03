import React, { useState, useEffect } from 'react';
import { Image, Text, View, Alert, Linking, Platform } from 'react-native';
import { IconButton, Button, Divider } from 'react-native-paper';

import FastImage from 'react-native-fast-image';

import { Rating } from 'react-native-ratings';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { local_activity } from '../../../../../global/localStorage';

//

import SendNotification from '../../../../../global/sendNotification';

import { useNavigation } from '@react-navigation/native';

export default function PassengerStatus(props) {

    const navigation = useNavigation();

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

    const [rating, setRating] = useState('');

    return (
        <View style={{ gap: 20 }}>
            {activityData?.activity_status !== "Rider-Canceled"
                ?
                <View style={{ gap: 20 }}>
                    {/*INDICATOR*/}
                    {activityData.activity_status === "Drop-off"
                        ?
                        null
                        :
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                            width: '90%',
                            marginTop: 10,
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
                                        require('../../../../../images/pasakay.png')
                                        :
                                        require('../../../../../images/pabili.png')
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
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    letterSpacing: 2,
                                }}>
                                    ₱ {activityData?.activity_amount}
                                </Text>
                            </View>
                        </View>
                    }
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
                            source={{ uri: activityData?.rider_image }}
                            priority={FastImage.priority.low}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{
                            flex: 1,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}>
                            {activityData?.rider_name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon="phone"
                                iconColor='white'
                                mode='contained'
                                containerColor='black'
                                size={30}
                                onPress={() => {
                                    Linking.openURL(`tel:${activityData?.rider_gcash}`)
                                }} />
                            <IconButton
                                icon="message"
                                iconColor='white'
                                mode='contained'
                                containerColor='black'
                                size={30}
                                onPress={() => {
                                    Linking.openURL(`sms:${activityData?.rider_gcash}?body=${``}`)
                                }} />
                        </View>
                    </View>
                    {activityData?.activity_status !== "Drop-off"
                        ?
                        //MOTORCYCLE
                        <View style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '100%',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '90%',
                                borderRadius: 10,
                                elevation: 10,
                            }}>
                                <FastImage
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 20,
                                        margin: 20,
                                    }}
                                    source={{ uri: activityData?.rider_motor_image }}
                                    priority={FastImage.priority.low}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: 'black',
                                            letterSpacing: 2,
                                        }}>
                                            {activityData?.rider_motor_brand} {activityData?.rider_motor_series}
                                        </Text>
                                        <Text style={{
                                            color: 'black',
                                            letterSpacing: 2,
                                        }}>
                                            {activityData?.rider_motor_color}
                                        </Text>
                                        <Text style={{
                                            //fontWeight: 'bold',
                                            color: 'black',
                                            letterSpacing: 2,
                                        }}>
                                            {activityData?.rider_plate_number}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        //RATING
                        <View style={{
                            elevation: 10,
                            backgroundColor: 'white',
                            width: '90%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                            borderRadius: 10,
                            gap: 10,
                        }}>
                            <FastImage
                                style={{
                                    height: 150,
                                    width: 150,
                                }}
                                source={require('../../../../../images/thank-you.png')}
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    letterSpacing: 2,
                                }}>
                                    How was your {activityData?.activity_service}?
                                </Text>
                            </View>
                            <Rating
                                startingValue={0}
                                ratingColor='black'
                                ratingCount={5}
                                imageSize={40}
                                //showRating
                                onFinishRating={text => {
                                    setRating(text)
                                }} />
                            <View style={{ height: 1, width: '100%', borderWidth: 1, borderColor: 'gray', borderStyle: 'dashed' }} />
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{
                                    //fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: 'black',
                                    letterSpacing: 2,
                                }}>
                                    Your rating will help improve our services.
                                </Text>
                            </View>
                        </View>
                    }
                </View>
                :
                //CANCELED
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
                        source={require('../../../../../images/cancel.png')}
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
                        fontSize:20,
                        letterSpacing: 2,
                        textAlign: 'center',
                        color: 'gray',
                    }}>
                        Please book again.
                    </Text>
                </View>
            }
            {/*BUTTON*/}
            <View style={{
                marginBottom: 20,
                width: '90%',
                alignSelf: 'center'
            }}>
                {activityData?.activity_status === "Pending"
                    ||
                    activityData?.activity_status === "Drop-off"
                    ||
                    activityData?.activity_status === "Rider-Canceled"
                    ?
                    <Button
                        mode="contained"
                        buttonColor={
                            activityData?.activity_status === "Pending"
                                ?
                                'salmon'
                                :
                                'black'
                        }
                        style={{
                            borderRadius: 100
                        }}
                        contentStyle={{
                            padding: 10,
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        onPress={async () => {
                            if (activityData?.activity_status === "Pending") {
                                Alert.alert(`Cancel`, `Are you sure you want to cancel your ${activityData?.activity_service}?`, [
                                    {
                                        text: 'No',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes', onPress: () => {
                                            //passenger-canceled
                                            let notificationData = {
                                                mode: `notification`,
                                                image: activityData?.passenger_image,
                                                title: `${activityData?.passenger_name}`,
                                                body: `Canceled ${activityData?.activity_service}`,
                                                token: activityData?.rider_token,
                                            };
                                            SendNotification.sendSingleDeviceNotification(notificationData);
                                            //passenger-canceled
                                            firestore()
                                                .collection('activity')
                                                .doc(activityData?.key)
                                                .update({
                                                    activity_status: "Passenger-Canceled",
                                                    //activity: 'Inactive',
                                                })
                                                .then(() => {
                                                    console.log('User updated!');
                                                });
                                        }
                                    },
                                ])
                            }
                            if (activityData?.activity_status === "Drop-off") {
                                //completed
                                firestore()
                                    .collection('user')
                                    .doc(activityData?.rider_id)
                                    .update({
                                        user_rating: rating,
                                    })
                                    .then(() => {
                                        firestore()
                                            .collection('activity')
                                            .doc(activityData?.key)
                                            .update({
                                                activity_status: "Completed",
                                                activity: 'Inactive',
                                            })
                                            .then(async () => {
                                                console.log('User updated!');
                                                let notificationData = {
                                                    mode: `notification`,
                                                    image: activityData?.passenger_image,
                                                    title: `${activityData?.passenger_name}`,
                                                    body: `Thank you sa ${activityData?.activity_service}.`,
                                                    token: activityData?.rider_token,
                                                };
                                                await SendNotification.sendSingleDeviceNotification(notificationData);
                                            })
                                    })
                            }
                            if (activityData?.activity_status === "Rider-Canceled") {
                                //canceled
                                firestore()
                                    .collection('activity')
                                    .doc(activityData?.key)
                                    .delete()
                                    .then(() => {
                                        console.log('User deleted!');
                                    });
                            }
                        }}>
                        {activityData?.activity_status === "Pending"
                            ?
                            `Cancel ${activityData?.activity_service}`
                            :
                            activityData?.activity_status === "Drop-off"
                                ?
                                rating
                                    ?
                                    "Submit Review"
                                    :
                                    "Skip Review"
                                :
                                "Okay"
                        }
                    </Button>
                    :
                    null
                }
            </View>
        </View>
    )
}