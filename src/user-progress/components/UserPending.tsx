import React from 'react';
import { Text, View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function UserPending() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                width: '90%',
                gap: 20
            }}>
                <FastImage
                    style={{
                        height: 300,
                        width: 300,
                    }}
                    source={require('../../images/waiting.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                    fontSize: 16,
                    color: 'black',
                    letterSpacing: 2
                }}>
                    Please wait for a moment while we review your account.
                    Thank you for your patience. 
                    We will get back to you shortly.
                </Text>
            </View>
            {/*}
            <View style={{
                width: '90%',
                alignSelf: 'center',
                gap: 20,
            }}>
                <Button
                    mode='outlined'
                    textColor='black'
                    style={{
                        borderColor: 'black',
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
                        firestore()
                            .collection('user')
                            .doc(auth().currentUser?.uid)
                            .update({
                                user_account: "Rider-Verified",
                            })
                            .then(() => {
                                console.log('User updated!');
                            });
                    }}>
                    Verify Rider
                </Button>
                <Button
                    mode='outlined'
                    textColor='black'
                    style={{
                        borderColor: 'black',
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
                        firestore()
                            .collection('user')
                            .doc(auth().currentUser?.uid)
                            .update({
                                user_account: "Merchant-Verified",
                            })
                            .then(() => {
                                console.log('User updated!');
                            });
                    }}>
                    Verify Merchant
                </Button>
            </View>
                */}
        </View>
    );
};
