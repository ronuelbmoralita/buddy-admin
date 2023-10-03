import * as React from 'react';
import { Text, View, Alert, Platform, PermissionsAndroid } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//user
import RiderNavigator from './home/rider/rideNavigator';
import PassengerNavigator from './home/passenger/passengerNavigator';
//
import UserActivityNavigator from './activity/userActivityNavigator';

const Tab = createBottomTabNavigator();

import { user, controller } from '../global/localStorage';
import UserProfileNavigator from './profile/userProfileNavigator';

import Contacts from 'react-native-contacts';

import RNFetchBlob from 'react-native-blob-util';

export default function UserTab() {

    const userData = user();
    const controllerData = controller();

    //add pasada to contacts
    React.useEffect(() => {
        async function checkContacts() {
            try {
                const permissionContact = await PermissionsAndroid.check('android.permission.READ_SMS')
                if (permissionContact === true) {
                    const getMobile = Contacts.getContactsByPhoneNumber(controllerData?.mobile_number)
                    getMobile.then(result => {
                        if (result.length === 0) {
                            var saveBuddy = {
                                recordID: 'controller_number',
                                phoneNumbers: [{
                                    label: 'mobile',
                                    number: controllerData()?.mobile_number,
                                }],
                                givenName: 'PASADA',
                            }

                            Contacts.addContact(saveBuddy);
                            //console.log("contact saved");
                        }
                        else {
                            //console.log("already saved")
                            return;
                        }
                    });
                }
                else {
                    return;
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkContacts();
    }, [])

    //buddy image ad
    const downloadImage = async (url, filename) => {
        const dirs = RNFetchBlob.fs.dirs;
        const path = `${dirs.DownloadDir}/${filename}`;

        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
            path,
        })
            .fetch('GET', url)
            .then((res) => {
                if (res.data) {
                    console.log('Download Success!');
                } else {
                    console.log('Download Failed!');
                }
            })
            .catch((error) => console.error(error));
    };

    // Usage
    downloadImage(controllerData?.link_image_ad, 'buddyImageAd.png');

    function RenderTab(props) {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <IconButton
                    style={{
                        margin: -10,
                    }}
                    icon={props.icon}
                    iconColor={props.color}
                    //size={size} 
                    size={props.size}
                />
                <Text style={{
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                }}>
                    {props.title}
                </Text>
            </View>
        )
    }

    function Sample(params: type) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hello</Text>
            </View>
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                tabBarStyle: [((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    //console.log(routeName)
                    if (
                        //rider
                        /*
                        routeName === 'RiderPending'
                        ||
                        */
                        routeName === 'RiderGCash'
                        ||
                        //menu
                        routeName === 'PassengerHome'
                        ||
                        routeName === 'PassengerMerchant'
                        ||
                        routeName === 'PassengerRider'
                        ||
                        //profile
                        routeName === 'BuddySettings'
                        ||
                        routeName === 'UserAbout'
                        ||
                        routeName === 'UserContact'
                        ||
                        routeName === 'UserHelp'
                        ||
                        routeName === 'UserPrivacyPolicy'
                        ||
                        routeName === 'UserTermsConditions'
                        ||
                        routeName === 'VerificationNavigator'
                        ||
                        routeName === 'ExploreNavigator'
                    ) {
                        return { display: "none" }
                    }
                    return
                })(route),
                {
                    height: 60,
                    borderTopWidth: 0,
                    elevation: 30,
                }],
            })}>
            {userData?.user_type === "Rider"
                ?
                <Tab.Screen
                    name="Home"
                    component={RiderNavigator}
                    options={{
                        headerShown: false,
                        tabBarLabelStyle: {
                            fontSize: 15,
                            fontWeight: 'bold'
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({
                            focused,
                            color,
                            //size 
                        }) => {
                            const icon = focused ? "home-circle" : "home-circle-outline";
                            const size = focused ? 30 : 25;
                            return (
                                <RenderTab
                                    title="Home"
                                    icon={icon}
                                    color={color}
                                    size={size}
                                />
                            )
                        },
                    }} />
                :
                <Tab.Screen
                    name="Home"
                    component={PassengerNavigator}
                    options={{
                        headerShown: false,
                        tabBarLabelStyle: {
                            fontSize: 15,
                            fontWeight: 'bold'
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({
                            focused,
                            color,
                            //size 
                        }) => {
                            const icon = focused ? "home-circle" : "home-circle-outline";
                            const size = focused ? 30 : 25;
                            return (
                                <RenderTab
                                    title="Home"
                                    icon={icon}
                                    color={color}
                                    size={size}
                                />
                            )
                        },
                    }} />
            }
            <Tab.Screen
                name="UserActivity"
                component={UserActivityNavigator}
                options={{
                    headerTitle: 'Activity',
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 30,
                        letterSpacing: 2,
                    },
                    headerRight: () => (
                        <IconButton
                            icon="information-outline"
                            iconColor='black'
                            size={30}
                            onPress={() => {
                                Alert.alert('Help', `We ensure affordability by storing your activity data for 24 hours only. Tomorrow, you can review your new activity.`, [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]);
                            }}
                        />
                    ),
                    tabBarHideOnKeyboard: true,
                    //headerTitleAlign:'center',
                    tabBarIcon: ({
                        focused,
                        color,
                        //size 
                    }) => {
                        const icon = focused ? "clipboard-clock" : "clipboard-clock-outline";
                        const size = focused ? 30 : 25;
                        return (
                            <RenderTab
                                title="Activity"
                                icon={icon}
                                color={color}
                                size={size}
                            />
                        )
                    },
                }} />
            <Tab.Screen
                name="UserProfileNavigator"
                component={UserProfileNavigator}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 15,
                        fontWeight: 'bold'
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({
                        focused,
                        color,
                        //size 
                    }) => {
                        const icon = focused ? "account-circle" : "account-circle-outline";
                        const size = focused ? 30 : 25;
                        return (
                            <RenderTab
                                title="Profile"
                                icon={icon}
                                color={color}
                                size={size}
                            />
                        )
                    },
                }} />
        </Tab.Navigator>
    );
}
