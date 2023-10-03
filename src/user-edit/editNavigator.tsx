import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Alert,
} from 'react-native';
import { IconButton, Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import EditName from './components/editName';
import EditGcash from './components/editGCash';
//
import EditLicense from './components/editLicense';
import EditMotorOr from './components/editMotorOr';
import EditMotorCr from './components/editMotorCr';
//
import EditMotorFront from './components/motorImageFront';
import EditMotorBack from './components/motorImageBack';
import EditMotorLeft from './components/motorImageLeft';
import EditMotorRight from './components/motorImageRight';
//
import EditMotorcycle from './components/motorEdit';
//
import EditSubmit from './components/editSubmit';
//
import DeleteAccount from './components/deleteAccount';

import { local_user, user } from '../global/localStorage';

export default function EditNavigator() {

    function Settings() {

        const navigation = useNavigation();

        const getUser = user();

        const [userData, setUserData] = useState(getUser);

        const [days, setDays] = useState(0);

        var operator = (days > 14);

        useEffect(() => {
            const json = local_user.getString('local_user') // { 'username': 'Marc', 'age': 21 }
            if (json) {
                const object = JSON.parse(json)
                if (object?.user_edit_date) {
                    const date1 = new Date(new Date().toISOString().slice(0, 10));
                    const date2 = new Date(object?.user_edit_date);
                    const days = Math.ceil(parseInt((date2 - date1) / (24 * 3600 * 1000)));
                    setDays(days);
                }
                else {
                    setDays(15);
                }
                setUserData(object)
            }
            const listener = local_user.addOnValueChangedListener((changedKey) => {
                const newObject = local_user.getString(changedKey);
                const object = JSON.parse(newObject)
                if (object?.user_edit_date) {
                    const date1 = new Date(new Date().toISOString().slice(0, 10));
                    const date2 = new Date(object?.user_edit_date);
                    const days = Math.ceil(parseInt((date2 - date1) / (24 * 3600 * 1000)));
                    setDays(days);
                }
                else {
                    setDays(15);
                }
                setUserData(object);
            })
            return () => {
                listener.remove()
            }
        }, []);

        function RenderItem(props) {
            return (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                }}>
                    <View style={{
                        flex: 1,
                        marginHorizontal: 20
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}>{props.title}</Text>
                        {props.valueDisabled === true
                            ?
                            null
                            :
                            <Text style={{
                                color: 'black',
                                letterSpacing: 2,
                            }}>{props.value}</Text>
                        }
                    </View>
                    <IconButton
                        //disabled={props.disabled}
                        icon="chevron-right"
                        iconColor='black'
                        size={25}
                        onPress={props.onPress}
                    />
                </View>
            )
        }

        const [verificationModal, setVerificationModal] = useState(false);

        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <ScrollView style={{
                    width: '100%',
                    alignSelf: 'center',
                }}>
                    <View style={{
                        marginBottom: 20,
                        width: '100%',
                        alignSelf: 'center',
                    }}>
                        <RenderItem
                            title="Name"
                            value={userData?.user_name}
                            onPress={() => {
                                if (operator) {
                                    navigation.navigate("EditName")
                                }
                                else {
                                    Alert.alert("Information", "You can't edit your profile settings on Büddy for 14 days after changes.")
                                }
                            }} />
                        <RenderItem
                            title="Mobile Number"
                            value={`${userData?.user_gcash}`}
                            onPress={() => {
                                if (operator) {
                                    navigation.navigate("EditGcash")
                                }
                                else {
                                    Alert.alert("Information", "You can't edit your profile settings on Büddy for 14 days after changes.")
                                }
                            }} />
                        {userData?.user_type === "Rider" && userData?.user_account === "Rider-Verified"
                            ?
                            <View style={{
                                marginBottom: 20,
                                width: '100%',
                                alignSelf: 'center',
                            }}>
                                <RenderItem
                                    title="Driver's License"
                                    value={`Exp: 03/06/2040`}
                                    onPress={() => {
                                        if (operator) {
                                            navigation.navigate("EditLicense")
                                        }
                                        else {
                                            Alert.alert("Information", "You can't edit your profile settings on Büddy for 14 days after changes.")
                                        }
                                    }} />
                                <RenderItem
                                    title="OR/ CR"
                                    value={`Exp: 03/06/2040`}
                                    onPress={() => {
                                        if (operator) {
                                            navigation.navigate("EditMotorOr")
                                        }
                                        else {
                                            Alert.alert("Information", "You can't edit your profile settings on Büddy for 14 days after changes.")
                                        }
                                    }} />
                                <RenderItem
                                    title="Brand New Motorcycle"
                                    value={`Edit Motorcycle`}
                                    onPress={() => {
                                        if (operator) {
                                            navigation.navigate("EditMotorFront")
                                        }
                                        else {
                                            Alert.alert("Information", "You can't edit your profile settings on Büddy for 14 days after changes.")
                                        }
                                    }} />
                            </View>
                            :
                            null
                        }
                    </View>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        gap: 20,
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
                            onPress={() => {
                                //setVerificationModal(true);
                                navigation.navigate("DeleteAccount");
                            }}>
                            Delete Account
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    };
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={Settings}
                options={{
                    headerTitle: 'Profile Settings',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen name="EditName" component={EditName}
                options={{
                    headerTitle: 'Edit Name',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditGcash" component={EditGcash}
                options={{
                    headerTitle: 'Edit Mobile',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditLicense" component={EditLicense}
                options={{
                    headerTitle: "Edit Driver's License",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorOr" component={EditMotorOr}
                options={{
                    headerTitle: "Edit OR",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorCr" component={EditMotorCr}
                options={{
                    headerTitle: "Edit CR",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorFront" component={EditMotorFront}
                options={{
                    headerTitle: "Edit Motorcycle Front",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorBack" component={EditMotorBack}
                options={{
                    headerTitle: "Edit Motorcycle Back",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorLeft" component={EditMotorLeft}
                options={{
                    headerTitle: "Edit Motorcycle Left",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorRight" component={EditMotorRight}
                options={{
                    headerTitle: "Edit Motorcycle Right",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditMotorcycle" component={EditMotorcycle}
                options={{
                    headerTitle: "Edit Motorcycle",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="EditSubmit" component={EditSubmit}
                options={{
                    headerTitle: "Submit",
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount}
                options={{
                    headerTitle: 'Delete Account',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }} />
        </Stack.Navigator>
    );
}
