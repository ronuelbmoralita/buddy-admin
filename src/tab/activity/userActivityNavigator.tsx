import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { IconButton } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
    local_user, user
} from '../../global/localStorage';

export default function UserActivityNavigator({ navigation }) {

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

    //get from cloud
    useEffect(() => {

        const today = new Date();

        //console.log(today.toLocaleDateString())

        if (userData?.user_type === "Rider") {
            firestore()
                .collection('activity')
                //.orderBy('createdAt', 'desc')
                .where("activity", "==", "Inactive")
                .where("activity_dateFilter", "==", today.toLocaleDateString())
                .where('rider_id', '==', auth().currentUser?.uid)
                //.where('user.passenger_id', '==', passenger_id)
                .onSnapshot(querySnapshot => {
                    const list = [];

                    querySnapshot.forEach(documentSnapshot => {
                        list.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                            amount: parseInt(documentSnapshot.data().activity_amount)
                        });
                    });

                    let filterDate = list.sort(function (a, b) {
                        return (b.activity_dateTime) - (a.activity_dateTime)
                    })


                    //get sum
                    const sum = filterDate.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                    }, 0);

                    setEarnings(sum.toFixed(2))

                    setActivityData(filterDate);
                });
        }
        if (userData?.user_type === "Passenger") {
            firestore()
                .collection('activity')
                //.orderBy('createdAt', 'desc')
                .where("activity", "==", "Inactive")
                .where("activity_dateFilter", "==", today.toLocaleDateString())
                //.where('user.rider_id', '==', auth().currentUser?.uid)
                .where('passenger_id', '==', auth().currentUser?.uid)
                .onSnapshot(querySnapshot => {
                    const list = [];

                    querySnapshot.forEach(documentSnapshot => {
                        list.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                            amount: parseInt(documentSnapshot.data().activity_amount)
                        });
                    });

                    let filterDate = list.sort(function (a, b) {
                        return (b.activity_dateTime) - (a.activity_dateTime)
                    })

                    setActivityData(filterDate);
                });
        }
    }, []);

    const [earnings, setEarnings] = useState('');

    const [logoutModal, setLogoutModal] = useState(false);

    const [details, setDetails] = useState([]);

    const Item = ({ item }) => (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            //borderWidth: 1,
            padding: 10,
            gap: 10,
            borderRadius: 10,
            width: '90%',
            alignSelf: 'center',
        }}
            onPress={() => {
                setDetails(item)
                Alert.alert('Activity Details',
                    "Ref: " + item?.key
                    + "\n" + "Pick-up: " + item?.activity_pickUp
                    + "\n" + "Drop-off: " + item?.activity_dropOff
                    + "\n" + "Total Amount: " + item?.activity_amount
                    + "\n" + "Date & Time: " + new Date(item?.activity_dateTime?.seconds * 1000).toLocaleString()
                )
            }}>
            <FastImage
                style={{
                    width: 60,
                    height: 60,
                }}
                source={item.activity_service === 'Pasakay'
                    ?
                    require("../../images/pasakay.png")
                    :
                    require("../../images/pabili.png")
                }
                priority={FastImage.priority.high}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                }}>{item.activity_service}</Text>
                <Text style={{
                    color: 'black',
                }}>
                    {`${new Date(item?.activity_dateTime.seconds * 1000).toLocaleDateString()} ${new Date(item?.activity_dateTime.seconds * 1000).toLocaleTimeString()}`}
                </Text>
            </View>
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                }}>
                    ₱ {item.activity_amount}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            {activityData.length === 0
                ?
                null
                :
                userData?.user_type === "Rider"
                    ?
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        backgroundColor: 'white',
                        elevation: 10,
                        marginTop: 10,
                    }}>
                        <View style={{ marginVertical: 10, alignItems: 'center' }}>
                            <Text style={{
                                color: 'blue',
                                letterSpacing: 2,
                            }}>Your Earnings Today</Text>
                            <Text style={{
                                fontSize: 40,
                                fontWeight: 'bold',
                                color: 'black',
                                letterSpacing: 2,
                            }}>₱ {earnings}</Text>
                        </View>
                    </View>
                    :
                    null
            }
            <FlatList
                data={activityData}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                    flex: activityData.length === 0 ? 1 : 0
                }}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ height: 0 }} />
                    )
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 20 }} />
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: 20 }} />
                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}>
                            <IconButton
                                icon="magnify-close"
                                iconColor='black'
                                size={100}
                                onPress={() => console.log('Pressed')}
                            />
                            <Text style={{
                                letterSpacing: 2,
                                color: 'black',
                            }}>No activity found</Text>
                        </View>
                    )
                }}
            />
        </View>
    );
};
