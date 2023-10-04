import React from 'react';
import { Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, Button, TextInput, Checkbox } from 'react-native-paper';

import { Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

export default function VerifyStart({ navigation }) {

    return (
        <View style={{
            flex: 1,
            //justifyContent: 'center',
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
                    Kumita ng higit sa Provincial Rate!
                </Text>
                <FastImage
                    style={{
                        height: 300,
                        width: 300,
                        alignSelf: 'center',
                    }}
                    source={require('../../../images/pasakay-variant.png')}
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
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignItems: 'center',
            }}>
                <Button style={{
                    width: '90%',
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
                        navigation.navigate("VerifyRequirements");
                    }}>
                    View Requirements
                </Button>
                <Button style={{
                    width: '90%',
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
                    buttonColor='black'
                    //icon={props.icon}
                    mode="contained"
                    onPress={() => {
                        navigation.navigate("VerifyOwner");
                    }}>
                    Let's Start
                </Button>
            </View>
        </View>
    );
};