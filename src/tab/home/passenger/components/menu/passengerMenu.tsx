import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StatusBar, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import FastImage from 'react-native-fast-image'
import { Badge, IconButton, Button } from 'react-native-paper';

//flatlist
import Promote from './promote/promote';
import FlatlistBanner from './banner/flatlistBanner';
import FlatlistMerchant from './merchant/flatlistMerchant';

import { local_user, user, local_activity } from '../../../../../global/localStorage';

import { useGlobalAlert } from '../../../../../global/globalAlert';

import { ShareDialog } from 'react-native-fbsdk-next';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function PassengerMenu({ navigation }) {

    const showAlert = useGlobalAlert();

    const [userData, setUserData] = useState([]);

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

    //activity data
    const [activityData, setActivityData] = useState([]);
    useEffect(() => {
        const json = local_activity.getString('local_activity') // { 'username': 'Marc', 'age': 21 }
        if (json) {
            const object = JSON.parse(json)
            //console.log("ooooooooooooooooooooooo", object);
            setActivityData(object[0])
        }
        else {
            return;
        }
        const listener = local_activity.addOnValueChangedListener((changedKey) => {
            const newObject = local_activity.getString(changedKey)
            const object = JSON.parse(newObject)
            //console.log("ooooooooooooooooooooooo", object);
            setActivityData(object[0])
        })
        return () => {
            listener.remove()
        }
    }, [])


    function RenderService(props) {
        return (
            <TouchableOpacity style={{
                flex: 1,
                alignItems: 'center',
            }}
                onPress={props.onPress}>
                {props.hide === false
                    ?
                    null
                    :
                    <Badge style={{
                        backgroundColor: 'red',
                        position: 'absolute',
                        zIndex: 1,
                    }}>{props.badgeTitle}</Badge>
                }
                {props.hideIcon === false
                    ?
                    null
                    :
                    <IconButton
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            right: 0,
                            zIndex: 1,
                        }}
                        icon="progress-check"
                        iconColor='black'
                        size={20}
                        onPress={() => console.log('Pressed')}
                    />
                }
                <View style={{
                    borderRadius: 100,
                    borderWidth: 2,
                }}>
                    <FastImage
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        source={props.source}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                }}>{props.title}</Text>
            </TouchableOpacity>
        )
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const photoUri = 'file://' + '/storage/emulated/0/Android/data/com.buddy/files/Download/buddyImageAd.png'

    const shareLinkContent = {
        //contentType: 'link',
        //contentUrl: 'https://www.facebook.com/buddyAppCommunity', // Replace with the URL you want to share
        contentType: 'photo',
        photos: [{ imageUrl: photoUri }],
        caption: "Hello"
    };

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
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: StatusBar.currentHeight,
                width: '90%',
                alignSelf: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom:10,
                    gap: 10,
                }}>
                    <FastImage
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        source={require("../../../../../images/buddy.png")}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{
                        fontSize: 25,
                        fontFamily: 'onest_bold',
                        letterSpacing: 2,
                        color: 'black'
                    }}>Büddy</Text>
                    <IconButton
                        mode='contained-tonal'
                        icon="share"
                        iconColor='#FED141'
                        containerColor='#0032A0'
                        size={25}
                        onPress={async () => {
                            function formatDateToYYYYMMDD(date) {
                                const year = date.getFullYear();
                                const month = String(date.getMonth()).padStart(2, '0'); // Months are zero-based
                                const day = String(date.getDate()).padStart(2, '0');
                                return `${year}-${month}-${day}`;
                            }

                            // Example usage:
                            const today = new Date();

                            const exp = new Date(today);
                            exp.setMonth(today.getMonth() + 1);


                            var todayDate = new Date().toISOString().slice(0, 10);

                            if (userData?.user_coin_expire !== todayDate) {
                                const canShow = await ShareDialog.canShow(shareLinkContent);

                                if (canShow) {
                                    const result = await ShareDialog.show(shareLinkContent);

                                    if (result.isCancelled) {
                                        console.log('Share cancelled');
                                    } else {
                                        firestore()
                                            .collection('user')
                                            .doc(auth().currentUser?.uid)
                                            .update(
                                                {
                                                    user_coin: parseInt(userData?.user_coin) + 1,
                                                    user_coin_expire: formatDateToYYYYMMDD(exp),
                                                }
                                            )
                                            .then(() => {
                                                //setLoading(false);
                                            });
                                    }
                                } else {
                                    console.log('Cannot show share dialog');
                                }
                            }
                            else {
                                Alert.alert("Free Coin", "You already claim your 1 Piso coin, Please comeback tomorrow.")
                            }
                        }}
                    />
                </View>
                {/*}
                <View style={{
                }}>
                    <Text style={{
                        color: 'black',
                        fontSize: 50,
                        fontWeight: 'bold',
                        letterSpacing: 2,
                    }}>₱ {userData?.user_coin
                        ?
                        userData?.user_coin.toFixed(2)
                        :
                        '1000.00'
                        }</Text>
                </View>
                */}
            </View>
            {activityData?.activity === "Inactive" || activityData.length === 0
                ?
                //Services
                <View style={{
                    width: '90%',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginBottom: 20,
                    alignSelf: 'center',
                    elevation: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 10,
                    }}>
                        <RenderService
                            title="Pasakay"
                            source={require("../../../../../images/pasakay.png")}
                            hide={false}
                            hideIcon={false}
                            onPress={() => {
                                navigation.navigate('PassengerHome', {
                                    service: 'Pasakay',
                                });
                            }} />
                        <RenderService
                            title="Pabili"
                            source={require("../../../../../images/pabili.png")}
                            hide={false}
                            hideIcon={false}
                            onPress={() => {
                                navigation.navigate('PassengerHome', {
                                    service: 'Pabili',
                                });
                            }} />
                    </View>
                </View>
                :
                activityData?.activity === "Active"
                    ?
                    //ACTIVE
                    <View style={{
                        width: '90%',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        marginBottom: 20,
                        alignSelf: 'center',
                        alignItems: 'center',
                        elevation: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 10,
                            width: '95%',
                            gap: 10,
                        }}>
                            <FastImage
                                style={{
                                    width: 40,
                                    height: 40,
                                    margin: 5,
                                    borderWidth: 2,
                                    borderRadius: 100,
                                }}
                                source=
                                {
                                    activityData?.activity_service === "Pasakay"
                                        ?
                                        require("../../../../../images/pasakay.png")
                                        :
                                        require("../../../../../images/pabili.png")
                                }
                                priority={FastImage.priority.high}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    letterSpacing: 2,
                                    color: activityData?.activity_status === "Rider-Canceled"
                                        ?
                                        "red"
                                        :
                                        "green"
                                    ,
                                }}>
                                    {activityData?.activity_status === "Pending"
                                        ?
                                        "Please wait for the rider to accept."
                                        :
                                        activityData?.activity_status === "Accepted"
                                            ?
                                            activityData?.activity_service === "Pasakay"
                                                ?
                                                "Your rider is on the way."
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
                            <IconButton
                                icon="chevron-right-circle"
                                iconColor='black'
                                size={30}
                                onPress={() => {
                                    {
                                        activityData?.activity_service === "Pasakay"
                                            ?
                                            navigation.navigate('PassengerHome', {
                                                service: 'Pasakay',
                                            })
                                            :
                                            navigation.navigate('PassengerHome', {
                                                service: 'Pabili',
                                            });
                                    }
                                }}
                            />
                        </View>
                    </View>
                    :
                    <ActivityIndicator size="small" color="black" />
            }
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        //Alert.alert("Bottom")
                    }
                }}>
                <Promote
                    riderPress={() => {
                        navigation.navigate('VerificationNavigator');
                    }}
                    merchantPress={() => {
                        if (userData?.user_account === "Merchant-Verified") {
                            Alert.alert("Verified Account", "Your account is already verified. Stay tuned for exciting updates coming soon for Buddy Merchants.")
                        }
                        else {
                            navigation.navigate('MerchantNavigator');
                        }
                    }}
                />
                <FlatlistMerchant />
                {/*<FlatlistBanner />*/}
            </ScrollView>
        </View >
    );
};
