import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, Button } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { local_user, user } from '../../../global/localStorage';

import { useNavigation } from '@react-navigation/native';

import { Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

export default function MerchantStart({ route }) {

    /*
    const{
        //merchant,
    } = route.params;*/

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

    function RenderItem(props) {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                //backgroundColor:'yellow'
                //backgroundColor:'blue',
            }}>
                <View style={{
                    flex: 1,
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'black',
                        letterSpacing: 2,
                    }}>{props.title}</Text>
                </View>
                <IconButton
                    disabled={props.disabled}
                    icon={props.icon}
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
            //justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
            <View style={{
                alignSelf: 'center',
                width: '90%',
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                    alignSelf: 'center',
                }}>
                    Palaguin ang iyong negosyo gamit ang Büddy Merchant.
                </Text>
                <FastImage
                    style={{
                        height: 200,
                        width: 200,
                        alignSelf: 'center',
                    }}
                    source={require('../../../images/merchant.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                    color: 'gray',
                    letterSpacing: 2,
                }}>
                By continuing, you accept the
                {" "}
                <Text style={{
                  fontWeight: 'bold',
                  color: 'black',
                  letterSpacing: 2,
                  textDecorationLine: 'underline',
                }}
                  onPress={async() => {
                    try {
                      const url = 'https://docs.google.com/document/d/e/2PACX-1vQMxcc1M2SMmc21Q3fqdHDPdKis-PPg-j7wcDzpbJifSDZ2NHEIDwlrwtPoFN4jumwvkKITJ_NDezed/pub'
                      if (await InAppBrowser.isAvailable()) {
                          const result = await InAppBrowser.open(url, {
                              // iOS Properties
                              dismissButtonStyle: 'cancel',
                              preferredBarTintColor: '#453AA4',
                              preferredControlTintColor: 'white',
                              readerMode: true,
                              animated: true,
                              modalPresentationStyle: 'fullScreen',
                              modalTransitionStyle: 'coverVertical',
                              modalEnabled: true,
                              enableBarCollapsing: false,
                              // Android Properties
                              showTitle: true,
                              toolbarColor: 'black',
                              secondaryToolbarColor: 'black',
                              navigationBarColor: 'black',
                              navigationBarDividerColor: 'white',
                              enableUrlBarHiding: true,
                              enableDefaultShare: true,
                              forceCloseOnRedirection: false,
                              // Specify full animation resource identifier(package:anim/name)
                              // or only resource name(in case of animation bundled with app).
                              animations: {
                                  startEnter: 'slide_in_right',
                                  startExit: 'slide_out_left',
                                  endEnter: 'slide_in_left',
                                  endExit: 'slide_out_right'
                              },
                              headers: {
                                  'my-custom-header': 'my custom header value'
                              }
                          })
                          //await this.sleep(800);
                          //Alert.alert(JSON.stringify(result))
                      }
                      else Linking.openURL(url)
                  } catch (error) {
                      //Alert.alert(error.message)
                  }
                  }}>
                  Terms and Conditions,
                </Text>
                {" "}
                as well as the Buddy App
                {" "}
                <Text style={{
                  fontWeight: 'bold',
                  color: 'black',
                  letterSpacing: 2,
                  textDecorationLine: 'underline',
                }}
                  onPress={async() => {
                    try {
                      const url = 'https://docs.google.com/document/d/e/2PACX-1vSzWeXoIekpq8kQMMNVfMMUhwhZqACo6DuEA4zgsX4lHru2j8YtLJhRf4yNVCAHGnTMXFeat-do4w9f/pub'
                      if (await InAppBrowser.isAvailable()) {
                          const result = await InAppBrowser.open(url, {
                              // iOS Properties
                              dismissButtonStyle: 'cancel',
                              preferredBarTintColor: '#453AA4',
                              preferredControlTintColor: 'white',
                              readerMode: true,
                              animated: true,
                              modalPresentationStyle: 'fullScreen',
                              modalTransitionStyle: 'coverVertical',
                              modalEnabled: true,
                              enableBarCollapsing: false,
                              // Android Properties
                              showTitle: true,
                              toolbarColor: 'black',
                              secondaryToolbarColor: 'black',
                              navigationBarColor: 'black',
                              navigationBarDividerColor: 'white',
                              enableUrlBarHiding: true,
                              enableDefaultShare: true,
                              forceCloseOnRedirection: false,
                              // Specify full animation resource identifier(package:anim/name)
                              // or only resource name(in case of animation bundled with app).
                              animations: {
                                  startEnter: 'slide_in_right',
                                  startExit: 'slide_out_left',
                                  endEnter: 'slide_in_left',
                                  endExit: 'slide_out_right'
                              },
                              headers: {
                                  'my-custom-header': 'my custom header value'
                              }
                          })
                          //await this.sleep(800);
                          //Alert.alert(JSON.stringify(result))
                      }
                      else Linking.openURL(url)
                  } catch (error) {
                      //Alert.alert(error.message)
                  }
                  }}>
                  Privacy Policy.
                </Text>
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '90%',
                    alignSelf: 'center'
                }}>
                    <Button
                        style={{
                            borderRadius: 100,
                            marginBottom: 20,
                        }}
                        contentStyle={{
                            padding: 10,
                            borderRadius: 100
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        //disabled={props.disabled}
                        //loading={props.loading}
                        //buttonColor='black'
                        //icon={props.icon}
                        textColor='black'
                        mode="outlined"
                        onPress={() => {
                            navigation.navigate("MerchantRequirements");
                        }}>
                        View Requirements
                    </Button>
                    <Button
                        mode="contained"
                        buttonColor='black'
                        style={{
                            borderRadius: 100
                        }}
                        contentStyle={{
                            padding: 10,
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        onPress={() => {
                            navigation.navigate('MerchantDetails', {
                                //merchant:merchant,
                            });
                            //Linking.openURL('https://www.facebook.com/nancy.bantucan?mibextid=ZbWKwLL')
                            /*
                            Linking.canOpenURL("fb://profile/https://www.facebook.com/nancy.bantucan?mibextid=ZbWKwL").then(supported => {
                                if (supported) {
                                return Linking.openURL("fb://profile/https://www.facebook.com/nancy.bantucan?mibextid=ZbWKwL");
                                } else {
                                return Linking.openURL("https://www.facebook.com/");
                                }
                            })
                            //Linking.openURL('https://www.facebook.com/nancy.bantucan?mibextid=ZbWKwLL')
                            /*
                            Linking.openURL('instagram://user?username=instagram')
                            .catch(() => {
                                Linking.openURL('https://www.instagram.com/instagram');
                            })
                            */
                            //navigation.navigate("MerchantDTI");
                        }}>
                        Let's Start
                    </Button>
                </View>
            </View>
        </View>
    );
};