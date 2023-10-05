import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StatusBar, Animated, TouchableOpacity, BackHandler, StyleSheet, Text, ScrollView, Alert, Image, Linking, Platform, ToastAndroid } from 'react-native';
import FastImage from 'react-native-fast-image'
import { IconButton, Button } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import RiderStatus from './riderStatus';
import RiderIndicator from './riderIndicator';
import RiderDynamic from './riderDynamic';

import {
    local_user, user, local_activity
} from '../../../../global/localStorage';

import { useGlobalAlert } from '../../../../global/globalAlert';

export default function RiderHome({ navigation }) {

    const showAlert = useGlobalAlert();
    //animation
    const animatedValue = useRef(new Animated.Value(1)).current;

    function spring() {
        animatedValue.setValue(0)
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5
        }).start()
    }

    const mapRef = useRef(null);

    function getCurrentLocation() {
        setTimeout(() => {
            Geolocation.getCurrentPosition(position => {
                //console.log(position)
                mapRef.current?.animateCamera({
                    center: {
                        latitude: position?.coords?.latitude,
                        longitude: position?.coords?.longitude,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 1000,
                    zoom: 15,
                });
            });
        }, 200);
    }

    const getUser = user();

    const [userData, setUserData] = useState(getUser);

    useEffect(() => {
        const json = local_user.getString('local_user') // { 'username': 'Marc', 'age': 21 }
        if (json) {
            const object = JSON.parse(json)
            if (object?.user_account === "Rider-Pending" || object?.user_account === "Merchant-Pending" || object?.user_account === "Rider-Rejected") {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "UserProgress" }],
                });
            }
            setUserData(object)
            setStatusModal(true);
        }
        const listener = local_user.addOnValueChangedListener((changedKey) => {
            const newObject = local_user.getString(changedKey);
            const object = JSON.parse(newObject)
            if (object?.user_account === "Rider-Pending" || object?.user_account === "Merchant-Pending" || object?.user_account === "Rider-Rejected") {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "UserProgress" }],
                });
            }
            setUserData(object);
        })
        return () => {
            listener.remove()
        }
    }, []);

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        firestore()
            .collection('activity')
            .where('activity', '==', "Active")
            .onSnapshot(querySnapshot => {
                if (querySnapshot.size === 0) {
                    getCurrentLocation();
                    setActivityData([]);
                    return;
                }
                else {
                    querySnapshot.forEach(documentSnapshot => {
                        if (
                            documentSnapshot.data()?.activity_status === "Drop-off"
                            ||
                            documentSnapshot.data()?.activity_status === "Rider-Canceled"
                        ) {
                            setActivityData([]);
                            getCurrentLocation();
                            return;
                        }
                        else if (
                            documentSnapshot.data()?.activity_status === "Pending"
                            ||
                            documentSnapshot.data()?.activity_status === "Accepted"
                            ||
                            documentSnapshot.data()?.activity_status === "Arrived"
                            ||
                            documentSnapshot.data()?.activity_status === "Pick-up"
                            ||
                            documentSnapshot.data()?.activity_status === "Drop-off"
                            ||
                            documentSnapshot.data()?.activity_status === "Passenger-Canceled"
                        ) {
                            const list = [];
                            list.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                            setActivityData(list[0]);
                            const coords = [
                                { latitude: 14.681597, longitude: 121.6021868 },
                                { latitude: 14.7382, longitude: 121.6445 },
                            ];
                            mapRef?.current?.fitToCoordinates(coords, {
                                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                            });
                            //local_activity.set('local_activity', JSON.stringify(list));
                        }
                    });
                }
            });
    }, []);

    const [statusModal, setStatusModal] = useState(false);

    const [gcashModal, setGcashModal] = useState(false);

    function RenderAmount(props) {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        letterSpacing: 2,
                        marginHorizontal: 20
                    }}>
                        {props.title}
                    </Text>
                </View>
                <IconButton
                    icon="chevron-right"
                    iconColor='white'
                    size={30}
                    onPress={props.onPress}
                />
            </View>
        )
    }

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
                flex: 1
            }}>
                <MapView
                    //loadingEnabled
                    //loadingIndicatorColor='black'
                    ref={mapRef}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    zoomEnabled={true}>
                    {/*}
                    {activityData.length === 0
                        ?
                        null
                        :
                        <Marker coordinate={{
                            latitude: activityData?.passenger_latitude,
                            longitude: activityData?.passenger_longitude,
                        }}>
                            <IconButton
                                icon="human-greeting-variant"
                                iconColor='black'
                                onPress={() => console.log('Pressed')}
                            />
                        </Marker>
                    }
                    {activityData?.activity_merchant_lat === null
                        ||
                        activityData?.activity_merchant_lng == null
                        ?
                        null
                        :
                        <Marker coordinate={{
                            latitude: activityData?.activity_merchant_lat,
                            longitude: activityData?.activity_merchant_lng,
                        }}>
                            <FastImage
                                style={{
                                    height: 30,
                                    width: 30,
                                }}
                                source={require('../../../../images/merchant.png')}
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </Marker>
                    }
                */}
                    {activityData.length === 0
                        ? null :
                        <Marker coordinate={{
                            latitude: activityData?.passenger_latitude,//14.6816096,121.6021488,
                            longitude: activityData?.passenger_longitude,//121.6021488,14.6816096,
                        }}>
                            <FastImage
                                style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 100,
                                }}
                                source={{ uri: activityData?.passenger_image }}
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </Marker>
                    }
                </MapView>
                {activityData.length === 0
                    ?
                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        margin: 10
                    }}>
                        <IconButton
                            mode='outlined'
                            icon="crosshairs-gps"
                            iconColor='white'
                            containerColor='black'
                            size={40}
                            onPress={() => {
                                getCurrentLocation();
                            }}
                        />
                    </View>
                    :
                    null
                }
            </View>
            {activityData?.activity_status === "Pending"
                ||
                activityData?.activity_status === "Accepted"
                ||
                activityData?.activity_status === "Arrived"
                ||
                activityData?.activity_status === "Pick-up"
                ||
                activityData?.activity_status === "Drop-off"
                ||
                activityData?.activity_status === "Passenger-Canceled"
                ?
                <RiderStatus />
                :
                null
            }
             {/*INDICATOR*/}
             {activityData?.activity_status === "Pending"
                ||
                activityData?.activity_status === "Accepted"
                ||
                activityData?.activity_status === "Arrived"
                ||
                activityData?.activity_status === "Pick-up"
                ||
                activityData?.activity_status === "Drop-off"
                ||
                activityData?.activity_status === "Rider-Canceled"
                ?
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    marginTop: 30
                }}>
                    <RiderIndicator/>
                </View>
                :
                null
            }
            {activityData.length === 0
                ?
                <View style={{
                    position: 'absolute',
                    width: '100%',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        width: '90%',
                        elevation: 10
                    }}>
                         <TouchableOpacity style={{ marginLeft: 10 }}
                            onPress={async () => {
                                navigation.navigate("UserProfileNavigator")
                            }}>
                            <FastImage
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 100,
                                    borderWidth:2,
                                }}
                                source={{ uri: userData?.user_image }}
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            marginVertical: 10
                        }}>
                            <Text style={{
                                //fontWeight: 'bold',
                                color: "black",
                                letterSpacing: 2,
                            }}>
                                {userData?.user_wallet === 0
                                    ?
                                    "Out of Balance"
                                    :
                                    "Available Balance"
                                }
                            </Text>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: userData?.user_wallet === 0
                                    ?
                                    "red"
                                    :
                                    "black"
                                ,
                                letterSpacing: 2,
                            }}>
                                ₱ {userData?.user_wallet.toFixed(0)}
                                {/*{userData?.user_wallet.toFixed(2)}*/}
                            </Text>
                        </View>
                        <View>
                            <IconButton
                                icon="power"
                                mode='outlined'
                                size={30}
                                iconColor={
                                    userData?.user_status === "Online"
                                        ?
                                        'green'
                                        :
                                        "red"
                                }
                                style={{
                                    borderColor: userData?.user_status === "Online"
                                        ?
                                        'green'
                                        :
                                        "red",
                                    borderWidth: 4,
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                }}
                                onPress={() => {
                                    setStatusModal(true);
                                    spring();
                                    if (!userData?.user_account) {
                                        return
                                    }
                                    else {
                                        if (userData?.user_wallet === 0) {
                                        }
                                        else {
                                            //ToastAndroid.show(userData?.user_status === "Online" ? "Offline" : "Online", ToastAndroid.SHORT);
                                            firestore()
                                                .collection('user')
                                                .doc(auth().currentUser?.uid)
                                                .update({
                                                    user_status: userData?.user_status === "Online"
                                                        ?
                                                        'Offline'
                                                        :
                                                        "Online"
                                                    ,
                                                })
                                                .then(() => {
                                                    console.log('User updated!');
                                                });
                                        }
                                    }
                                }}
                            />
                        </View>
                        {/*}
                        <View>
                            {gcashModal === false
                                //gcash amount
                                ?
                                <TouchableOpacity style={{}}
                                    onPress={async () => {
                                        setGcashModal(true);
                                        //spring();
                                        //showAlert('This is a global alert message.');
                                        //navigation.navigate("RiderGCash")
                                    }}>
                                    <FastImage
                                        style={{
                                            width: 80,
                                            height: 80
                                        }}
                                        source={require("../../../../images/gcash.png")}
                                        priority={FastImage.priority.high}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </TouchableOpacity>
                                :
                                <IconButton
                                    style={{
                                        margin: 0,
                                    }}
                                    icon="close-circle-outline"
                                    iconColor='red'
                                    size={50}
                                    onPress={() => {
                                        setGcashModal(false)
                                    }}
                                />
                            }
                        </View>
                        */}
                    </View>
                    {/*}
                    {gcashModal === true
                        //gcash amount
                        ?
                        <Animated.View style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            width: '90%',
                            backgroundColor: '#015de6',
                            marginTop: 15,
                            borderRadius: 10,
                            elevation: 10,
                            transform: [{ scale: animatedValue }]
                        }}>
                            <Text style={{
                                fontSize: 20,
                                marginTop: 20,
                                color: 'white',
                                letterSpacing: 2,
                            }}>Select Amount</Text>
                            <RenderAmount
                                title="₱ 200"
                                onPress={() => {
                                    navigation.navigate("RiderGCash", {
                                        amount: '200'
                                    });
                                }}
                            />
                            <RenderAmount
                                title="₱ 500"
                                onPress={() => {
                                    navigation.navigate("RiderGCash", {
                                        amount: '500'
                                    });
                                }}
                            />
                            <RenderAmount
                                title="₱ 1000"
                                onPress={() => {
                                    navigation.navigate("RiderGCash", {
                                        amount: '1000'
                                    });
                                }}
                            />
                        </Animated.View>
                        :
                        null
                    }
                    */}
                    {statusModal === true
                        //current status
                        ?
                        <RiderDynamic
                            dynamicAnimatedValue={animatedValue}
                            dynamicBackground={
                                userData?.user_account
                                    ?
                                    userData?.user_wallet === 0
                                        ?
                                        '#015de6'
                                        :
                                        userData?.user_status === "Online"
                                            ?
                                            'green'
                                            :
                                            "salmon"
                                    :
                                    "black"
                            }
                            dynamicValue={
                                userData?.user_account
                                    ?
                                    userData?.user_wallet === 0
                                        ?
                                        "You're out of balance. To top up, please send your GCash receipt."
                                        :
                                        userData?.user_status === "Online"
                                            ?
                                            `Your current status is online, and you can receive Pasakay and Pabili requests!`
                                            :
                                            `Your current status is offline, and you cannot receive Pasakay and Pabili requests.`
                                    :
                                    "It looks like your account is not yet verified. Click the button to start verification."
                            }
                            dynamicIcon={
                                userData?.user_account
                                    ?
                                    userData?.user_wallet === 0
                                        ?
                                        "chevron-right"
                                        :
                                        userData?.user_status === "Online"
                                            ?
                                            "close-circle-outline"
                                            :
                                            "close-circle-outline"
                                    :
                                    "chevron-right"
                            }
                            dynamicOnPress={() => {
                                if (!userData?.user_account) {
                                    navigation.navigate("VerificationNavigator");
                                    setStatusModal(true);
                                }
                                else
                                {
                                    if (userData?.user_wallet === 0) {
                                        navigation.navigate("RiderGCash");
                                    }
                                    else {
                                        setStatusModal(false);
                                    }
                                }
                            }} />
                        :
                        null
                    }
                </View>
                :
                null
            }
        </View>
    );
};


