import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { View, Animated, Image, Alert, ScrollView, Text, Linking } from 'react-native';
import FastImage from 'react-native-fast-image'
import { IconButton, Chip, TextInput } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getPreciseDistance } from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import { Barangay } from './philippines/barangay';
import { Municipality } from './philippines/municipality';

import SendNotification from '../../../../../global/sendNotification';

//components
import DropdownPasakay from './dropdownPasakay';
import DropdownPabili from './dropdownPabili';
import PassengerBooking from './passengerBooking';
import PassengerRider from './passengerRider';
import PassengerIndicator from './passengerIndicator';
import PassengerStatus from './passengerStatus';

import {
    local_user,
    user,
    local_activity,
    controller
} from '../../../../../global/localStorage';

import messaging from '@react-native-firebase/messaging';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function PassengerHome({ navigation, route }) {

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

    const { service } = route.params;

    useEffect(() => {
        /**/
        firestore()
            .collection('activity')
            .where('activity', '==', "Active")
            .onSnapshot(querySnapshot => {
                if (querySnapshot.size === 0) {
                    setActivityData([]);
                    getCurrentLocation();
                }
                else {

                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data()?.activity_status !== "Accepted") {
                            setCoordinate([]);
                        }
                        if (
                            documentSnapshot.data()?.activity_status === "Passenger-Canceled"
                        ) {
                            setActivityData([]);
                            getCurrentLocation();
                            return;
                        }
                        else {
                            const list = [];
                            list.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                            setActivityData(list[0]);
                            const coords = [
                                {
                                    latitude: documentSnapshot.data()?.passenger_latitude,
                                    longitude: documentSnapshot.data()?.passenger_longitude
                                },
                                {
                                    latitude: 14.7382,
                                    longitude: 121.6445,
                                },
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

    const controllerData = controller();

    const mapRef = useRef(null);

    function getCurrentLocation() {
        setTimeout(() => {
            Geolocation.getCurrentPosition(position => {
                //console.log(position)
                //setCurrentLocation(position);
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

    //dropdown
    const [getMunicipality, setGetMunicipality] = useState(null);
    const [getBarangay, setGetBarangay] = useState(null);
    const [getMerchant, setGetMerchant] = useState(null);

    const filteredBrgy = Barangay.filter(function (item) {
        return item?.municipality == getMunicipality;
    });

    //get rider

    const [riderData, setRiderData] = useState([]);
    const [note, setNote] = React.useState("");

    const [riderStatus, setRiderStatus] = useState('');

    function getRider() {
        setRiderStatus('search');
        setTimeout(() => {
            firestore()
                .collection('user')
                .where('user_account', '==', "Rider-Verified")
                .where('user_type', '==', "Rider")
                .where('user_status', '==', "Online")
                .limit(10)
                .get()
                .then(querySnapshot => {
                    //console.log('Total users: ', querySnapshot.size);
                    if (querySnapshot.size === 0) {
                        setRiderStatus('fail')
                    }
                    else {
                        const list = [];
                        querySnapshot.forEach(documentSnapshot => {
                            Geolocation.getCurrentPosition(
                                position => {
                                    var pdis = getPreciseDistance(
                                        { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude },
                                        { latitude: documentSnapshot.data().user_latitude, longitude: documentSnapshot.data().user_longitude },
                                        //{ latitude: 14.7382, longitude: 121.6445 },
                                    );
                                    const getDistance = pdis / 1000;
                                    const getTime = getDistance / 30;
                                    const getMinutes = getTime * 60;

                                    const totalDistance = getDistance.toFixed(1);
                                    const totalTime = getMinutes.toFixed(0);

                                    list.push({
                                        ...documentSnapshot.data(),
                                        key: documentSnapshot.id,
                                        distance: totalDistance,
                                        time: totalTime,
                                    });

                                    //distance algorithm
                                    list.sort((a, b) => a.distance - b.distance);
                                    setRiderData(list[0]);
                                    console.log(list, "++++++++++++++++++++++++++++")
                                    setRiderStatus('success')
                                });
                        });
                    }
                });
        }, 1000);
    }

    useEffect(() => {
        //getRider();
    }, [])

    //listen to rider location

    const [coordinate, setCoordinate] = useState([]);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('remoteMessage', JSON.stringify(remoteMessage));
            const coordinate = {
                lat: remoteMessage.data?.latitude,
                lng: remoteMessage.data?.longitude,
            }
            if (remoteMessage.data?.mode === "coordinate") {
                setCoordinate(coordinate);
            }
            else {
                return;
            }
        });
        return unsubscribe;
    }, []);

    const [fare, setFare] = useState(0);
    const [disablePromo, setDisablePromo] = useState(false);


    const [coinEnable, setCoinEnable] = React.useState(false);
    const [coin, setCoin] = React.useState('');


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    zoomEnabled={true}>
                    {coordinate.length === 0
                        ? null :
                        <Marker coordinate={{
                            latitude: parseFloat(coordinate?.lat),//14.6816096,121.6021488,
                            longitude: parseFloat(coordinate?.lng),//121.6021488,14.6816096,
                        }}>
                            <FastImage
                                style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 100,
                                }}
                                source={{ uri: activityData?.rider_image }}
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
            {/*DROPDOWN*/}
            {activityData.length === 0
                ?
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    marginTop: 40
                }}>
                    {service === "Pasakay"
                        ?
                        <DropdownPasakay
                            brgyOnFocus={() => {
                                setGetBarangay(null);
                                setRiderStatus('');
                            }}
                            brgyData={filteredBrgy}
                            brgyValue={getBarangay}
                            brgyOnChange={item => {
                                spring();
                                setGetBarangay(item);
                                Geolocation.getCurrentPosition(
                                    position => {
                                        var pdis = getPreciseDistance(
                                            { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude },
                                            { latitude: item.coordinate?.lat, longitude: item.coordinate?.lng },
                                        );
                                        const getDistance = pdis / 1000;
                                        const totalDistance = parseFloat(getDistance.toFixed(1));

                                        setDisablePromo(false);

                                        if (totalDistance === 0 || !totalDistance) {
                                            setFare(0);
                                        }
                                        if (totalDistance <= 2) {
                                            setFare(15);
                                        }
                                        if (totalDistance <= 7 && totalDistance > 2) {
                                            const next = 40 + (totalDistance - 2) * 10;
                                            setFare(next);
                                        }
                                        if (totalDistance > 7) {
                                            const beyond = 80 + (totalDistance - 7) * 15;
                                            setFare(beyond);
                                        }
                                    });
                            }}
                            //municipality
                            municipalOnFocus={() => {
                                setGetBarangay(null);
                                setRiderStatus('');
                            }}
                            municipalData={Municipality}
                            municipalValue={getMunicipality}
                            municipalOnChange={item => {
                                setGetMunicipality(item.value);
                            }}
                        />
                        :
                        <DropdownPabili
                            merchantImageVisible={getMerchant === null
                                ?
                                false
                                :
                                true
                            }
                            merchantImage={getMerchant?.imageUrl}
                            merchantValue={getMerchant}
                            onFocus={() => {
                                setGetMerchant(null);
                                setRiderStatus('');
                            }}
                            merchantOnChange={item => {
                                setRiderStatus('');
                                spring();
                                setGetMerchant(item);
                                Geolocation.getCurrentPosition(
                                    position => {
                                        var pdis = getPreciseDistance(
                                            { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude },
                                            { latitude: item.coordinate?.lat, longitude: item.coordinate?.lng },
                                        );
                                        const getDistance = pdis / 1000;
                                        const totalDistance = parseFloat(getDistance.toFixed(1));

                                        if (totalDistance === 0 || !totalDistance) {
                                            setFare(0);
                                        }
                                        if (totalDistance <= 2) {
                                            setFare(20);
                                        }
                                        if (totalDistance <= 7 && totalDistance > 2) {

                                            const next = 40 + (totalDistance - 2) * 10;

                                            setFare(next);
                                        }
                                        if (totalDistance > 7) {
                                            const beyond = 80 + (totalDistance - 7) * 15;
                                            setFare(beyond);
                                        }
                                    });
                            }}
                        />
                    }
                </View>
                :
                null
            }
            {/*BOOKING*/}
            {activityData.length === 0
                ?
                !riderStatus
                    ?
                    getMunicipality && getBarangay || getMerchant
                        ?
                        <PassengerBooking
                            animatedValue={animatedValue}
                            fare={`To Pay : ₱ ${fare.toFixed(0)}`}
                            pickUp={service === "Pasakay"
                                ?
                                "Your Location"
                                :
                                getMerchant?.value
                            }
                            dropOff={service === "Pasakay"
                                ?
                                `Brgy. ${getBarangay?.value}, ${getMunicipality}, Quezon`
                                :
                                "Your Location"
                            }
                            //promo code
                            promoCode={controllerData?.promo_code}
                            promoPercent={controllerData?.promo_percent}
                            promoDisabled={
                                userData?.user_promo_code === controllerData?.promo_code || disablePromo === true
                                    ?
                                    true
                                    :
                                    false
                            }
                            coin={coinEnable === true
                                ?
                                parseInt(userData?.user_coin) - parseInt(userData?.user_coin)
                                :
                                parseInt(userData?.user_coin)
                            }
                            coinValue={coinEnable}
                            coinDisabled={userData?.user_coin === 0
                                ?
                                true
                                :
                                false
                            }
                            coinValueChange={value => {
                                setCoinEnable(value);
                                console.log(value);
                                if (value === true) {
                                    setFare(fare - parseInt(userData?.user_coin))
                                }
                                else {
                                    setFare(fare + parseInt(userData?.user_coin))
                                }
                            }}
                            buttonTitle={
                                userData?.user_promo_code === controllerData?.promo_code
                                    ?
                                    "Promo applied"
                                    :
                                    "Apply Code"
                            }
                            promoOnPress={() => {
                                //formula to calculate discounted fare
                                const promo = fare * parseInt(controllerData?.promo_value) / 100;
                                setFare(Math.abs(fare - promo));
                                setDisablePromo(true);
                            }}
                            //button
                            buttonBook={`Find Rider`}//{`Book ${service}`}
                            buttonOnPress={async () => {
                                getRider();
                            }} />
                        :
                        null
                    :
                    riderStatus === "search" || riderStatus === "success" || riderStatus === "fail"
                        ?
                        <PassengerRider
                            //status
                            riderStatus={riderStatus}
                            //
                            riderName={riderData?.user_name}
                            riderImage={riderData?.user_image}
                            //
                            distance={riderData?.distance}
                            fare={`₱ ${fare.toFixed(0)}`}
                            //note
                            noteValue={note}
                            noteOnChangeText={text => setNote(text)}
                            //success
                            buttonTitleSuccess={`Book ${service}`}
                            //buttonLoadingSuccess
                            buttonPressSuccess={() => {

                                Alert.alert(`Book ${service}`, `Are you sure you want Book Now?`, [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes', onPress: () => {
                                            const today = new Date();

                                            firestore()
                                                .collection('activity')
                                                .add({
                                                    //activity
                                                    activity: 'Active',
                                                    activity_amount: fare.toFixed(0),
                                                    activity_pickUp: service === "Pasakay"
                                                        ?
                                                        "Your Location"
                                                        :
                                                        getMerchant?.value
                                                    ,//pickup
                                                    activity_dropOff: service === "Pasakay"
                                                        ?
                                                        `Brgy. ${getBarangay?.value}, ${getMunicipality}, Quezon`
                                                        :
                                                        "Your Location",//dropOff,
                                                    activity_promo: userData?.user_promo_code === controllerData?.promo_code
                                                        ?
                                                        controllerData?.promo_code
                                                        :
                                                        "Not Available",//promoCode,
                                                    activity_merchant_lat: service === "Pasakay"
                                                        ?
                                                        null
                                                        :
                                                        getMerchant?.coordinate.lat,
                                                    activity_merchant_lng: service === "Pasakay"
                                                        ?
                                                        null
                                                        :
                                                        getMerchant?.coordinate.lng,
                                                    activity_dateFilter: today.toLocaleDateString(),
                                                    activity_dateTime: firestore.Timestamp.fromDate(new Date()),
                                                    activity_service: service,
                                                    activity_status: 'Pending',
                                                    activity_note: note,

                                                    //push data
                                                    activity_time: riderData?.time,
                                                    activity_distance: riderData?.distance,

                                                    //rider details
                                                    rider_gcash: riderData?.user_gcash,
                                                    rider_id: riderData?.key,
                                                    rider_image: riderData?.user_image,
                                                    rider_name: `${riderData?.user_name_first} ${riderData?.user_name_last}`,
                                                    rider_latitude: riderData?.user_latitude,
                                                    rider_longitude: riderData?.user_longitude,
                                                    rider_token: riderData?.user_device_token,
                                                    rider_rating: riderData?.user_rating,

                                                    //motor details
                                                    rider_plate_number: riderData?.user_motor_plate_number,
                                                    rider_motor_image: 'https://batangasracingcircuit.org/wp-content/uploads/2022/10/adjustable-windscreen.webp?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-1',//riderData?.user_motor_image_front
                                                    rider_motor_series: riderData?.user_motor_series,
                                                    rider_motor_brand: riderData?.user_motor_brand,
                                                    rider_motor_color: riderData?.user_motor_color,

                                                    //passenger details
                                                    passenger_gcash: userData?.user_gcash,
                                                    passenger_id: auth()?.currentUser?.uid,
                                                    passenger_image: userData?.user_image,
                                                    passenger_name: `${userData?.user_name_first} ${userData?.user_name_last}`,
                                                    passenger_latitude: userData?.user_latitude,
                                                    passenger_longitude: userData?.user_longitude,
                                                    passenger_token: userData?.user_device_token

                                                })
                                                .then(async () => {
                                                    setGetBarangay(null);
                                                    setGetMunicipality(null);
                                                    setGetMerchant(null);
                                                    let notificationData = {
                                                        mode: `notification`,
                                                        image: userData?.user_image,
                                                        title: `${userData?.user_name_first} ${userData?.user_name_last}`,
                                                        body: `Need a ${service}.`,
                                                        token: riderData?.user_device_token,
                                                    };
                                                    await SendNotification.sendSingleDeviceNotification(notificationData);
                                                });
                                            //apply code
                                            firestore()
                                                .collection('user')
                                                .doc(auth().currentUser?.uid)
                                                .update({
                                                    user_coin: 0,
                                                    user_promo_code: controllerData?.promo_code,
                                                })
                                                .then(() => {
                                                    console.log('User updated!');
                                                });
                                            firestore()
                                                .collection('user')
                                                .doc(riderData?.key)
                                                .update({
                                                    user_status: "Offline",
                                                })
                                                .then(() => {
                                                    console.log('User updated!');
                                                });
                                            setRiderStatus('');
                                        }
                                    },
                                ])
                            }}
                            //fail
                            buttonPressFail={() => {
                                getRider();
                            }}
                        />
                        :
                        null
                :
                null
            }
            {/*STATUS*/}
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
                <PassengerStatus />
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
                    <PassengerIndicator />
                </View>
                :
                null
            }
        </View>
    );
};
