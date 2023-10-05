import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { IconButton, Button, TextInput } from "react-native-paper";

import FastImage from 'react-native-fast-image';

import { local_activity, local_user, user } from '../../../../global/localStorage';

import { useNavigation } from '@react-navigation/native';

export default function RiderIndicator(props) {

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

    const [rating, setRating] = useState('');

    const percentage = parseFloat(activityData?.activity_amount) * 20 / 100;

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
            <View style={{ flex: 1, margin: 15 }}>
                {percentage > userData?.user_wallet
                    ?
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 20,
                            fontWeight: 'bold',
                            letterSpacing: 2,
                            textAlign: 'center',
                            color: "red",
                        }}>
                            Out of Balance
                        </Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("RiderGCash");
                        }}>
                            <FastImage
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                                //source={{uri: item.imageUrl}}
                                source={require("../../../../images/gcash.png")}
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                    </View>
                    :
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
                            "You've got a new passenger!"
                            :
                            activityData?.activity_status === "Accepted"
                                ?
                                activityData?.activity_service === "Pasakay"
                                    ?
                                    "Büddy, head to the pick-up location."
                                    :
                                    `Büddy, head to ${activityData?.activity_pickUp}.`
                                :
                                activityData?.activity_status === "Arrived"
                                    ?
                                    activityData?.activity_service === "Pasakay"
                                        ?
                                        "Büddy, you've arrived at the passenger's pick-up location."
                                        :
                                        `Büddy, you've arrived at ${activityData?.activity_pickUp}.`
                                    :
                                    activityData?.activity_service === "Pasakay"
                                        ?
                                        "Büddy, head to the drop-off location."
                                        :
                                        `Büddy, head to the drop-off location.`
                        }
                    </Text>
                }
            </View>
        </Animated.View>
    )
}