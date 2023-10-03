import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ActivityIndicator, Animated } from 'react-native';
import { IconButton, Button, TextInput } from "react-native-paper";
import FastImage from 'react-native-fast-image';

import { local_activity } from '../../../../../global/localStorage';

import { useNavigation } from '@react-navigation/native';

export default function PassengerIndicator(props) {


    //animation
    const scaleValue = useRef(new Animated.Value(0.6)).current;
    //const endValue = 1.5;

    useEffect(() => {
        Animated.loop(
            Animated.spring(scaleValue, {
                toValue: 0.9,
                useNativeDriver: true,
                friction: 0.9,
                tension: 1,
            }),
        ).start();
    }, [scaleValue]);

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
        /*INDICATOR*/
        <Animated.View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            width: '90%',
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            elevation: 10,
            transform: [{ scale: scaleValue }]
        }}>
            <View style={{ margin: 15 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    textAlign: 'center',
                    color: activityData?.activity_status === "Rider-Canceled"
                        ?
                        "red"
                        :
                        "black"
                    ,
                }}>
                    {activityData?.activity_status === "Pending"
                        ?
                        "Please wait for the rider to accept"
                        :
                        activityData?.activity_status === "Accepted"
                            ?
                            activityData?.activity_service === "Pasakay"
                                ?
                                "A Büddy Rider is on the way!"
                                :
                                `Your rider is on the way to ${activityData?.activity_pickUp}.`
                            :
                            activityData?.activity_status === "Arrived"
                                ?
                                activityData?.activity_service === "Pasakay"
                                    ?
                                    "Your rider has arrived at your pickup location."
                                    :
                                    `Your rider has arrived at ${activityData?.activity_pickUp}.`
                                :
                                activityData?.activity_status === "Pick-up"
                                    ?

                                    activityData?.activity_service === "Pasakay"
                                        ?
                                        "On the way to your drop-off location."
                                        :
                                        `Your rider is on the way to your drop-off location.`
                                    :
                                    activityData?.activity_status === "Drop-off"
                                        ?
                                        `Your ${activityData?.activity_service} has been completed. Please submit a review.`
                                        :
                                        `Your ${activityData?.activity_service} has been canceled. Please make a new request.`
                    }
                </Text>
            </View>
        </Animated.View>
    )
}