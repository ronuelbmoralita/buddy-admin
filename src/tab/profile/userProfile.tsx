import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Linking } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import FastImage from 'react-native-fast-image'

import { local_user, user } from '../../global/localStorage';

export default function UserProfile({ navigation }) {

    GoogleSignin.configure({
        webClientId: '890707384472-r6kutndhdccoroeui3o4c9hujb49si5c.apps.googleusercontent.com',
    });

    const getUser = user();

    const [userData, setUserData] = useState(getUser);

    useEffect(() => {
        const json = local_user.getString('local_user') // { 'username': 'Marc', 'age': 21 }
        if (json) {
            const object = JSON.parse(json)
            setUserData(object)
        }
        const listener = local_user.addOnValueChangedListener((changedKey) => {
            const newObject = local_user.getString(changedKey);
            const object = JSON.parse(newObject)
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
                borderRadius: 10,
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <IconButton
                        icon={props.icon}
                        iconColor='black'
                        size={20}
                        onPress={props.onPress}
                    />
                    <Text style={{
                        color: 'black',
                        letterSpacing: 2,
                    }}>{props.title}</Text>
                </View>
                <IconButton
                    icon="chevron-right"
                    iconColor='black'
                    size={25}
                    onPress={props.onPress}
                />
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <View style={{
                alignItems: 'center',
                gap: 10
            }}>
                <FastImage
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        borderWidth: 5,
                    }}
                    source={{ uri: userData?.user_image }}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{ alignItems: 'center', gap: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'black',
                                letterSpacing: 2
                            }}>{userData?.user_name}</Text>
                            {userData?.user_account === "Merchant-Verified"
                            ?
                            <IconButton
                            icon="check-decagram"
                            iconColor="#0032A0"
                            size={30}
                            onPress={() => {
                                Alert.alert("Verified Account","This badge indicates verified Büddy Merchants. Stay tuned for exciting updates coming soon.")
                            }}
                            />
                            :
                            null
                            }
                        </View>
                        <Text style={{
                            color: 'black',
                            letterSpacing: 2
                        }}>{userData?.user_gcash}</Text>
                    </View>
                </View>
            </View>
            <View style={{
                marginTop: 10,
            }}>
                <RenderItem
                    title='Profile Settings'
                    icon="account-settings"
                    onPress={() => {
                        userData?.user_account === "Rider-Pending"
                            ?
                            Alert.alert('Verification', 'We are in the process of verifying your account details. Thank you for waiting.', [
                                {
                                    text: 'OK', onPress: () => {
                                        return;
                                    }
                                },
                            ])
                            :
                            navigation.navigate("EditNavigator")
                    }} />
                <RenderItem
                    title='Privacy & Policy'
                    icon="shield-account-outline"
                    onPress={() => {
                        navigation.navigate("AgreementNavigator", {
                            component: 'privacy-policy'
                        })
                    }} />
                <RenderItem
                    title='Term & Conditions'
                    icon="text-box-check-outline"
                    onPress={() => {
                        navigation.navigate("AgreementNavigator", {
                            component: 'terms-conditions'
                        })
                    }} />
                <RenderItem
                    title='About Büddy'
                    icon="information"
                    onPress={() => {
                        navigation.navigate("UserAbout")
                    }} />
                <RenderItem
                    title='Contact us'
                    icon="facebook-messenger"
                    onPress={() => {
                        Linking.openURL(`http://m.me/buddyAppCommunity`)
                    }} />
                <RenderItem
                    title='Help'
                    icon="frequently-asked-questions"
                    onPress={() => {
                        navigation.navigate("UserHelp")
                    }} />
                <RenderItem
                    title='Logout'
                    icon="logout"
                    onPress={() => {
                        //setLogoutModal(true);
                        Alert.alert('Logout', 'Are you sure you want to logout?', [
                            {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'Yes', onPress: () => {
                                    auth()
                                        .signOut()
                                        .then(async () => {
                                            try {
                                                await GoogleSignin.revokeAccess();
                                                await GoogleSignin.signOut();
                                                navigation.replace('UserLogin');
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        })
                                }
                            },
                        ]);
                    }}
                />
            </View>
        </View>
    );
};
